// Plugins | Dependencies imported
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-fire-tips',
  templateUrl: 'fire-tips.html',
})
export class FireTips {

// Class constructor
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

// Executes when this page is called
  ionViewDidLoad() {
    console.log('ionViewDidLoad FireTips');
  }

}
