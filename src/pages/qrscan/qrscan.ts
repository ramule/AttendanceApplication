import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

import { RestProvider } from './../../providers/rest/rest';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the QrscanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrscan',
  templateUrl: 'qrscan.html',
})
export class QrscanPage {

  public userdata: any = [];
  public qr_string: any = "";
  public decodedString: any = "";
  public items: any = [];
  public emp_id: any = "";
  constructor(public navCtrl: NavController, public qrScanner: QRScanner, public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public storage: Storage) {
      this.storage.get('username').then((data) => {
        this.emp_id = data;
      })
      this.scanQR();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrscanPage');
  }

  scanQR() {
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          this.qr_string = text;
          this.qrScanner.hide();
          scanSub.unsubscribe();
          this.decodedString = this.decodeString(this.qr_string);
          if (this.decodedString == "attendance_qr") {

            
            let loading = this.loadingCtrl.create({ content: ' please wait....' });
            loading.present();


            this.restProvider.addAttendance(this.emp_id).subscribe(data => {
              loading.dismissAll();
              this.items = data;
              if (this.items.ErrorCode == 0) {
                this.presentAlert('Success', this.items.ErrorMessage);
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
          else {
            alert("Invalid QR Code.");
          }
          this.navCtrl.pop();
        });
        this.showCamera();
        this.qrScanner.resumePreview();
        this.qrScanner.show();
      }
      else if (status.denied) {
        alert("camera permission was permanently denied.");
      }
      else {
        alert("permission was denied, but not permanently.");
      }
    })
      .catch((e: any) => console.log('Error is', e));
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('transparentBody');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('transparentBody');
  }

  decodeString(string) {
    try {
      var decodedString = atob(string);
      return decodedString;
    }
    catch (e) {
      console.log("Invalid QR Code.");
    }
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
