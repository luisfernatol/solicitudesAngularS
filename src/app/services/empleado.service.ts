import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Empleado } from '../models/empleado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlBase = "http://localhost:8080/solicitudes-app/empleados";

  constructor(private clienteHttp: HttpClient) { }

  obtenerEmpleadosLista(): Observable<Empleado[]>{
    return this.clienteHttp.get<Empleado[]>(this.urlBase);

}

agregarEmpleado(empleado: Empleado):Observable<object>{
  return this.clienteHttp.post(this.urlBase, empleado);
}



editarEmpleado(id: number, empleado: Empleado): Observable<object>{
  return this.clienteHttp.put(`${this.urlBase}/${id}`,empleado);
 }


}
