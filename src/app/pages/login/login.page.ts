import { SupplierService } from './../../providers/service/supplier/supplier.service';
import { StorageService } from '../../providers/storage/storage.service';
import { Usuario } from './../../model/usuario';
import { UserServiceService } from '../../providers/service/user/user-service.service';
import { Router } from "@angular/router";
import { NavController, ToastController, LoadingController } from "@ionic/angular";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ProductServiceService } from 'src/app/providers/service/product/product-service.service';
import { NativeKeyboard } from '@ionic-native/native-keyboard/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  usuario: Usuario
  loading: any;
  enterButton: boolean;
  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(public router: Router,
    private userService: UserServiceService,
    private storage: StorageService,
    private toast: ToastController,
    private apiProduct: ProductServiceService,
    private apiSupplier: SupplierService,
    private loadingController: LoadingController,
    private nativeKb: NativeKeyboard,
    private keybd: Keyboard
  ) { }

  ngOnInit() { }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Autenticando aguarde ...'
    });
    await this.loading.present();
  }

  async dismissLoading() {
    this.enableButton();
    return await this.loading.dismiss();
  }

  async disableButton() {
    return this.enterButton = true;
  }

  async enableButton() {
    return this.enterButton = false;
  }

  keyboard() {
    if (this.keybd.isVisible) {
      this.showToast('open');
      return true;
    } else {


      this.showToast('close');
      return false;
    }
  }

  async login() {
    await this.disableButton();
    await this.presentLoading();

    let userLogin = {
      login: this.username.value,
      password: this.password.value,
      UUID: 'UUID'
    };


    this.userService.loginAuthentication(userLogin).subscribe(result => {

      let status = result['status'];
      let user = result['userData'][0];

      if (status === 'success') {
        this.dismissLoading();
        this.fillStorageFunctions(user);
        this.router.navigateByUrl("/app/tabs/tab2");
        this.showToast('Welcome');

      } else {
        this.dismissLoading();
        this.showToast('Houve um problema');
      }
    });
  }

  fillStorageFunctions(user) {
    this.fillStorageRequestedProducts(user['grupoEconomico']);
    this.fillStorageSuppliers();

    this.storage.usuario = user;
    this.storage.save('Usuario', user);
  }

  fillStorageSuppliers() {
    this.apiSupplier.getAll().subscribe(result => {
      this.storage.update('ClienteFornecedor', result);
    });
  }

  fillStorageRequestedProducts(grupoEconomico: number) {
    this.apiProduct.getDetailedByGroup(grupoEconomico).subscribe(result => {

      this.storage.update('ProdutoPedido', result);

    });

  }

  async showToast(mensagem: string) {
    const toast = await this.toast.create({ message: mensagem, duration: 3000 });
    toast.present();
  }
}
