import { Component } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  login = true;
  //data = new Array();
  acountInfo: AcountInfo;
  title = 'Hệ thống quản lý chuỗi cung ứng';
  loginHandleAtParrent(event) {
  	console.log(event);
  	this.acountInfo = new AcountInfo(event.username, event.password, event.name, event.address, event.email, event.mobile);
  	//this.data = [event.username, event.password, event.name, event.address, event.email, event.mobile];  
  	this.login = false;
  }
  // constructor(private router: Router){
  //    // override the route reuse strategy
  //    this.router.routeReuseStrategy.shouldReuseRoute = function(){
  //       return false;
  //    }

  //    this.router.events.subscribe((evt) => {
  //       if (evt instanceof NavigationEnd) {
  //          // trick the Router into believing it's last link wasn't previously loaded
  //          this.router.navigated = false;
  //          // if you need to scroll back to top, here is the right place
  //          window.scrollTo(0, 0);
  //       }
  //   });

 //}

}

class AcountInfo {
	public username: string;
	public password: string;
	public name: string;
	public address: string;
	public email: string;
	public mobile: string;
	constructor(username?, password?, name?, address?, email?, mobile?) {
		this.username = username;
		this.password = password;
		this.name = name;
		this.address = address;
		this.email = email;
		this.mobile = mobile;
	}
	 
}