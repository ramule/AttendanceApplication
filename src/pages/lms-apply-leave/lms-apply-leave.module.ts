import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsApplyLeavePage } from './lms-apply-leave';

@NgModule({
  declarations: [
    LmsApplyLeavePage,
  ],
  imports: [
    IonicPageModule.forChild(LmsApplyLeavePage),
  ],
})
export class LmsApplyLeavePageModule {}
