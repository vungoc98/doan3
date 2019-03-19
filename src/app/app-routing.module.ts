import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NhaPhanPhoiComponent } from './nha-phan-phoi/nha-phan-phoi.component';
import { HeThongSanPhamComponent } from './he-thong-san-pham/he-thong-san-pham.component';

const routesConfig: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: '', component: NhaPhanPhoiComponent },
	{ path: 'taomoisanpham', component: HeThongSanPhamComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routesConfig)],
	declarations: [
		LoginComponent,
		RegisterComponent,
		NhaPhanPhoiComponent,
		HeThongSanPhamComponent
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
 