// Plugins | Dependencies imported
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';
import { Storage } from '@ionic/storage';
declare var google: any;

@Injectable()
export class Locations {

  data: any;
  usrLat: any;
  usrLng: any;

// class constructor
  constructor(public http: Http, public storage: Storage, public geolocation: Geolocation) {

  }

// Uses Angular JS HTTP service to fetch data from JSON file
// And then call applyHaversine to get user Location and hydrants' locations
  load() {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('assets/data/locations.json').map(res => res.json()).subscribe(data => {

        this.data = this.applyHaversine(data.locations);

        this.data.sort((locationA, locationB) => {
          return locationA.distance - locationB.distance;
        });

        resolve(this.data);
      });

    });

  }

// Calculate between current position and hydrant's position
// This is the Haversine Javascript algorithm for calculating
//from latitude and longitude usingthe earth's radius
  getDistanceBetween(user, place) {
    let lat1 = user.lat;
    let lon1 = user.lng;
    let lat2 = place.lat;
    let lon2 = place.lng;

    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.toRad(lat2 - lat1);
    var dLong = this.toRad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return (d / 1000).toFixed(2);

  }


// This gets user location and hydrants location
// and prepares the function for distance calculation using Haversine formula
  applyHaversine(locations) {
   Geolocation.getCurrentPosition().then((position) => {

     this.usrLat = position.coords.latitude;
     this.usrLng = position.coords.longitude;

    let usersLocation = {
			lat: this.usrLat, //40.713744
			lng: this.usrLng, //-74.009056
		};

    locations.map((location) => {

      let placeLocation = {
        lat: location.latitude,
        lng: location.longitude
      };

      location.distance = this.getDistanceBetween(usersLocation, placeLocation);
    });

    }, (err) => {
      console.log(err);
    });
  
    return locations;
  }

  toRad(x) {
    return x * Math.PI / 180;
  }

}