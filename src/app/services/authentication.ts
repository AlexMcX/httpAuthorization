import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from '../models/user';
import {ObjectEx} from '../utils/object-ex';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private TOKEN = 'token';
    private BASE_URL = 'http://localhost:4201/';

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public isRememberMe = false;

    constructor(private http: HttpClient) {
        // this.currentUserSubject = new BehaviorSubject<User>(localStorage.getItem('token')));
        // this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(data: object) {
        const respData = ObjectEx.createObject(data);

        console.log('login:', respData);
        if (respData) {
            const prm = new Promise((resolve, reject) => {
                this.http.get(this.BASE_URL + 'login', {
                    params: respData,
                    observe: 'response'
                })
                .toPromise()
                .then(response => {
                        if (response.status === 200) {
                            response = JSON.parse(JSON.stringify(response.body));

                            if (response['result'] === true) {
                                this.loginSuccess(response);
                            }

                            resolve(response);
                        }
                }, rejected => {
                    reject(rejected);
                });
            });

            return prm;
        }

        console.log('Don\'t create promise to login, because request data is null');

        return null;
    }

    init() {
        let uuid = sessionStorage.getItem(this.TOKEN);

        uuid = uuid == null ? localStorage.getItem(this.TOKEN) : uuid;

        if (uuid != null) {
            this.login({'uuid': uuid});
        }

        uuid = uuid == null ? '' : uuid;

        this.currentUserSubject = new BehaviorSubject<User>(new User());
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentUserSubject.next(this.currentUserValue);
    }

    registration(data: object) {
        const respData = ObjectEx.createObject(data, ['confirmPassword']);
        console.log('registration:', respData);
        if (respData) {
            const prm = new Promise((resolve, reject) => {
                if (!respData) {
                    reject(null);
                }

                this.http.get(this.BASE_URL + 'auth', {
                    params: respData,
                        observe: 'response'
                }).
                toPromise().then (response => {
                    if (response.status === 200) {
                        response = JSON.parse(JSON.stringify(response.body));

                        if (response['result'] === true) {
                            this.loginSuccess(response);
                        }

                        resolve(response);
                    }
                }, rejected => {
                    reject(rejected);
                });
            });

            return prm;
        }

        console.log('Don\'t create promise to registartion, because request data is null');

        return null;
    }

    logout() {
        if (this.currentUserValue.uuid === undefined) {
            return;
        }

        const prm = new Promise((resolve, reject) => {
            this.http.get(this.BASE_URL + 'logout', {
                params: {
                    uuid: this.currentUserValue.uuid
                    },
                    observe: 'response'
            }).
            toPromise().then (response => {
                if (response.status === 200) {
                    // console.log('LOGOUT: ', response);
                    response = JSON.parse(JSON.stringify(response.body));

                     // remove user from local storage to log user out
                    localStorage.removeItem(this.TOKEN);

                    sessionStorage.removeItem(this.TOKEN);

                    this.currentUserValue.uuid = undefined;

                    this.currentUserSubject.next(this.currentUserValue);

                    resolve(response);
                }
            }, rejected => {
                reject(rejected);
            });
        });

        return prm;
    }

    private loginSuccess(response: any) {
        this.currentUserValue.pareseFromJson(response);

        console.log('response login: ', response);

        if (this.isRememberMe) {
            localStorage.setItem(this.TOKEN, this.currentUserValue.uuid);
        }

        sessionStorage.setItem(this.TOKEN, this.currentUserValue.uuid);

        this.currentUserValue.uuid = this.currentUserValue.uuid;

        this.currentUserSubject.next(this.currentUserValue.uuid !== '' ? this.currentUserValue : null);
    }
}
