import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async presentAlertExit() {

    const alert = await this.alertController.create({
      header: 'Sair',
      message: '<strong>Deseja sair ?</strong>',
      buttons: [
        {

          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {

          text: 'Okay',
          handler: () => {
            this.router.navigate(["/login"]);
          }
        }
      ]
    });

    await alert.present();

  }

}
