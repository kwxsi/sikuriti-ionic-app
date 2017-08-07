// Plugins | Dependencies imported
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class Help {

// Class constructor
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

// Executes when page is called
  ionViewDidLoad() {
    console.log('ionViewDidLoad Help');
  }


}
