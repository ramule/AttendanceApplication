import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsHolidayPage } from './lms-holiday';

@NgModule({
  declarations: [
    LmsHolidayPage,
  ],
  imports: [
    IonicPageModule.forChild(LmsHolidayPage),
  ],
})
export class LmsHolidayPageModule {}
