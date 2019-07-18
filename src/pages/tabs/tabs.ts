import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { GroupchatPage } from '../groupchat/groupchat';
import { AttendancePage } from '../attendance/attendance';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = GroupchatPage;
  tab3Root = AttendancePage;

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {

  }
}