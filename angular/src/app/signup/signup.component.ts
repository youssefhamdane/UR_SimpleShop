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
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    /**
     * Signup form group
     * @param FormGroup
     */
    SignUpForm: FormGroup;
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

        this.SignUpForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirm_password:['', Validators.required]
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
        if (this.SignUpForm.invalid) {
            return;
        }
        this.helperService.loading=true;
        this.http.post(GlobalVariable.BASE_API_URL + `/register`, {
            email:this.SignUpForm.get('email').value,
            password: this.SignUpForm.get('password').value,
            password_confirmation: this.SignUpForm.get('confirm_password').value
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
                    this.helperService.loading=false;
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
                });
    }
}
