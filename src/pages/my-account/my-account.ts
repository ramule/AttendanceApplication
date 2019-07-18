import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { QrscanPage } from '../qrscan/qrscan';

import { Storage } from '@ionic/storage';
import { RestProvider } from './../../providers/rest/rest';
import { EditProfilePage } from '../edit-profile/edit-profile';

/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  public userdata: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController,
    public restProvider: RestProvider,
    public modalCtrl: ModalController,
    public storage: Storage) {

    this.initilizePage();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccountPage');
  }

  openScannerPageMyAcc() {
    this.navCtrl.push(QrscanPage);
  }

  initilizePage() {
    this.storage.get('empInfo').then((data) => {
      this.userdata = data;
      console.log('Employee Info', this.userdata);
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
    }, 3000);
  }

  editProfile(type) {
    var modalPage = this.modalCtrl.create(EditProfilePage, { type : type,userdata: this.userdata });
    modalPage.onDidDismiss(() => {
      this.initilizePage();
    });
    modalPage.present();
  }
}

