import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlertPolice } from './alert-police';

@NgModule({
  declarations: [
    AlertPolice,
  ],
  imports: [
    IonicPageModule.forChild(AlertPolice),
  ],
  exports: [
    AlertPolice
  ]
})
export class AlertPoliceModule {}
