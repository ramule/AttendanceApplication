import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsViewLeavePage } from './lms-view-leave';

@NgModule({
  declarations: [
    LmsViewLeavePage,
  ],
  imports: [
    IonicPageModule.forChild(LmsViewLeavePage),
  ],
})
export class LmsViewLeavePageModule {}
