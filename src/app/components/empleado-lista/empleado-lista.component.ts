
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { DatePipe } from '@angular/common';
import {
  MatDialog
} from '@angular/material/dialog';
import { DialogAddEditComponent } from '../dialog-add-edit/dialog-add-edit.component';



@Component({
  selector: 'app-empleado-lista',
  templateUrl: './empleado-lista.component.html',
  styleUrls: ['./empleado-lista.component.css'],
  providers: [DatePipe]

})
export class EmpleadoListaComponent implements AfterViewInit  {
  empleado:Empleado[];
  empleadosId: Empleado[] = [];;


  displayedColumns: string[] = ['idEmpleado', 'Nombre','Apellido'
  ,'NCargo', 'tipoDocumento', 'Documento', 'estadoempleado'
  , 'tipocontrato', 'idsupervisor', 'fechaIngreso', 'fechaRetiro'
  , 'Telefono', 'direccion', 'Acciones'];
  dataSource = new MatTableDataSource<Empleado>();


  constructor(private empleadoServicio:EmpleadoService,public dialog: MatDialog){

    this.empleadoServicio.obtenerEmpleadosLista().subscribe({
      next: (data) => { 
        this.empleadosId=data;
        
      },error: (e) => {}

     });


  }

  ngOnInit(){
    //cargamos los empleado
    this.obtenerEmpleados();
  
  }

  private obtenerEmpleados(){
    //consumir los datos del observador(suscribirnos)
       this.empleadoServicio.obtenerEmpleadosLista().subscribe(
        (datos =>{
          
          this.empleado = datos;
            // Asignar los datos al dataSource
      this.dataSource.data = datos;
        
        })
       );
    
      }
      dialogoNuevoEmpleado() {
        this.dialog.open(DialogAddEditComponent,{
          disableClose:true,
          width:"700px"


        }).afterClosed().subscribe(resultado => {
         if(resultado === "Creado"){
          this.obtenerEmpleados();
         }

        })
      }

      dialogoEditarEmpleado(dataEmpleado: Empleado){
        this.dialog.open(DialogAddEditComponent,{
          disableClose:true,
          width:"700px",
          data:dataEmpleado


        }).afterClosed().subscribe(resultado => {
         if(resultado === "Editado"){
          this.obtenerEmpleados();
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



