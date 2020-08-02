import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import { GeneralService } from 'src/app/services/general.service';
import { EncryptService } from 'src/app/services/encrypt.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  public users: any = [];
  public user: any = [];
  public idUser: number;
  public exportararchivo: any = [];
  constructor(
    private readonly userService: UserService,
    private readonly generalService: GeneralService,
    private readonly encryptService: EncryptService) {
    this.idUser = 0;
    this.user = this.encryptService.getValue().user;
  }


  ngOnInit() {
    this.generalService.abrirSpinner();
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      res => {
        this.users = res.users;
        this.generalService.cerrarSpinner();
      }, err => {
        this.generalService.abrirMensaje('Ocurrio un Error', 'error');
        this.generalService.cerrarSpinner();
      });
  }

  leftClick(id) {
    this.idUser = id;
  }


  exportar() {
    this.users.forEach(element => {
      const data = {
        'Documento': element.document,
        'Email': element.email,
        'LastName': element.lastName,
        'Name': element.name,
        'role': element.role,
      };
      this.exportararchivo.push(data);
    });
    this.generalService.exportAsExcelFile(this.exportararchivo, 'Usuarios');
  }

}
