import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FireTips } from './fire-tips';

@NgModule({
  declarations: [
    FireTips,
  ],
  imports: [
    IonicPageModule.forChild(FireTips),
  ],
  exports: [
    FireTips
  ]
})
export class FireTipsModule {}
