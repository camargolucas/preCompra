import { StoragePurchasedService } from './providers/storage/storage-purchased.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storagePurchased: StoragePurchasedService
  ) {
    this.initializeApp();
    this.storagePurchased.get()
      .then((value) => {
        if (value !== null) this.storagePurchased.ProdutosComprados = value
        else this.storagePurchased.ProdutosComprados = [];

      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
