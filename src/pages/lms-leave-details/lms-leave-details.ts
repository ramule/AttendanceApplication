import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QrscanPage } from '../qrscan/qrscan';

/**
 * Generated class for the LmsLeaveDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lms-leave-details',
  templateUrl: 'lms-leave-details.html',
})
export class LmsLeaveDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LmsLeaveDetailsPage');
  }

  openScannerPageLeaveDetails(){
    this.navCtrl.push(QrscanPage);
  }

}
