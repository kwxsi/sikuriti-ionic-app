// Plugins | Dependencies imported
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Pages imported
import { UsersService } from '../../providers/users-service/users-service';
import { FireTips} from '../fire-tips/fire-tips';
import { AccountLogin } from '../account-login/account-login';
import { About } from '../about/about';
import { Help } from '../help/help';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [ UsersService]
})
export class Settings {

// class constructor
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private usersService: UsersService) {
  }
 // Executes when page is called
  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }

// Navigates to Help Page
  openHelp(){
    this.navCtrl.push(Help);
  }

// Navigates to About Page
  openAbout(){
    this.navCtrl.push(About);
  }

// Navigates to fire extinguisher page
  openTips(){
    this.navCtrl.push(FireTips);
  }

// Signs out user from app to Account Login page
  signoutUser(){
    this.usersService.logoutUser().then(() => {
      this.navCtrl.setRoot(AccountLogin);
    });
  }


}
