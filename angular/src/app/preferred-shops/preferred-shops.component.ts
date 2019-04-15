import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalVariable} from '../globals';
import 'rxjs/add/operator/map';
import "rxjs/index";
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import {HelperService} from '../services/helper.service';
import {isNullOrUndefined} from "util";
import {ToastrService} from 'ngx-toastr';
@Component({
    templateUrl: './preferred-shops.component.html',
    styleUrls: ['./preferred-shops.component.scss']
})
export class PreferredShopsComponent implements OnInit {
    /**
     * Shops list
     * @type {Array}
     */
    Shops:any = [];

    /**
     *
     * @param router
     * @param http
     * @param helperService
     * @param toastr
     */
    constructor(private router: Router, private http: HttpClient, private helperService: HelperService, private toastr: ToastrService) {
        this.helperService.loading=true;
    }

    ngOnInit() {
            this.getShops();
    }

    /**
     * get shops function
     */
    getShops() {
        let params = new HttpParams()
            .set("api_token", GlobalVariable.API_TOKEN);

        this.http.get(GlobalVariable.BASE_API_URL + `/shops/liked`, {params: params})
            .subscribe(
                data => {
                    if (data && !data["error"])
                        this.Shops = data;
                    else this.router.navigate(["/login"]);

                },
                error => {
                    this.router.navigate(["/login"]);
                },
                () => {
                    this.helperService.loading=false;
                });
    }

    /**
     * remove shop by id
     * @param id shop id
     */
    removeShop(id) {
        let params = new HttpParams()
            .set("api_token", GlobalVariable.API_TOKEN);

        this.helperService.loading=true;

        this.http.get(GlobalVariable.BASE_API_URL + `/shops/remove/` + id, {params: params})
            .subscribe(
                data => {
                    if (data && !data["error"]) {
                        this.Shops = data;
                        this.toastr.success('Shop removed from preferred shops!','Status');
                    }
                    else this.router.navigate(["/login"]);

                },
                error => {
                    this.router.navigate(["/login"]);
                },
                () => {
                    this.helperService.loading=false;
                });
    }
}
