import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { RestProvider } from './../../providers/rest/rest';
import { Storage } from '@ionic/storage';

import { QrscanPage } from '../qrscan/qrscan';
import { LmsDashboardPage } from '../lms-dashboard/lms-dashboard';

/**
 * Generated class for the LmsApplyLeavePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lms-apply-leave',
  templateUrl: 'lms-apply-leave.html',
})
export class LmsApplyLeavePage {

  //public leave_type = "";
  public data: any = [];
  public items: any = [];
  public startdate: any = "";
  public enddate: any = "";
  public compoffdate: any = "";
  public inlieudate: any = "";
  public emp_id: any = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public datePicker: DatePicker,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public restProvider: RestProvider,
    public storage: Storage) {
    this.data.leave_type = "priviledge_leave";
    this.data.leave_desc = "";
    this.data.reason = "";
    this.storage.get('username').then((data) => {
      this.emp_id = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LmsApplyLeavePage');
  }

  openScannerPageApplyLeave() {
    this.navCtrl.push(QrscanPage);
  }

  changeType(val) {
    console.log(val);
    //this.leave_type = val;
  }

  showDatePickerStartDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK,
      allowOldDates: true, allowFutureDates: false
    }).then(
      date => {
        console.log('Got date: ', date);
        this.startdate = this.formatDate(date);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  showDatePickerEndDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK,
      allowOldDates: true, allowFutureDates: false
    }).then(
      date => {
        console.log('Got date: ', date);
        this.enddate = this.formatDate(date);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  showDatePickerInLieuDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK,
      allowOldDates: true, allowFutureDates: false
    }).then(
      date => {
        console.log('Got date: ', date);
        this.inlieudate = this.formatDate(date);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  showDatePickerCompOffDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK,
      allowOldDates: true, allowFutureDates: false
    }).then(
      date => {
        console.log('Got date: ', date);
        this.compoffdate = this.formatDate(date);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  formatDate(date) {
    var day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
  }

  submit(data) {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    console.log(data);

    if (data.leave_type == 'priviledge_leave') {

      if (this.startdate == '' || this.startdate == undefined) {
        toaster.setMessage('start date is required');
        toaster.present();
        return false;
      }

      if (this.enddate == '' || this.enddate == undefined) {
        toaster.setMessage('end date is required');
        toaster.present();
        return false;
      }

      if (data.reason == '' || data.reason == undefined) {
        toaster.setMessage('reason is required');
        toaster.present();
        return false;
      }

    }

    if (data.leave_type == 'comp_off') {

      if (this.inlieudate == '' || this.inlieudate == undefined) {
        toaster.setMessage('In Lieu date is required');
        toaster.present();
        return false;
      }

      if (this.compoffdate == '' || this.compoffdate == undefined) {
        toaster.setMessage('Comp Off date is required');
        toaster.present();
        return false;
      }

    }

    let loading = this.loadingCtrl.create({ content: ' please wait....' });
    loading.present();

    this.restProvider.insertLeaves(data, this.startdate, this.enddate,
      this.inlieudate, this.compoffdate, this.emp_id).subscribe(data => {
        loading.dismissAll();
        this.items = data;
        if (this.items.ErrorCode == "0") {
          this.presentAlert('Success', "Leave applied successfully...");
          this.navCtrl.setRoot(LmsDashboardPage);
        }
        else {
          this.presentAlert('Failed', this.items.ErrorMessage);
        }
      },
        err => {
          loading.dismissAll();
          console.log(JSON.stringify(err));
          this.presentAlert('Error', "Failed to pass the data. Check your internet connection.");
        }
      )
  }

  presentAlert(title, subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['close']
    });
    alert.present();
  }

}
