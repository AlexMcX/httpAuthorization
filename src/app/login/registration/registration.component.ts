import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword:  ['', Validators.required],
      firstName:  ['', Validators.required],
      lastName:  ['', Validators.required],
      nickName:  ['', Validators.required]
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onAuth() {
    if (this.f.password.value !== this.f.confirmPassword.value) {
        this.error = 'Passwords do not match, try again';

        return;
    }

    this.error = '';

    this.authenticationService.registration(this.f).then(
      response => {
          if (response['result'] === false) {
              this.error = response['message'] as string;
          } else {
            this.router.navigate(['/home']);
          }

          this.loading = false;
      });

      this.loading = false;
  }
}
