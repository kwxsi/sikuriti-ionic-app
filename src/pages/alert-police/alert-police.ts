// Plugins | Dependencies imported
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';

// Page imported
import { SetLocation } from '../set-location/set-location';
declare var google: any; //google decaration to prevent compiler errors on google usage

@IonicPage()
@Component({
  selector: 'page-alert-police',
  templateUrl: 'alert-police.html',
  providers: [SetLocation]
})
export class AlertPolice {

  text = {
    "number": "",
    "message": "",
  };

// class constructor
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sms: SMS,
    public toastCtrl: ToastController,
    public setLoc: SetLocation) {

    
  }

// Executes when page is called
  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertPolice');
  }

// Uses ionic native SMS cordobva plugin
// to send SMS within the app
  sendTextMessage() {
    this.sms.send(this.text.number, this.text.message).then((result) => {
      let successToast = this.toastCtrl.create({
        message: "Text message sent successfully! :)",
        duration: 3000
      })
      successToast.present();
    }, (error) => {
      let errorToast = this.toastCtrl.create({
        message: "Text message not sent. :(",
        duration: 3000
      })
      errorToast.present();
    });
  }

}
