import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LmsDashboardPage } from '../lms-dashboard/lms-dashboard';
import { LmsHolidayPage } from '../lms-holiday/lms-holiday';
import { LmsLeaveDetailsPage } from '../lms-leave-details/lms-leave-details';
import { LmsApplyLeavePage } from '../lms-apply-leave/lms-apply-leave';
import { LmsViewLeavePage } from '../lms-view-leave/lms-view-leave';
import { QrscanPage } from '../qrscan/qrscan';

/**
 * Generated class for the LmsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lms',
  templateUrl: 'lms.html',
})
export class LmsPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController) {
  }

  dashboardFunction() {
    this.navCtrl.setRoot(LmsDashboardPage);
  }

  holidayFunction() {
    this.navCtrl.setRoot(LmsHolidayPage);
  }

  applyLeaveFunction() {
    this.navCtrl.setRoot(LmsApplyLeavePage);
  }

  viewLeaveFunction() {
    this.navCtrl.setRoot(LmsViewLeavePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LmsPage');
  }

  openScannerPageLMS() {
    this.navCtrl.push(QrscanPage);
  }

}
