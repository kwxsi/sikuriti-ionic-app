// Plugins | Dependencies imported
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AccountLogin } from '../account-login/account-login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  splash = true;

// Class constructor
  constructor(public navCtrl: NavController) {
    
  }

// Executes when page is called
// This code controls splash screen's life cycle
  ionViewDidLoad() {
    setTimeout(() => {
      this.splash = false;
    }, 7000);
  }

// Navigates to  Account Login Page
  openAccountLogin(): void{
    this.navCtrl.push(AccountLogin);
  }


}
