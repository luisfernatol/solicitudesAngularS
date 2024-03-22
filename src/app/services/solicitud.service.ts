import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Solicitud } from '../models/solicitud';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private urlBase = "http://localhost:8080/solicitudes-app/solicitudes";
  private baseUrl = 'http://localhost:8080/solicitudes-app/solicitudes';
  private  baseUrlS     ="http://localhost:8080/solicitudes-app/Usuario";
 

  constructor(private clienteHttp: HttpClient) { }

  obtenerSolicitudesPorId(id: number): Observable<Solicitud[]>{

    return this.clienteHttp.get<Solicitud[]>(`${this.urlBase}/${id}`);

   }
   consultarSolicitudesPorCargo(id: number): Observable<Solicitud[]>{

    return this.clienteHttp.get<Solicitud[]>( `${this.baseUrlS}/administarSolicitudes/${id}`);

   }


   

   agregarSolicitud(id: number,solicitud: Solicitud):Observable<object>{
    return this.clienteHttp.post( `${this.baseUrl}/solicitar/${id}`, solicitud);
   
  }
  cambiarEstadoSolicitud(id: number, solicitud: Solicitud): Observable<object>{
    return this.clienteHttp.put(`${this.baseUrlS}/aprovacionSolicitudes/${id}`,solicitud);
   }

    









}
