import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Help } from './help';

@NgModule({
  declarations: [
    Help,
  ],
  imports: [
    IonicPageModule.forChild(Help),
  ],
  exports: [
    Help
  ]
})
export class HelpModule {}
