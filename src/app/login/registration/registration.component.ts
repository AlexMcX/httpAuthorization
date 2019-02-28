import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  authForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword:  ['', Validators.required],
        firstName:  ['', Validators.required],
        lastName:  ['', Validators.required],
        nickName:  ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.authForm.controls; }

  onAuth() {
    this.submitted = true;

    // stop here if form is invalid
    // console.log(this.f.firstName.errors.required)

    if (this.authForm.invalid) {
      return;
    }

    if (this.f.password.value !== this.f.confirmPassword.value) {
        this.error = 'Passwords do not match, try again';

        return;
    }

    this.error = '';

    const prm = this.authenticationService.registration(this.f);

    if (prm) {
      prm.then(
        response => {
            if (response['result'] === false) {
                this.error = response['message'] as string;
            } else {
              this.router.navigate(['/home']);
            }

            this.loading = false;

            this.submitted = false;
        });
    } else {
        this.loading = false;
        this.submitted = false;
    }
  }
}
