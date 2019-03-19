import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-thong-ke-kho-hang',
  templateUrl: './thong-ke-kho-hang.component.html',
  styleUrls: ['./thong-ke-kho-hang.component.css']
})
export class ThongKeKhoHangComponent implements OnInit {
  
  id:string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.paramMap.subscribe((params: ParamMap) => {
  		this.id = params.get('id');
  	})
  }

}
