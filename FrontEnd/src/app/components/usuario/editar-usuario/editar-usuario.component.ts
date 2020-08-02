import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  public formGroupUser: FormGroup;
  public idUser: any;
  public user: any;

  constructor(
    private readonly generalService: GeneralService,
    private formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    this.user = new Object();
  }



  ngOnInit() {
    this.generalService.abrirSpinner();
    this.route.params.subscribe(params => this.idUser = params['id']);
    this.formGroupUser = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      document: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
    this.getUserById();
  }

  public async getUserById() {
    this.userService.getUsersById(this.idUser).subscribe(
      res => {
        this.user = res.user;
        console.log(this.user);
        this.generalService.cerrarSpinner();
      }, err => { this.generalService.cerrarSpinner(); });
  }

  captureInformation() {
    if (this.formGroupUser.value.password === this.formGroupUser.value.confirmpassword) {
      const data = {
        name: this.formGroupUser.value.name,
        lastName: this.formGroupUser.value.lastName,
        document: this.formGroupUser.value.document,
        email: this.formGroupUser.value.email,
        nickname: this.formGroupUser.value.nickname,
        password: this.formGroupUser.value.password
      };
      this.updateUser(data);
    } else {
      this.generalService.abrirMensaje('Las contraseñas no coinciden', 'error');
    }
  }

  updateUser(data) {
    this.generalService.abrirSpinner();
    this.userService.updateUser(data).subscribe(
      res => {
        console.log(res);
        if (res.ok) {
          this.router.navigate(['/usuario']);
          this.generalService.abrirMensaje('Agregado Correctamente', 'success');
        } else {
          this.generalService.abrirMensaje('Ocurrio un Error', 'error');
        }
        this.generalService.cerrarSpinner();
      }, err => {
        this.generalService.abrirMensaje('Ocurrio un Error', 'error');
        this.generalService.cerrarSpinner();
      });

  }
}

