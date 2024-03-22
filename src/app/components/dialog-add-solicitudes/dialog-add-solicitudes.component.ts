import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';





export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD', // Formato de entrada para el campo de fecha
  },
  display: {
    dateInput: 'YYYY/MM/DD', // Formato de visualización para el campo de fecha
    monthYearLabel: 'YYYY MMMM ', // Formato de visualización para el selector de mes y año
    dateA11yLabel: 'YYYY/MM/DD', // Formato de accesibilidad para la fecha
    monthYearA11yLabel: 'YYYY MMMM ', // Formato de accesibilidad para el selector de mes y año
  },
}

@Component({
  selector: 'app-dialog-add-solicitudes',
  templateUrl: './dialog-add-solicitudes.component.html',
  styleUrls: ['./dialog-add-solicitudes.component.css'],
  providers:[{
provide:MAT_DATE_FORMATS,useValue:MY_DATE_FORMATS

  }]

})
export class DialogAddSolicitudesComponent   implements OnInit{
  formSolicitud:FormGroup;
  tituloaccion:string ="Nueva"
  BotonAccion: string = "Guardar";
  solicitudes: Solicitud = new Solicitud();
  myDateFormat: string = 'YYYY/MM/DD';
  id: number;


  constructor(
    private dialogoReferencia: MatDialogRef<DialogAddSolicitudesComponent>
    , private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _solicitudesService: SolicitudService ,   
  
  
    @Inject(MAT_DIALOG_DATA) public  data: any
    
    ){

      this.id = this.data.id;
     
  

      this.formSolicitud = this.fb.group({
        idUsuario: ['', Validators.required],
        diasSolicita: ['', Validators.required],
        fechaInicio: ['', Validators.required],
        fechaFin: ['', Validators.required],
        fechaRetorna: ['', Validators.required],
        estado: ['', Validators.required],
        observaciones: ['', Validators.required],
        fechaCreacion: ['', Validators.required]
     
      })

    

    }
    ngOnInit(): void{

     
     
      if(this.data.solicitud){
        this.formSolicitud.patchValue({
          idSolicitud: this.data.solicitud.idSolicitud,
          idUsuario: this.data.solicitud.idUsuario,
          diasSolicita: this.data.solicitud.diasSolicita,
          fechaInicio: moment(this.data.solicitud.fechaInicio,"YYYY/MM/DD").toDate(),
          fechaFin: moment(this.data.solicitud.fechaFin,"YYYY/MM/DD").toDate(),
          fechaRetorna: moment(this.data.solicitud.fechaRetorna,"YYYY/MM/DD").toDate(),
          estado: this.data.solicitud.estado,
          observaciones: this.data.solicitud.observaciones,
          fechaCreacion: moment(this.data.solicitud.fechaCreacion,"YYYY/MM/DD").toDate()
        })
       
       

      }

       
      
    
    }
    mostrarAlerta(msg: string, accion: string) {
      this._snackBar.open(msg, accion, {
        horizontalPosition: "end",
        verticalPosition: "top",
        duration: 3000
      });
    }

    obtenerFechaActual(): Date {
      const fechaActual = new Date();
      const fechaSinHora = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());
      return fechaSinHora;
    }

    addEditarEmpleado(){


      const modelo: Solicitud ={
        idUsuario: this.formSolicitud.value.idUsuario,
        diasSolicita: this.formSolicitud.value.diasSolicita,
        fechaInicio: moment(this.formSolicitud.value.fechaInicio, "YYYY/MM/DD").toDate(),
        fechaFin: moment(this.formSolicitud.value.fechaFin, "YYYY/MM/DD").toDate(),
        fechaRetorna: moment(this.formSolicitud.value.fechaRetorna, "YYYY/MM/DD").toDate(),
        estado: this.formSolicitud.value.estado,
        observaciones: this.formSolicitud.value.observaciones,
        fechaCreacion: moment(this.formSolicitud.value.fechaCreacion, "YYYY/MM/DD").toDate(),
        idSolicitud: 0
      }
      
      
        this._solicitudesService.agregarSolicitud(this.data.idEmpleado,modelo).subscribe({
         
          next: (data) => {
            this.mostrarAlerta("La Solicitud fue Creada","Listo");
            this.dialogoReferencia.close("Creado");
          },error: (e) => {
            this.mostrarAlerta("No se puede Crear","Error");
          }
        
        
        })
      
      
      
      
      
          }





}