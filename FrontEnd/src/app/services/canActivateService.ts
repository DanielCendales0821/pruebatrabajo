import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { EncryptService } from './encrypt.service';
import { GeneralService } from './general.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

    constructor(
        private encryptService: EncryptService,
        private router: Router,
        private generalService: GeneralService
    ) { }

    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        if (this.encryptService.token() === '') {
            this.generalService.abrirMensaje('No tienes Permisos', 'error');
            localStorage.clear();
            this.router.navigate(['/login']);
            return false;
        } else {
            return true;
        }


    }
}
