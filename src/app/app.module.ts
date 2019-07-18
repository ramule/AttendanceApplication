import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from  '@angular/common/http';
import { MyApp } from './app.component';
import { Calendar } from '@ionic-native/calendar';
import { DatePicker } from '@ionic-native/date-picker';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';
//import { PhotoViewer } from '@ionic-native/photo-viewer';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LmsPage } from '../pages/lms/lms';
import { FaqPage } from '../pages/faq/faq';
import { MyAccountPage } from '../pages/my-account/my-account';
import { PaySleepPage } from '../pages/pay-sleep/pay-sleep';
import { QrscanPage } from '../pages/qrscan/qrscan';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { LmsDashboardPage } from '../pages/lms-dashboard/lms-dashboard';
import { LmsApplyLeavePage } from '../pages/lms-apply-leave/lms-apply-leave';
import { LmsHolidayPage } from '../pages/lms-holiday/lms-holiday';
import { LmsViewLeavePage } from '../pages/lms-view-leave/lms-view-leave';
import { LmsLeaveDetailsPage } from '../pages/lms-leave-details/lms-leave-details';
import { AttendancePage } from '../pages/attendance/attendance';
import { GroupchatPage } from '../pages/groupchat/groupchat';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

import { RestProvider } from '../providers/rest/rest';
import { DatabaseProvider } from '../providers/database/database';
//import { QRScanner} from '@ionic-native/qr-scanner/ngx';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LmsPage,
    FaqPage,
    MyAccountPage,
    PaySleepPage,
    QrscanPage,
    WelcomePage,
    LoginPage,
    LmsDashboardPage,
    LmsApplyLeavePage,
    LmsHolidayPage,
    LmsViewLeavePage,
    LmsLeaveDetailsPage,
    AttendancePage,
    GroupchatPage,
    EditProfilePage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LmsPage,
    FaqPage,
    MyAccountPage,
    PaySleepPage,
    QrscanPage,
    WelcomePage,
    LoginPage,
    LmsDashboardPage,
    LmsApplyLeavePage,
    LmsHolidayPage,
    LmsViewLeavePage,
    LmsLeaveDetailsPage,
    AttendancePage,
    GroupchatPage,
    EditProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    Calendar,
    SQLite,
    QRScanner,
    Uid,
    AndroidPermissions,
    //PhotoViewer,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    DatabaseProvider
  ]
})
export class AppModule { }
