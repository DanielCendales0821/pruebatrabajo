import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent implements OnInit {
  public formGroupUser: FormGroup;

  constructor(
    private readonly generalService: GeneralService,
    private formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService
  ) { }



  ngOnInit() {
    this.formGroupUser = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      document: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required,
      Validators.email]
      ],
      nickname: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
  }



  captureInformation() {
    if (this.formGroupUser.value.password === this.formGroupUser.value.confirmpassword) {
      const data = {
        name: this.formGroupUser.value.name,
        lastName: this.formGroupUser.value.lastName,
        document: this.formGroupUser.value.document,
        role: this.formGroupUser.value.role,
        email: this.formGroupUser.value.email,
        nickname: this.formGroupUser.value.nickname,
        password: this.formGroupUser.value.password
      };
      this.agregar(data);
    } else {
      this.generalService.abrirMensaje('Las contraseñas no coinciden', 'error');
    }
  }

  agregar(data) {
    this.userService.postUser(data).subscribe(
      res => {
        if (res.ok) {
          this.generalService.abrirMensaje('Agregado Correctamente', 'success');
          this.router.navigate(['/usuario']);
        } else {
          this.generalService.abrirMensaje('el correo asociado ya existe', 'error');
        }

      }, err => {
        this.generalService.abrirMensaje('Ocurrio un Error', 'error');
      });

  }
}
