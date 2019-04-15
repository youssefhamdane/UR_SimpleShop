import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpParams} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalVariable} from '../globals';
import 'rxjs/add/operator/map';
import "rxjs/index";
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import { HelperService } from '../services/helper.service';
@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    /**
     *  Login form group
     * @param FormGroup
     */
    loginForm: FormGroup;
    /**
     *  is submitted
     * @type {boolean}
     */
    submitted = false;
    /**
     *  submit error
     * @type {string}
     */
    submit_error = '';
    /**
     *  submit errors list
     * @type {Array}
     */
    submit_errors = [];

    /**
     *
     * @param router
     * @param http
     * @param formBuilder
     * @param helperService
     */
    constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder,private helperService: HelperService) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    /**
     * submit function
     */
    onSubmit() {
        this.submit_error='';
        this.submit_errors=[];
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.helperService.loading=true;
        this.http.post(GlobalVariable.BASE_API_URL + `/login`, {
            email:this.loginForm.get('email').value,
            password: this.loginForm.get('password').value
        })
            .subscribe(
                data => {
                    if (data && !data["error"] && !data["errors"] && data["data"]) {
                        this.helperService.setCookie('api_token',data["data"]["api_token"],30);
                        this.router.navigate(["/shops"]);
                    }
                    else if (data["message"]) {
                        this.submit_error = data['message'];
                        if(data["errors"]) for(let k in data["errors"])
                            this.submit_errors.push(k+" : "+data["errors"][k]);
                    }
                    else {
                        this.submit_error = 'Unknown Error';
                    }
                },
                error => {
                    this.helperService.loading=false;
                    if (error["error"] && error["error"]["message"]) {
                        this.submit_error = error['error']['message'];
                        if(error["error"]["errors"]) for(let k in error["error"]["errors"])
                            this.submit_errors.push(k+" : "+error["error"]["errors"][k]);
                    }
                    else {
                        this.submit_error = 'Unknown Error';
                    }
                },
            );
    }
}
