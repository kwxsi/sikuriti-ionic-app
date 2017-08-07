// Plugins | Dependencies imported
import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController, AlertController, NavParams, App, LoadingController, NavController, Platform, ToastController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

// Prevents compiler from throwing errors on google usage
declare var google: any;

@Injectable()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocation {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;

// variables declarations
  addressElement: HTMLInputElement = null;
  listSearch: string = '';
  source: any;
  map: any;
  marker: any;
  loading: any;
  search: boolean = false;
  error: any;
  switch: string = "map";

  lastLocation: any;
  searchedLocation: any;
  currentLocation: any;
  markerLocation: any;

  regionals: any = [];
  currentregional: any;

// class constructor
  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public app: App,
    public nav: NavController,
    public zone: NgZone,
    public platform: Platform,
    public alertCtrl: AlertController,
    public storage: Storage,
    public http: Http,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public geolocation: Geolocation
  ) { }

// Executes when this page is called
// Loads the map onto the page
  ionViewDidLoad() {
    this.loadMaps();

  }

// Sets the map up
  loadMaps() {
    if (!!google) {
      this.initMap();
      this.initAutocomplete();
      //this.watchCurrentPosition();

    } else {
      this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.')
    }
  }

// Error handler for google maps
  errorAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.loadMaps();
          }
        }
      ]
    });
    alert.present();
  }

// Manages input of search and checks for autocomplete
  mapsSearchBar(ev: any) {
    console.log(ev);
    const autocomplete = new google.maps.places.Autocomplete(ev);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          sub.next(place.geometry.location);
          sub.complete();
        }
      });
    });
  }

// Picks searchbar input and calls createAutocomplete to search for location
  initAutocomplete(): void {
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {
      console.log('Searchdata', location);
      //this.searchedLocation = location;

      let options = {
        center: location,
        zoom: 10
      };
      this.map.setOptions(options);
      console.log(this.searchedLocation);
      this.calculateAndDisplayRoute(this.searchedLocation);

    });
  }

// Performs Google Maps Autocomplete on searched phrase
// Finds a correspondingg place and geocodes to LatLng value
  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          console.log('Search Lat', place.geometry.location.lat());
          console.log('Search Lng', place.geometry.location.lng());
          this.searchedLocation = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng())
          sub.next(place.geometry.location);
        }
      });
    });
  }

// Initializes the map for display
  initMap() {
    // Ionic plugin to get user's current position
    Geolocation.getCurrentPosition().then(
      (position) => {
        this.currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      });
    var mapEle = this.mapElement.nativeElement;

// setting up map characteristics
    let mapOptions = {
      zoom: 10,
      center: { lat: 51.165691, lng: 10.451526 },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDoubleClickZoom: false,
      disableDefaultUI: true,
      zoomControl: true,
      scaleControl: true,
    };

    this.map = new google.maps.Map(mapEle, mapOptions);
    let markers = [];

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      google.maps.event.trigger(this.map, 'resize');
      mapEle.classList.add('show-map');
      this.bounceMap(markers);
      this.getCurrentPositionfromStorage(markers)
    });

    google.maps.event.addListener(this.map, 'bounds_changed', () => {
      this.zone.run(() => {
        this.resizeMap();
      });
    });
  }

// bounces the user's markeron the map when map is loaded
  bounceMap(markers) {
    let bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }

    this.map.fitBounds(bounds);
  }

// This sets a timeout for resizing the map
  resizeMap() {
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 200);
  }

// This retrieves last stored location from app's storage
  getCurrentPositionfromStorage(markers) {
    this.storage.get('lastLocation').then((result) => {

      if (result) {
        let myPos = new google.maps.LatLng(result.lat, result.long);
        this.map.setOptions({
          center: myPos,
          zoom: 14
        });
        let icon = "assets/img/pin-icon.svg";
        let marker = this.addMarker(myPos, "My last saved Location: " + myPos, icon);

        markers.push(marker);
        this.bounceMap(markers);
        this.resizeMap();
      }
    });
  }

// Shows a toast controlller at the bottom of the page
// when location is found, deleted or GPS is not working
  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  choosePosition() {
    this.storage.get('lastLocation').then((result) => {
      if (result) {
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Last Location: ' + new google.maps.LatLng(result.lat, result.long),
          buttons: [
            {
              text: 'Reload',
              handler: () => {
                this.getCurrentPosition();
              }
            },
            {
              text: 'Delete',
              handler: () => {
                this.storage.set('lastLocation', null);
                this.showToast('Location deleted!');
                this.initMap();
              }
            },
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
              }
            }
          ]
        });
        actionSheet.present();
      } else {
        this.getCurrentPosition();

      }
    });
  }

// made for the directions service to keep track of a targetted location
// value changes as user moves towards or away from the targetted loaction
  watchCurrentPosition() {
    let options = { timeout: 10000, enableHighAccuracy: true };
    Geolocation.watchPosition(options).subscribe((position) => {
      this.zone.run(() => {
        this.currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      });
    });
  }

  // will get currrent location of the user
  getCurrentPosition() {
    this.loading = this.loadingCtrl.create({
      content: 'Searching Location ...'
    });
    this.loading.present();

    let locationOptions = { timeout: 10000, enableHighAccuracy: true };

    Geolocation.getCurrentPosition(locationOptions).then(
      (position) => {
        this.loading.dismiss().then(() => {

          this.showToast('Location found!');

          this.lastLocation = { lat: position.coords.latitude, long: position.coords.longitude };

          let myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          let options = {
            center: myPos,
            zoom: 14
          };
          let icon = "assets/img/myPin.svg"
          this.map.setOptions(options);
          this.addMarker(myPos, "My Location!", icon);

          let alert = this.alertCtrl.create({
            title: 'Location',
            message: 'Do you want to save the Location?',
            buttons: [
              {
                text: 'Cancel'
              },
              {
                text: 'Save',
                handler: data => {

                  this.storage.set('lastLocation', this.lastLocation).then(() => {
                    this.showToast('Location saved');
                  });
                }
              }
            ]
          });
          alert.present();

        });
      },
      (error) => {
        this.loading.dismiss().then(() => {
          this.showToast('Location not found. Please enable your GPS!');

          console.log(error);
        });
      }
    )
  }

  toggleSearch() {
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
    }
  }

  addMarker(position, content, icon) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position,
      icon: icon
    });

    this.addInfoWindow(marker, content, '');
    return marker;
  }

  addInfoWindow(marker, content, latlng) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);

    });
  }

// Uses Google Directions Service to calculate and display route
  calculateAndDisplayRoute(destination: any) {
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(this.directionsPanel.nativeElement);
    //console.log('navigation started');

    directionsService.route({
      origin: this.currentLocation,
      destination: destination,
      travelMode: google.maps.TravelMode['DRIVING']
    }, (response, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        //alert('Directions Service OK');
      } else {
        console.warn(status);
      }
    });
  }

}
