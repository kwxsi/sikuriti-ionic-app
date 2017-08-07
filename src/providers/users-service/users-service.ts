// Plugins | Dependencies imported
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class UsersService {
    public fireAuth: any;
    public userProfile: any;

    constructor(private alertCtrl: AlertController){
        this.fireAuth = firebase.auth();
        this.userProfile = firebase.database().ref('users');

    }
 // Calls firebase auth to sign-in user with email and password
    loginUser(email: string, password: string): any {
        return this.fireAuth.signInWithEmailAndPassword(email, password);
    }

// calls firebase auth to sign-out user
    logoutUser() {
        return this.fireAuth.signOut();
    }

// calls firebase auth to send password reset mail
    forgotPasswordUser(email: any) {
        return this.fireAuth.sendPasswordResetEmail(email);
    }

// calls firebase auth to sign up user with email and password
    signUpUser(email: string, password: string) {
        return this.fireAuth.createUserWithEmailAndPassword(email, password).
        then((newUserCreated) => {
            this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
            this.userProfile.child(authenticatedUser.uid).set({
                    email: email
                });
            });
        });
    }
}