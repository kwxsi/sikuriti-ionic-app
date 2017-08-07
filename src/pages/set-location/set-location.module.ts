import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetLocation } from './set-location';

@NgModule({
  declarations: [
    SetLocation,
  ],
  imports: [
    IonicPageModule.forChild(SetLocation),
  ],
  exports: [
    SetLocation
  ]
})
export class SetLocationModule {}
