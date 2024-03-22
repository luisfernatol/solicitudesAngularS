import { Component ,ViewChild,AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {  Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import {
  MatDialog,
 
} from '@angular/material/dialog';


@Component({
  selector: 'app-usario-lista',
  templateUrl: './usario-lista.component.html',
  styleUrls: ['./usario-lista.component.css']
})
export class UsarioListaComponent implements AfterViewInit {
  usuario:Usuario[];
  

  displayedColumns: string[] = ['idUsuario', 'idEmpleado','correo'
  ,'rol', 'Acciones','enviadas'];
  dataSource = new MatTableDataSource<Usuario>();

  constructor(private usuarioServicio:UsuarioService,public dialog: MatDialog, private enrutador: Router){

  


  }



  ngOnInit(){
    //cargamos los usuarios
    this.obtenerUsuarios();
  }

  verSolicitudes(id: number,idEmpleado: number){
    
    this.enrutador.navigate(['solicitud-lista', id, idEmpleado]);

    }

    verAprobacionSolicitudes(id: number,idEmpleado: number){
     
      this.enrutador.navigate(['solicitud-lista-aprobacion', id, idEmpleado]);
  
      }





  private obtenerUsuarios(){
    //consumir los datos del observador(suscribirnos)
       this.usuarioServicio.obtenerUsuarioLista().subscribe(
        (datos =>{
          
          this.usuario = datos;
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

}
