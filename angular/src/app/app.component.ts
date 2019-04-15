import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalVariable} from './globals';
import 'rxjs/add/operator/map';
import "rxjs/index";
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import {HelperService} from './services/helper.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    /**
     *
     * @param router
     * @param http
     * @param helperService
     */
    constructor(private router: Router, private http: HttpClient, public helperService: HelperService) {
        // Enable Loading spinner
        this.helperService.loading = true;
    }

    ngOnInit() {
        // set api url
        this.helperService.setApiUrl();
        // get token from cookies if exist
        this.helperService.getCookie('api_token');

        // check token is valid
        this.http.get(GlobalVariable.BASE_API_URL + `/islogged`, {params: new HttpParams().set("api_token", GlobalVariable.API_TOKEN)})
            .subscribe(
                data => {
                    if (data && !data["error"]) {
                        if (this.router.url != '/login' && this.router.url != '/signup' && this.router.url != '/')
                            this.router.navigate([this.router.url]);
                        else this.router.navigate(["/shops"]);
                    }
                    else this.router.navigate(["/login"]);

                },
                error => {
                    this.router.navigate(["/login"]);
                },
                () => {
                    this.helperService.loading = false;
                });
    }
}
