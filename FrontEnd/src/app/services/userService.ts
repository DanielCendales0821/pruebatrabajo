import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from './general.service';
import { BaseService } from './baseService';
import { EncryptService } from './encrypt.service';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {
    public url: string;
    constructor(
        public readonly http: HttpClient,
    ) {
        super(http);
        this.url = 'url';
    }


    getUsers(): any {
        return this.get('user/getUsers');
    }

    getUsersById(id): any {
        return this.getById('user/getUser/', id);
    }
    updateUser(user): any {
        return this.post('user/update', user);
    }
    deleteUser(id): any {
        return this.delete('user/deleteUser/', id);
    }

    postUser(user): any {
        return this.post('user/create', user);
    }

    login(user): any {
        return this.loginn('user/login', user);
    }

}
