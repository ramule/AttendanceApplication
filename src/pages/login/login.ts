import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public formdata: any = [];
  public items: any = [];
  public imei: any = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public storage: Storage
  ) {
    this.storage.get('imei').then((data) => {
      this.imei = data;
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(formdata) {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    console.log(formdata);

    if (formdata.username == '' || formdata.username == undefined) {
      toaster.setMessage('Username is required');
      toaster.present();
      return false;
    }
    if (formdata.password == '' || formdata.password == undefined) {
      toaster.setMessage('password is required');
      toaster.present();
      return false;
    }

    let loading = this.loadingCtrl.create({
      content : "Logging in.. Please wait...!",
      duration : 2000
    })
    loading.present();

    this.restProvider.loginAuthentication(formdata, this.imei).subscribe(
      data => {
        loading.dismissAll();
        this.items = data;
        console.log("meradata", this.items);
        if (this.items.ErrorCode == 0) {
          this.storage.set('username', this.items.data[0].emp_id);
          this.storage.set('empInfo', this.items.data[0]);
          this.navCtrl.setRoot(TabsPage);
        }
        else {
          this.presentAlert('Failed', this.items.ErrorMessage);
        }
      },
      err => {
        loading.dismissAll();
        console.log(JSON.stringify(err));
        this.presentAlert('Error', "Oops, Something went wrong..!");
      }
    );
  }

  presentAlert(title, subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
