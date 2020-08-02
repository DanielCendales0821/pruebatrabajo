import { Component } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { EncryptService } from './services/encrypt.service';
import { User } from './models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Prueba Trabajo';
  public loginstatus = localStorage.getItem('loginstatus');
  public user: User;
  public validation: boolean;


  constructor(
    private permissionsService: NgxPermissionsService,
    private readonly encryptService: EncryptService,
  ) {

    this.dataUser();
  }

  public dataUser() {
    this.user = new User();
    this.user = this.encryptService.getValue();
  }


  // permisos(): void {
  //   if (this.loginstatus ===  'true') {
  //     const perm = ['ADMIN', 'LIDER', 'USUARIO', 'VISITANTE'];
  //     this.permissionsService.loadPermissions(perm);
  //     const currper = GeneralService.LOGINDATA['rol'];
  //     const permissions = [currper];
  //     this.permissionsService.loadPermissions(permissions);
  //   }
  // }

}
