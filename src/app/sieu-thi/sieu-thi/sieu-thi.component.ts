import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sieu-thi',
  templateUrl: './sieu-thi.component.html',
  styleUrls: ['./sieu-thi.component.css']
})
export class SieuThiComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  	// Kiem tra trang thai logout
    var username = sessionStorage.getItem('username'); 
    if (username == undefined) { 
      this.router.navigateByUrl("", {skipLocationChange: true});  
    } 
  }
  

}
