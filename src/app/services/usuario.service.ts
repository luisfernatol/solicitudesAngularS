import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBase = "http://localhost:8080/solicitudes-app/usuarios";

  constructor(private clienteHttp: HttpClient) { }

  obtenerUsuarioLista(): Observable<Usuario[]>{
    return this.clienteHttp.get<Usuario[]>(this.urlBase);

}






}
