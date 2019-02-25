import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        // private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        this.error = '';

        const prm = this.authenticationService.login(this.f);

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

    onRegister() {
        this.router.navigate(['/reg']);
    }

    toggleIsRemember(value: any) {
        this.authenticationService.isRememberMe = value.target.checked;
    }
}
