import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from 'ionic-native';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SMS } from '@ionic-native/sms';


// Pages
import { MyApp } from './app.component';
import { SignUp } from '../pages/sign-up/sign-up';
import { HomePage } from '../pages/home/home';
import { AccountLogin } from '../pages/account-login/account-login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Settings } from '../pages/settings/settings';
import { SetLocation } from '../pages/set-location/set-location';
import { AlertPolice } from '../pages/alert-police/alert-police';
import { AlertFire } from '../pages/alert-fire/alert-fire';
import { Help } from '../pages/help/help';
import { About } from '../pages/about/about';
import { FireTips } from '../pages/fire-tips/fire-tips';
import { Locations } from '../providers/locations';
import { ReminderPage } from '../pages/reminder/reminder';




// Firebase Config
const config = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  databaseURL: "https://your-app.firebaseio.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789098"
};

@NgModule({
  declarations: [
    MyApp,
    SignUp,
    HomePage,
    Dashboard,
    AccountLogin,
    SetLocation,
    ReminderPage,
    AlertPolice,
    AlertFire,
    Settings,
    FireTips,
    Help,
    About
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    HttpModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignUp,
    HomePage,
    Dashboard,
    AccountLogin,
    ReminderPage,
    SetLocation,
    AlertPolice,
    AlertFire,
    FireTips,
    Settings,
    About,
    Help
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    LocalNotifications,
    SMS,
    Locations,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

  ]
})
export class AppModule { }
