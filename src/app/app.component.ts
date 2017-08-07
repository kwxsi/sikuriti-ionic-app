import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

//import { AccountLogin } from '../pages/account-login/account-login';
import { HomePage } from '../pages/home/home';
import { Dashboard } from '../pages/dashboard/dashboard';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    const config = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "yourapp.firebaseapp.com",
    databaseURL: "https://yourapp.firebaseio.com",
    projectId: "your-app",
    storageBucket: "yourapp.appspot.com",
    messagingSenderId: "123456789098"
  };
  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged((user) => {
    if (user){
      this.rootPage = Dashboard;
    }else {
      this.rootPage = HomePage;
    }
  })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}