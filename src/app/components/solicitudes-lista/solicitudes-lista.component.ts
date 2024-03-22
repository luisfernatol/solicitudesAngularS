import { Component ,ViewChild  } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {  Router,ActivatedRoute } from '@angular/router';
import {
  MatDialog,
 } from '@angular/material/dialog';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { DialogAddSolicitudesComponent } from '../dialog-add-solicitudes/dialog-add-solicitudes.component';
@Component({
  selector: 'app-solicitudes-lista',
  templateUrl: './solicitudes-lista.component.html',
  styleUrls: ['./solicitudes-lista.component.css']
})
export class SolicitudesListaComponent  {
  solicitud:Solicitud[];
  
  id : number;
  idEmpleado: number;

  displayedColumns: string[] = ['idSolicitud', 'idUsuario','diasSolicita'
  ,'fechaInicio', 'fechaFin','fechaRetorna','estado'
  ,'observaciones','fechaCreacion'];
  dataSource = new MatTableDataSource<Solicitud>();


  constructor(private solicitudService:SolicitudService,public dialog: MatDialog,
     private ruta: ActivatedRoute,private enrutador: Router,private route: ActivatedRoute){

    
  }
  ngOnInit(){
    this.id =this.ruta.snapshot.params['id'];
    this.idEmpleado = this.ruta.snapshot.params['idEmpleado'];


  

    


    //cargamos los usuarios
    this.obtenerSolicitudes();
  }
  private obtenerSolicitudes(){
    //consumir los datos del observador(suscribirnos)
       this.solicitudService.obtenerSolicitudesPorId(this.id).subscribe(
        (datos =>{
          
          this.solicitud = datos;
            // Asignar los datos al dataSource
      this.dataSource.data = datos;
         
        })
       );
    
      }

      dialogoNuevoSolicitud(idEmpleado: number) {
        this.dialog.open(DialogAddSolicitudesComponent,{
          data: { idEmpleado: idEmpleado, id: this.id }, // Pasamos idEmpleado como dato al componente de diálogo
          disableClose:true,
          width:"700px",
          height:"800px"



        }).afterClosed().subscribe(resultado => {
         if(resultado === "Creado"){
          this.obtenerSolicitudes();
         }

        })
      }


      @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

   
  }


 
  


}
