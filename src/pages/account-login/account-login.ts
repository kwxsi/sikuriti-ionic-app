// Plugins | Dependencies imported
import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, Platform, ModalController, LoadingController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';

// Pages and Providers imported
import { SignUp } from '../sign-up/sign-up';
import { Dashboard } from '../dashboard/dashboard';
import { UsersService } from '../../providers/users-service/users-service';

@IonicPage()
@Component({
  selector: 'page-account-login',
  templateUrl: 'account-login.html',
  providers: [UsersService],
  animations: [

    //Logo animation
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0' }),
        animate('2000ms ease-in-out')
      ])
    ]),

    //Background detail animation
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0)' }),
        animate('1000ms ease-in-out')
      ])
    ]),

    //Login Form animation
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

    //Login button animation
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

export class AccountLogin {
  // variables declarations and initializations
  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";

  public email: any;
  public password: any;

// class constructor
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private loadingController: LoadingController,
    public navParams: NavParams,
    public angfire: AngularFire,
    public alertCtrl: AlertController,
    private platform: Platform,
    private usersService: UsersService) {

  }

//Executes when page is called
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountLogin');
  }

// calls user service provider to log-in user
  login() {
    this.usersService.loginUser(this.email, this.password)
      .then(authData => {
        //successfull

        loader.present().then(() => {
          this.navCtrl.setRoot(Dashboard);
          loader.dismiss().catch(() => { });
        });
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Error logging in. :(',
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();
      });

    let loader = this.loadingController.create({
    });

  }

// Navigate to Sign UP Page
  signup() {
    this.navCtrl.push(SignUp);
  }

// calls user service provider to reset password
  showForgotPassword() {
    let prompt = this.alertCtrl.create({
      title: 'Enter Your Email',
      message: "A new password will be sent to your email.",
      inputs: [
        {
          name: 'recoverEmail',
          placeholder: 'youremail@example.com'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            let loading = this.loadingController.create({
              dismissOnPageChange: true,
              content: 'Resseting your password..'
            });
            loading.present();
            this.usersService.forgotPasswordUser(data.recoverEmail)
              .then(() => {
                loading.dismiss().then(() => {
                  let alert = this.alertCtrl.create({
                    title: 'Check your email',
                    subTitle: 'Password reset succesful',
                    buttons: ['OK']
                  });
                  alert.present();
                })
              }, error => {
                loading.dismiss().then(() => {
                  let alert = this.alertCtrl.create({
                    title: 'Error resetting password',
                    subTitle: error.message,
                    buttons: ['OK']
                  });
                  alert.present();
                })
              });
          }
        }
      ]
    });
    prompt.present();
  }

}
