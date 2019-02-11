import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private BASE_URL = 'http://localhost:4201/';

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        // this.currentUserSubject = new BehaviorSubject<User>(localStorage.getItem('token')));
        // this.currentUser = this.currentUserSubject.asObservable();

        
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string, uuid?: string) {
        const prm = new Promise((resolve, reject) => {
            this.http.get(this.BASE_URL + 'login', {
                params: {
                email: email,
                password: password,
                uuid: uuid == null ? '' : uuid
                },
                observe: 'response'
            })
            .toPromise()
            .then(response => {
                    if (response.status === 200) {
                        response = JSON.parse(JSON.stringify(response.body));
                        
                        if (response['result'] === true) {
                            this.loginSuccess(response['uuid']);
                        }

                        resolve(response);
                    }
            }, rejected => {
                reject(rejected);
            });
        });

        return prm;
          
        // return this.http.post<any>(`/users/authenticate`, { username, password })
        //     .pipe(map(user => {
        //         // login successful if there's a jwt token in the response
        //         if (user && user.token) {
        //             // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('currentUser', JSON.stringify(user));
        //             this.currentUserSubject.next(user);
        //         }

        //         return user;
        //     }));
    }

    init() {
        let uuid = localStorage.getItem('token');

        if (uuid != null) {
            this.login('', '', uuid);
        }

        uuid = uuid == null ? '' : uuid;

        this.currentUserSubject = new BehaviorSubject<User>(new User());
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentUserSubject.next(this.currentUserValue);
    }

    registration(email: string, password: string) {
        const prm = new Promise((resolve, reject) => {
            this.http.get(this.BASE_URL + 'auth', {
                params: {
                    email: email,
                    password: password
                    },
                    observe: 'response'
            }).
            toPromise().then (response => {
                if (response.status === 200) {
                    response = JSON.parse(JSON.stringify(response.body));

                    resolve(response);
                }
            }, rejected => {
                reject(rejected);
            });
        });

        return prm;
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
                    localStorage.removeItem('token');

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

    private loginSuccess(uuid: string) {
        localStorage.setItem('token', uuid);
        
        this.currentUserValue.uuid = uuid;

        this.currentUserSubject.next(this.currentUserValue.uuid !== ''? this.currentUserValue : null);
    }
}
