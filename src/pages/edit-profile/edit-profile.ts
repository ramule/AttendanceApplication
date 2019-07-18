import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from './../../providers/rest/rest';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  public type = "";
  public userdata: any = [];
  public formdata: any = [];
  public items: any = [];
  public empid: any = "";
  public photo: File;
  public photo_base64 = "";
  public eventPhotoFile: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public storage: Storage,
    public restProvider: RestProvider) {

    this.type = this.navParams.get('type');
    this.userdata = this.navParams.get('userdata');
    console.log(this.userdata);

    this.storage.get('username').then((data) => {
      this.empid = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  } 

  update(formdata) {

    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    console.log(formdata);

    if (formdata.type == 'address') {

      if (formdata.street_address == '' || formdata.street_address == undefined) {
        toaster.setMessage('Street address is required');
        toaster.present();
        return false;
      }
      if (formdata.city == '' || formdata.city == undefined) {
        toaster.setMessage('City name is required');
        toaster.present();
        return false;
      }
      if (formdata.state == '' || formdata.state == undefined) {
        toaster.setMessage('State name is required');
        toaster.present();
        return false;
      }

      if (formdata.country == '' || formdata.country == undefined) {
        toaster.setMessage('Country name is required');
        toaster.present();
        return false;
      }

      if (formdata.pincode == '' || formdata.pincode == undefined) {
        toaster.setMessage('Pincode name is required');
        toaster.present();
        return false;
      }

    }

    if (formdata.type == 'mobile_no') {

      if (formdata.mobile_no == '' || formdata.mobile_no == undefined) {
        toaster.setMessage('Mobile number is required');
        toaster.present();
        return false;
      }
    }

    

    /* if (this.type == 'photo' && ((!this.photo_base64) || this.photo_base64 == undefined)) {
       toaster.setMessage('Photo is required');
       toaster.present();
       return false;
     }*/

    let loading = this.loadingCtrl.create({ content: ' please wait....' });
    loading.present();

    this.restProvider.updateProfile(this.type, formdata, this.empid).subscribe(
      data => {
        loading.dismissAll();
        this.items = data;
        if (this.items.ErrorCode == 0) {
          this.storage.set('empInfo', this.items.data[0]);
          let loading = this.loadingCtrl.create({
            content: 'update successful...',
            duration: 1000
          });
          loading.present();
          this.viewCtrl.dismiss();
        }
        else {
          this.presentAlert('Failed', this.items.ErrorMessage);
        }
      },
      err => {
        loading.dismissAll();
        console.log(JSON.stringify(err));
        this.presentAlert('Failed', "Failed to pass the data. Check your internet connection.");
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
