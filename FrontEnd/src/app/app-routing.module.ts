import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario/usuario.component';
import { AgregarUsuarioComponent } from './components/usuario/agregar-usuario/agregar-usuario.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EliminarUsuarioComponent } from './components/usuario/eliminar-usuario/eliminar-usuario.component';
import { EditarUsuarioComponent } from './components/usuario/editar-usuario/editar-usuario.component';
import { CanActivateViaAuthGuard } from './services/canActivateService';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: '', component: LoginComponent },
  { path: 'usuario', component: UsuarioComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'usuario/agregar', component: AgregarUsuarioComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'usuario/eliminar/:id', component: EliminarUsuarioComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'usuario/editar/:id', component: EditarUsuarioComponent, canActivate: [CanActivateViaAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
