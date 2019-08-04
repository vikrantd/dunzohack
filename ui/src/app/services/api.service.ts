import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppConfig } from '../config/app.config';
import { AlertService } from './alert.service';


@Injectable()
export class ApiService {
    
  constructor(
    private http: Http, 
    private config: AppConfig,
    private router: Router,
    private alertService: AlertService
  ) { }

  serviceBase(){
    return this.config.serviceBase();
  }

  get(endPoint: string, requiresToken:boolean, data?:any){
      //build up param string.
      let params = new URLSearchParams();
      for(let key in data) {
        params.set(key, data[key]);
      }
      // let options = this.jwt(requiresToken)
      //Add search to httpOptions returned from jwt.
      // options.search = params;
      return this.http.get(this.serviceBase() + endPoint)
      .map((response: Response) => { 
        return response.json()
      }).catch((error: any)=>{
        this.checkErrors(error);
        return Observable.throw(new Error(JSON.parse(error._body).message))
      });
  }

  post(endPoint: string, data: string, requiresToken:boolean) {
      return this.http.post(this.serviceBase() + endPoint, data, this.jwt(requiresToken))
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any)=>{
        this.checkErrors(error);
        return Observable.throw(new Error(JSON.parse(error._body).message))
      }); 
  }

  put(endPoint: string, data: string, requiresToken:boolean){
      return this.http.put(this.serviceBase() + endPoint, data, this.jwt(requiresToken))
      .map((response: Response) => response.json())
      .catch((error: any)=>{
        this.checkErrors(error);
        return Observable.throw(new Error(JSON.parse(error._body).message))
      });
  }

  delete(endPoint: string, requiresToken:boolean){
      return this.http.delete(this.serviceBase() + endPoint, this.jwt(requiresToken))
      .map((response: Response) => response.json())
      .catch((error: any)=>{
        this.checkErrors(error);
        return Observable.throw(new Error(JSON.parse(error._body).message))
      });
  }

  private jwt(requiresToken) {
    //create auth header with jwt token.
    // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // let currentUserToken = JSON.parse(localStorage.getItem('currentUserToken'));
    // if (currentUser && currentUserToken && requiresToken) {
    //   let headers = new Headers({ 'ShoppinToken': currentUserToken, 'Content-Type':'application/json', 'SHOPPIN-XSRF-TOKEN': this.getXSRFToken() });
    //   return new RequestOptions({ headers: headers,  withCredentials : true  });
    // }
    // else{
      let headers = new Headers({ 'Content-Type': 'application/json'});
      return new RequestOptions({ headers: headers , withCredentials : false });
    // }
  }

  getXSRFToken() {
    var cname = "SHOPPIN-XSRF-TOKEN";
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  } 

  // To check for errors when status is other than 200 | 400 and 401 would mean no permission so logout else show errors
  checkErrors(error){
    if(error.status == 401 || error.status == 400){
      this.router.navigate(['/login']);
    }
    else if(error.status == 0){
      this.alertService.error("Network Error");
    }
    else{
      this.alertService.error(JSON.parse(error._body).message);
    }
  }

  checkXHRError(error){
    this.alertService.error(JSON.parse(error.response).message);
  }

}