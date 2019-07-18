import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { QrscanPage } from '../qrscan/qrscan';
import { RestProvider } from './../../providers/rest/rest';

/**
 * Generated class for the LmsHolidayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lms-holiday',
  templateUrl: 'lms-holiday.html',
})
export class LmsHolidayPage {

  public formdata: any = [];
  public items: any = [];
  public myData: any = [];
  public myHeader: any = ["Sr.no", "Date", "Day"];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LmsHolidayPage');
  }

  openScannerPageHoliday() {
    this.navCtrl.push(QrscanPage);
  }

  viewHoliday(formdata) {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    console.log(formdata);

    if (formdata.location == "" || formdata.location == undefined) {
      toaster.setMessage('location is required...!');
      toaster.present();
      return false;
    }

    if (formdata.year == "" || formdata.year == undefined) {
      toaster.setMessage('year is required...!');
      toaster.present();
      return false;
    }

    let loading = this.loadingCtrl.create({ content: 'loading data..please wait....!' });
    loading.present();

    this.restProvider.viewHolidayList(formdata).subscribe(
      data => {
        loading.dismissAll();
        this.items = data;
        console.log("Holiday Data", this.items);

        if (this.items.ErrorCode == 0) {
          this.myData = this.items.data;
        }

        else {
          this.presentAlert('Failed', this.items.ErrorMessage);
        }
      },
      err => {
        loading.dismissAll();
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
