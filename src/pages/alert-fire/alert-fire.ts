// Plugins | Dependencies imported
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';


@IonicPage()
@Component({
  selector: 'page-alert-fire',
  templateUrl: 'alert-fire.html',
})
export class AlertFire {
  myLocation: any;
  text = {
    "number": "",
    "message": "",
  };

//class constructor
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sms: SMS,
    public toastCtrl: ToastController,
    ) {
  }

// Executes when page is called
  ionViewDidLoad() {
    console.log('ionViewDidLoad');
  }

// Uses Ionic native SMS cordova plugin
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
