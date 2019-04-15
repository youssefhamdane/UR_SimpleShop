import {Injectable} from "@angular/core";
import {GlobalVariable} from '../globals';
@Injectable()
export class HelperService {
    /**
     * loading spinner
     * @type {boolean}
     */
    loading = false;

    constructor() {
    }

    /**
     *
     * get cookie by name
     *
     * @param name
     */
    getCookie(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length == 2)
            GlobalVariable.API_TOKEN = parts.pop().split(";").shift();
    }

    /**
     *  set cookie
     * @param name
     * @param value
     * @param days
     */
    setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
        GlobalVariable.API_TOKEN = value;
    }

    /**
     * set api url if empty
     */
    setApiUrl(){
        if(GlobalVariable.BASE_API_URL=='' || GlobalVariable.BASE_API_URL==null){
            GlobalVariable.BASE_API_URL=location.origin+"/api";
        }
    }
}