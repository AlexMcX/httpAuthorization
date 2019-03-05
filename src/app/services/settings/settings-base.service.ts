import { Injectable } from '@angular/core';
import {Conts} from '../../const/const';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../services/auth/authentication';
import {ObjectEx} from '../../utils/object-ex';


@Injectable({ providedIn: 'root'})
export class SettingsBaseService {

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  getBaseData() {
    const prm = new Promise((resolve, reject) => {
      this.authenticationService.currentUser.subscribe( value => {
        if (value.uuid) {
          const respData = {'uuid': value.uuid};

          console.log('settings base request:', respData);

          if (!respData) {
            reject(null);
          }

              this.http.get(Conts.Path.SERVER_PATH + 'settings/base', {
                  params: respData,
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
          }
      });
    });

    return prm;
  }

  saveBase(data: object) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    const prm = new Promise((resolve, reject) => {
      this.authenticationService.currentUser.subscribe( value => {
        if (value.uuid) {
          let respData = ObjectEx.createObject(data);
          respData['uuid'] = value.uuid;
          
          respData = JSON.stringify(respData);

          console.log('save settings base request:', respData);

          if (!respData) {
            reject(null);
          }
              this.http.post<object>(Conts.Path.SERVER_PATH + 'settings/base/save', respData, { headers: headers }).
              subscribe(ddata => console.log(ddata));
          }
      });
    });

    return prm;
  }
}
