import { Component ,ViewChild,OnInit   } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {  Router,ActivatedRoute } from '@angular/router';
import {
  MatDialog,
 } from '@angular/material/dialog';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { DialogEditEstadoSolicitudesComponent } from 'src/app/components/dialog-edit-estado-solicitudes/dialog-edit-estado-solicitudes.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-solicitudes-lista-aprobacion',
  templateUrl: './solicitudes-lista-aprobacion.component.html',
  styleUrls: ['./solicitudes-lista-aprobacion.component.css']
})
export class SolicitudesListaAprobacionComponent implements OnInit {
  solicitud:Solicitud[];
  
  id : number;
  idEmpleado: number;

  displayedColumns: string[] = ['idSolicitud', 'idUsuario','diasSolicita'
  ,'fechaInicio', 'fechaFin','fechaRetorna','estado'
  ,'observaciones','fechaCreacion','enviadas'];
  dataSource = new MatTableDataSource<Solicitud>();
  constructor(private solicitudService:SolicitudService,public dialog: MatDialog,
    private ruta: ActivatedRoute,
    private enrutador: Router,private route: ActivatedRoute,private fb: FormBuilder){

   
 }
 ngOnInit(){
   this.id =this.ruta.snapshot.params['id'];
   this.idEmpleado = this.ruta.snapshot.params['idEmpleado'];


 

   
   //cargamos los usuarios
   this.obtenerSolicitudes();
 }
 private obtenerSolicitudes(){
  //consumir los datos del observador(suscribirnos)
     this.solicitudService.consultarSolicitudesPorCargo(this.id).subscribe(
      (datos =>{
        
        this.solicitud = datos;
          // Asignar los datos al dataSource
    this.dataSource.data = datos;
       
      })
     );
  
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

 
}
dialogoEditarEstado(dataEmpleado: Solicitud){
  this.dialog.open(DialogEditEstadoSolicitudesComponent,{
    
    disableClose:true,
    width:"700px",
    data:dataEmpleado


  }).afterClosed().subscribe(resultado => {
   if(resultado === "Editado"){
    this.obtenerSolicitudes();
   }

  })

}


}




