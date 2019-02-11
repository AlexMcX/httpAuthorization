import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication';

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
        private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm:  ['', Validators.required]
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onAuth() {
    if (this.f.password.value !== this.f.confirm.value) {
        this.error = 'Passwords do not match, try again';

        return;
    }

    this.error = '';

    this.authenticationService.registration(this.f.email.value, this.f.password.value).then(
      response => {
          if (response['result'] === false) {
              this.error = response['message'] as string;
          }
          this.loading = false;
      });

      this.loading = false;
  }

}
