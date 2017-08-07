import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountLogin } from './account-login';

@NgModule({
  declarations: [
    AccountLogin,
  ],
  imports: [
    IonicPageModule.forChild(AccountLogin),
  ],
  exports: [
    AccountLogin
  ]
})
export class AccountLoginModule {}
