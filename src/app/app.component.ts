import { Component, Output, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @Output() isLogin: Boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    authenticationService.init();

    authenticationService.currentUser.subscribe( value => {
      this.isLogin = value.uuid !== undefined;
    });
  }

  logout() {
    this.authenticationService.logout().then(
      response => {
        if (response['result'] === false) {
          this.router.navigate(['/home']);
        }
    });
  }

  login() {
    this.router.navigate(['/login']);
  }
}
