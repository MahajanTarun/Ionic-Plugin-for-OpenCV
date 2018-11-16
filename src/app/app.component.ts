import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
// import { AndroidPermissions } from '@ionic-native/android-permissions';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // this.getPermissions();
        // androidPermissions.requestPermissions(
        //    [
        //      androidPermissions.PERMISSION.CAMERA, 
        //      androidPermissions.PERMISSION.CALL_PHONE, 
        //      androidPermissions.PERMISSION.GET_ACCOUNTS, 
        //      androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, 
        //      androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
        //    ]
        //  );
      statusBar.styleDefault();
      splashScreen.hide();
      console.log("\n\n\n\n\nScreen_Width:"+window.screen.width);
      console.log("\n\n\n\n\nScreen_Height:"+window.screen.height);
    });
  }

  // getPermissions(){
  //   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
  //     result => console.log('Has permission?',result.hasPermission),
  //     err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
  //   );

  //   this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE]);
  // }
}
