import { UserServiceService } from './../../providers/user/user-service.service';
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  @ViewChild('username') username;
  @ViewChild('password') password;
  constructor(public router: Router, private userService: UserServiceService) { }

  ngOnInit() { }

  login() {
    let login = {
      username: this.username.value,
      password: this.password.value
    }

    this.userService.loginAuthentication(login)
    //this.router.navigateByUrl("/app/tabs/tab1");
  }
}
