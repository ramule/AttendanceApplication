import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { QrscanPage } from '../qrscan/qrscan';
import { RestProvider } from './../../providers/rest/rest';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {

  public userdata: any = [];
  public emp_id: any = "";
  public myData: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public storage: Storage) {

      this.storage.get('username').then((data) => {
      this.emp_id = data;
      console.log('Employee Info', this.emp_id);

      let loading = this.loadingCtrl.create({ content: 'loading data..please wait....!' });
      loading.present();

      this.restProvider.viewAttendanceDetails(this.emp_id).subscribe(
        data => {
          loading.dismissAll();
          this.userdata = data;
          console.log("Attendance data", this.userdata);

          if (this.userdata.ErrorCode == 0) {
            this.myData = this.userdata.data;
          }

          else {
            this.presentAlert('Failed', this.userdata.ErrorMessage);
          }
        },
        err => {
          loading.dismissAll();
          this.presentAlert('Error', "Failed to pass the data. Check your internet connection.");
        }
      )
    })

  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
    }, 2000);
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
    console.log('ionViewDidLoad AttendancePage');
  }

  openScannerPageAttendance() {
    this.navCtrl.push(QrscanPage);
  }

}
