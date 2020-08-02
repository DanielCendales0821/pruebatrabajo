import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-eliminar-usuarios',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.scss']
})
export class EliminarUsuarioComponent implements OnInit {
  public isUser: any;
  constructor(
    private generalService: GeneralService,
    private router: Router,
    private route: ActivatedRoute,
    private readonly userService: UserService,
  ) { }


  ngOnInit() {
    this.route.params.subscribe(params => this.isUser = params['id']);
  }
  eliminar() {
    this.generalService.abrirConfirmacion().subscribe(
      response => {
        this.generalService.abrirSpinner();
        this.userService.deleteUser(this.isUser).subscribe(
          res => {
            this.generalService.abrirMensaje('Se ha eliminado correctamente', 'success');
            this.router.navigate(['/usuario']);
            this.generalService.cerrarSpinner();
          },
          error => {
            this.generalService.cerrarSpinner();
            this.generalService.abrirMensaje('Verificar información', 'error');
          }
        );
      }, err => {
        this.generalService.abrirMensaje('Verificar información', 'error');
        this.generalService.cerrarSpinner();
      });
  }
}

