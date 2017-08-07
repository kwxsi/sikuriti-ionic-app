import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlertFire } from './alert-fire';

@NgModule({
  declarations: [
    AlertFire,
  ],
  imports: [
    IonicPageModule.forChild(AlertFire),
  ],
  exports: [
    AlertFire
  ]
})
export class AlertFireModule {}
