import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, Toast } from 'ionic-angular';
import { QrscanPage } from '../qrscan/qrscan';
import { RestProvider } from './../../providers/rest/rest';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PaySleepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay-sleep',
  templateUrl: 'pay-sleep.html',
})
export class PaySleepPage {

  public formdata: any = [];
  public items: any = [];
  public myData: any = [];
  public emp_id: any = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public restProvider: RestProvider,
    public storage: Storage) {

    this.storage.get("username").then((data) => {
      this.emp_id = data;
      console.log("Employee ID" , this.emp_id);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaySleepPage');
  }

  openScannerPagePaySleep() {
    this.navCtrl.push(QrscanPage);
  }

  viewPaySleep(formdata) {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    console.log(formdata);

    if (formdata.month == "" || formdata.month == undefined) {
      toaster.setMessage('Month is required...!');
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

    this.restProvider.ViewPaySleep(this.emp_id,formdata).subscribe(
      data => {
        loading.dismissAll();
        this.items = data;
        console.log("Paysleep Data", this.items);

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
