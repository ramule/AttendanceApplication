import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaySleepPage } from './pay-sleep';

@NgModule({
  declarations: [
    PaySleepPage,
  ],
  imports: [
    IonicPageModule.forChild(PaySleepPage),
  ],
})
export class PaySleepPageModule {}
