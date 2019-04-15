import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ShopsComponent } from './shops/shops.component';
import { PreferredShopsComponent } from './preferred-shops/preferred-shops.component';
import {AppComponent} from "./app.component";
const routes: Routes = [
  {path: '', component: AppComponent},
  { path: 'login',component: LoginComponent},
  { path: 'signup',component: SignupComponent},
  { path: 'shops',component: ShopsComponent},
  { path: 'preferred-shops',component: PreferredShopsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
