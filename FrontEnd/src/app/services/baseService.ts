import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Environment } from 'src/environment/environments';
import { EncryptService } from './encrypt.service';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class BaseService extends EncryptService {
    public header: any;
    public path: string;
    constructor(
        public readonly http: HttpClient,
    ) {
        super();
        this.path = Environment.BaseURL;
        this.initializeHeader();
    }

    public initializeHeader() {
        return this.header = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-token': this.token()
        });
    }



    get(url): any {
        return this.http.get(this.path + url, { headers: this.initializeHeader() });
    }

    getById(url, id): any {
        return this.http.get(this.path + url + id, { headers: this.initializeHeader() });
    }


    post(url, data) {
        const params = data;
        return this.http.post(this.path + url, params, { headers: this.initializeHeader() });
    }

    update(url, id, data): any {
        const params = (data);
        return this.http.put(this.path + url + id, params, { headers: this.initializeHeader() });
    }

    delete(url, id) {
        return this.http.delete(this.path + url + id, { headers: this.initializeHeader() });
    }

    loginn(url, data) {
        const params = data;
        return this.http.post(this.path + url, params, { headers: new HttpHeaders({'Content-Type': 'application/json', 'x-token': ''})
        });
    }


}
