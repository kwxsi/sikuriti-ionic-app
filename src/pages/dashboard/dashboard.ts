// Plugins | Dependencies imported
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import * as firebase from 'firebase';


// Pages imported
import { Settings } from '../settings/settings';
import { FireTips } from '../fire-tips/fire-tips'; 
import { SetLocation } from '../set-location/set-location';
import { AlertPolice } from '../alert-police/alert-police';
import { AlertFire } from '../alert-fire/alert-fire';
import { ReminderPage } from '../reminder/reminder';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {

// Class constructor
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      if(!this.isLoggedin()){
    console.log('You are not logged in.');
  }
}

// Checks to see if user is logged in
  isLoggedin(){
    if(window.localStorage.getItem('currentuser')){
      return true;
    }
  }

// Executes when page is called
  ionViewDidLoad() {
    console.log('ionViewDidLoad Dashboard');
  }

// Navigates to Set Pi Location Page
  openMaps(){
    this.navCtrl.push(SetLocation);
  }

// Navigates to Alert Police Page 
  pushToPolice(){
    this.navCtrl.push(AlertPolice);
  }

// Navigates to Alert Fire Page
  pushToFire(){
    this.navCtrl.push(AlertFire);
  }

// Navigates to Settings Page
  openSettings(){
    this.navCtrl.push(Settings);
  }

// Navigates to Fire Extinguisher Tips Page
  openTips(){
    this.navCtrl.push(FireTips);
  }

// Navigates to Reminder Page
  reminder(){
    this.navCtrl.push(ReminderPage);
  }

// Manages the In-App Browser window
// First makes a request to Firebase for Image URL
  open(){
    let database = firebase.database();
    let userId = firebase.auth().currentUser.uid;
    return database.ref('/users/' + userId).once('value').then((snapshot) => {
      let url = snapshot.val().image_link;
      console.log('Image url: '+ url);
     
      let browser = new InAppBrowser (url);
      browser.show();
    })
    
  }

}
