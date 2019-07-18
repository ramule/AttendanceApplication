import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsLeaveDetailsPage } from './lms-leave-details';

@NgModule({
  declarations: [
    LmsLeaveDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(LmsLeaveDetailsPage),
  ],
})
export class LmsLeaveDetailsPageModule {}
