import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AcountInfoService {
  information: Login;
  info: Login;
  randomNumber: number;
  // mang thong tin: 
  array = new Array();
  array1 = new Array();
  constructor(private http: Http) { 
    this.randomNumber = Math.floor(Math.random() * 255);
  }

  setInfomation(info: Login) {
  	this.information = info;
    sessionStorage.setItem('username', this.information.username);
  }

  async getInfomation(){
    if (this.information == undefined) {
      // tao duong dan can post len
      const url = "http://localhost:3000/getAcountInfo";

      // tao header
      const headers = new Headers({ 'Content-Type': 'application/json' });

      // lay body gui len
      const body = JSON.stringify({ 'username': sessionStorage.getItem('username') });

      // res la ket qua tra ve tu server
      await this.http.post(url, body, {headers: headers})
      .toPromise()
      .then(res => res.json())
      .then(resJson => {
        this.info = new Login(resJson.check, resJson.username, resJson.password, resJson.name, resJson.address, resJson.email, resJson.mobile, resJson.count_type);
        this.setInfomation(this.info);
      })
      return this.info;
    }
    else {
      return this.information;
    }
   // return this.information;
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }
}
class Login { 
  public check;
  public username;
  public password;
  public name;
  public address;
  public email;
  public mobile;
  public acount_type;
  constructor(check?, username?, password?, name?, address?, email?, mobile?, acount_type?) { 
    this.check = check;
    this.username = username;
    this.password = password;
    this.name = name;
    this.address = address;
    this.email = email;
    this.mobile = mobile;
    this.acount_type = acount_type;
  }
}