import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-ncc-thong-tin-don-hang',
  templateUrl: './ncc-thong-tin-don-hang.component.html',
  styleUrls: ['./ncc-thong-tin-don-hang.component.css']
})
export class NccThongTinDonHangComponent implements OnInit {

  id: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.paramMap.subscribe((params: ParamMap) => {
  		this.id = params.get('id');
  	});
  }

}
