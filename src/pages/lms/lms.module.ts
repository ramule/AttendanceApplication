import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsPage } from './lms';

@NgModule({
  declarations: [
    LmsPage,
  ],
  imports: [
    IonicPageModule.forChild(LmsPage),
  ],
})
export class LmsPageModule {}
