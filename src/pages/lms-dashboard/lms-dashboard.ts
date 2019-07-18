import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { QrscanPage } from '../qrscan/qrscan';
import { RestProvider } from './../../providers/rest/rest';
import { Storage } from '@ionic/storage';

import { LmsApplyLeavePage } from '../lms-apply-leave/lms-apply-leave';
import { LmsViewLeavePage } from '../lms-view-leave/lms-view-leave';
import { LmsHolidayPage } from '../lms-holiday/lms-holiday';

/**
 * Generated class for the LmsDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lms-dashboard',
  templateUrl: 'lms-dashboard.html',
})
export class LmsDashboardPage {

  public item:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public storage: Storage) 
    {
    this.storage.get('username').then((empid) => {
      let loading = this.loadingCtrl.create({ content: ' please wait....' });
      loading.present();
      this.restProvider.viewLeaveCount(empid).subscribe(data => {
          loading.dismissAll();
          this.item = data;
        },
        err => {
          loading.dismissAll();
          this.presentAlert('Error', "Failed to pass the data. Check your internet connection.");
        }
      )
    })
  }

  presentAlert(title, subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['close']
    });
    alert.present();
  }

  openScannerPageDashboard(){
    this.navCtrl.push(QrscanPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LmsDashboardPage');
  }

  openPageApplyLeave(){
    this.navCtrl.setRoot(LmsApplyLeavePage);
  }

  openViewLeavesPage(){
    this.navCtrl.setRoot(LmsViewLeavePage);
  }

  viewHolidayPage(){
    this.navCtrl.setRoot(LmsHolidayPage);
  }
}
