import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component"
import { LoginComponent } from "./login/login.component"
import { SignupComponent } from "./signup/signup.component"
import { CustomerProfileComponent } from "./customer-profile/customer-profile.component"
import { ShopadminProfileComponent } from "./shopadmin-profile/shopadmin-profile.component"
import { SuperadminProfileComponent } from "./superadmin-profile/superadmin-profile.component"
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'customer', component: CustomerProfileComponent,canActivate:[AuthGuard]},
  { path: 'shopadmin', component: ShopadminProfileComponent,canActivate:[AuthGuard]},
  { path: 'superadmin', component: SuperadminProfileComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
