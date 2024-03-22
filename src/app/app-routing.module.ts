import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoListaComponent } from './components/empleado-lista/empleado-lista.component';
import { UsarioListaComponent } from './components/usario-lista/usario-lista.component';
import { SolicitudesListaComponent } from './components/solicitudes-lista/solicitudes-lista.component';
import { SolicitudesListaAprobacionComponent } from './components/solicitudes-lista-aprobacion/solicitudes-lista-aprobacion.component';


//http://localhost:4200/
const routes: Routes = [
  {path:'empleados',component: EmpleadoListaComponent},
  {path:'',redirectTo: 'empleados', pathMatch: 'full'},
  {path:'usuarios-lista',component: UsarioListaComponent},
  { path: 'solicitud-lista/:id/:idEmpleado', component: SolicitudesListaComponent },
  { path: 'solicitud-lista-aprobacion/:id/:idEmpleado', component: SolicitudesListaAprobacionComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
