import { StorageService } from './../../providers/storage.service';
import { Usuario } from './../../model/usuario';
import { UserServiceService } from './../../providers/user/user-service.service';
import { Router } from "@angular/router";
import { NavController, ToastController } from "@ionic/angular";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  usuario: Usuario

  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(public router: Router, private userService: UserServiceService, private storage: StorageService, private toast: ToastController) { }

  ngOnInit() { }

  login() {
    let userLogin = {
      login: this.username.value,
      password: this.password.value,
      UUID: 'UUID'
    }

    this.userService.loginAuthentication(userLogin).subscribe(result => {
      let status = result['status']
      let user = result['userData'][0]

      if (status == 'success') {

        this.storage.save('Usuario', user)
        this.router.navigateByUrl("/app/tabs/tab1");

        this.showToast('Welcome')
      } else {

        this.showToast('Houve um problema')
      }

    })


  }

  async showToast(mensagem: string) {
    const toast = await this.toast.create({ message: mensagem, duration: 3000 });
    toast.present();
  }
}
