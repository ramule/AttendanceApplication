import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { PhotoViewer } from '@ionic-native/photo-viewer';

import { QrscanPage } from '../qrscan/qrscan';

import { RestProvider } from './../../providers/rest/rest';
import { DatabaseProvider } from './../../providers/database/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public result: any = [];
  public items: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController,
    public menuController: MenuController,
    public restProvider: RestProvider,
    public sqlite: SQLite,
    public database: DatabaseProvider) {
    //public photoViewer: PhotoViewer) 
    menuController.enable(true);


    restProvider.getMessage().subscribe(data => {
      console.log(data);
      this.result = data
      if (this.result['ErrorCode'] == 0) {
        this.items = this.result.data;
        this.database.setNotices(this.items);
      }
    },
      err => {
        console.log(err);
      });

    this.database.getNotices().then(data => {
      console.log("data:" + JSON.stringify(data));
      this.items = data;
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

  openScannerPage() {
    this.navCtrl.push(QrscanPage);
  }

  /* showImage(image){
     this.photoViewer.show(image);
   }*/
}