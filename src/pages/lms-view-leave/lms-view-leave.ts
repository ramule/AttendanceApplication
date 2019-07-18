import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { QrscanPage } from '../qrscan/qrscan';
import { RestProvider } from './../../providers/rest/rest';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LmsViewLeavePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lms-view-leave',
  templateUrl: 'lms-view-leave.html',
})
export class LmsViewLeavePage {

  public empid: any = "";
  public leaveData: any = [];
  public items: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public storage: Storage) {

    this.storage.get('username').then((empid) => {
      let loading = this.loadingCtrl.create({ content: ' please wait....' });
      loading.present();

      this.restProvider.viewLeaveDetails(empid).subscribe(data => {
        loading.dismissAll();
        this.items = data;
        console.log("Leave Data", this.items);
        if (this.items.ErrorCode == 0) {
          this.leaveData = this.items.data;
        }
        else {
          this.presentAlert('Success', this.items.ErrorMessage);
        }
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LmsViewLeavePage');
  }

  openScannerPageViewLeave() {
    this.navCtrl.push(QrscanPage);
  }

}
