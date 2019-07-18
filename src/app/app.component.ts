import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { TabsPage } from '../pages/tabs/tabs';
import { LmsPage } from '../pages/lms/lms';
import { PaySleepPage } from '../pages/pay-sleep/pay-sleep';
import { MyAccountPage } from '../pages/my-account/my-account';
import { FaqPage } from '../pages/faq/faq';
import { LoginPage } from '../pages/login/login';

import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  pages: any = [];
  pages1: any = [];
  rootPage: any = "";
  imei: any = "";
  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen,
    public storage: Storage,
    public database: DatabaseProvider,
    public alertCtrl: AlertController,
    public uid: Uid,
    public androidPermissions: AndroidPermissions) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      splashScreen.hide();

      this.database.connectToDb();
      this.getImei();

      this.storage.get('username').then((username) => {
        console.log(username);
        if ((username != '') && (username != undefined) && (username != null)) {
          this.rootPage = TabsPage;
        }
        else {
          this.rootPage = LoginPage;
        }
      });

      this.pages = [
        { title: 'Home', component: TabsPage, icon: 'home' },
        { title: "My Account", component: MyAccountPage, icon: 'md-person' },
      ];

      this.pages1 = [
        { title: "LMS", component: LmsPage, icon: 'ios-body' },
        { title: "Pay Sleep", component: PaySleepPage, icon: 'ios-cash' },
        { title: "FAQ", component: FaqPage, icon: 'md-help' },
        { title: "Logout", component: null, icon: 'log-out' }
      ];

    });
  }

  OpenPageBrowse(p) {
    this.nav.setRoot(p.component);
  }

  OpenPageExplore(q) {

    if (q.component == null) {
      let alert = this.alertCtrl.create({
        message: 'Are you sure you want to logout?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.storage.remove('username');
              this.nav.setRoot(LoginPage)
            }
          },
          {
            text: 'No',
            handler: () => {
              console.log("No clicked");
            }

          }
        ]
      })
      alert.present()
    }
    else {
      this.nav.setRoot(q.component);
    }

  }

  async getImei() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );

    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );

      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }
      return;
    }
    this.storage.set('imei', this.uid.IMEI);
  }
  
}
