import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ShopsComponent} from './shops/shops.component';
import {PreferredShopsComponent} from './preferred-shops/preferred-shops.component';
import {HelperService} from './services/helper.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        ShopsComponent,
        PreferredShopsComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
    providers: [
        HelperService,
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
