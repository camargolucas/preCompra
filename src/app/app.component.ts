import { StorageService } from './providers/storage/storage.service';
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
    private storagePurchased: StoragePurchasedService,
    private storage: StorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.storagePurchased.get()
        .then((value) => {
          if (value !== null) this.storagePurchased.ProdutosComprados = value
          else this.storagePurchased.ProdutosComprados = [];

        });

      this.storage.get('Usuario')
        .then((value => {
          if (value !== null) this.storage.usuario = value;
        }))


      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
