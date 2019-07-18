import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsDashboardPage } from './lms-dashboard';

@NgModule({
  declarations: [
    LmsDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(LmsDashboardPage),
  ],
})
export class LmsDashboardPageModule {}
