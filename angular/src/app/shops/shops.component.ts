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
    templateUrl: './shops.component.html',
    styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {
    /**
     * Shops lisr
     * @type {Array}
     */
    Shops:any = [];
    /**
     * User geolocation position
     */
    GeoPosition;

    /**
     *
     * @param router
     * @param http
     * @param helperService
     * @param toastr
     */
    constructor(private router: Router, private http: HttpClient, private helperService: HelperService, private toastr: ToastrService) {
        // Enable Loading spinner
        this.helperService.loading=true;
    }

    ngOnInit() {
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.GeoPosition=position;
                    this.getShops()
                },
                error => {
                    this.getShops();
                }
            );
        }
        ;
    }

    /**
     * get shops function
     */
    getShops() {
        let params = new HttpParams()
            .set("api_token", GlobalVariable.API_TOKEN);
        if (!isNullOrUndefined(this.GeoPosition)) {
            params = params.set("latitude", this.GeoPosition.coords.latitude)
                .set("longitude", this.GeoPosition.coords.longitude);
        }
        this.http.get(GlobalVariable.BASE_API_URL + `/shops`, {params: params})
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
     * submit like to shop by id
     * @param id shop id
     */
    likeShop(id) {
        let params = new HttpParams()
            .set("api_token", GlobalVariable.API_TOKEN);
        if (!isNullOrUndefined(this.GeoPosition)) {
            params = params.set("latitude", this.GeoPosition.coords.latitude)
                .set("longitude", this.GeoPosition.coords.longitude);
        }
        this.helperService.loading=true;
        this.http.get(GlobalVariable.BASE_API_URL + `/shops/like/` + id, {params: params})
            .subscribe(
                data => {
                    if (data && !data["error"]) {
                        this.Shops = data;
                        this.toastr.success('Added to preferred shops!','Status');
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
    /**
     * submit dislike to shop by id
     * @param id shop id
     */
    dislikeShop(id) {
        let params = new HttpParams()
            .set("api_token", GlobalVariable.API_TOKEN);
        if (!isNullOrUndefined(this.GeoPosition)) {
            params = params.set("latitude", this.GeoPosition.coords.latitude)
                .set("longitude", this.GeoPosition.coords.longitude);
        }
        this.helperService.loading=true;
        this.http.get(GlobalVariable.BASE_API_URL + `/shops/dislike/` + id, {params: params})
            .subscribe(
                data => {
                    if (data && !data["error"]) {
                        this.Shops = data;
                        this.toastr.success('Shop hidden for 2 hours!', 'Status');
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
