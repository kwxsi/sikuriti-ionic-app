// Plugins | Dependencies imported
import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, Platform, ModalController, LoadingController } from 'ionic-angular';

// Pages and Providers imported
import { UsersService } from '../../providers/users-service/users-service';
import { Dashboard } from '../dashboard/dashboard';


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
  providers: [UsersService],
  animations: [

    //For the logo animation
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0' }),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail animation
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0)' }),
        animate('1000ms ease-in-out')
      ])
    ]),

    //For the login form animation
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({ transform: 'translate3d(0,2000px,0)', offset: 0 }),
          style({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
        ]))
      ])
    ]),

    //For login button animation
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class SignUp {
  // variables declarations
  public email: any;
  public password: any;

// class constructor
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private loadingController: LoadingController,
    public navParams: NavParams,
    public alertController : AlertController,
    private platform: Platform,
    private usersService: UsersService
  ) {
  }

// Executes when page is called
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUp');
  }

// Calls user service class to sign up user
  signUserUp(){
    this.usersService.signUpUser(this.email, this.password)
    .then(authData => {
      //successfull
      
      loader.present().then(() => {
        this.navCtrl.setRoot(Dashboard);
        loader.dismiss().catch(() => {});
      }); 
    }, error => {
      //alert("error logging in: " + error.)
    });

    let loader = this.loadingController.create({
      //dismissOnPageChange: true,
    });

    
  }
}
