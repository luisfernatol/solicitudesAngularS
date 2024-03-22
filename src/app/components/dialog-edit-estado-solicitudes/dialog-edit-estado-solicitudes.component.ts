import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Solicitud } from 'src/app/models/solicitud';

@Component({
  selector: 'app-dialog-edit-estado-solicitudes',
  templateUrl: './dialog-edit-estado-solicitudes.component.html',
  styleUrls: ['./dialog-edit-estado-solicitudes.component.css']
})
export class DialogEditEstadoSolicitudesComponent implements OnInit {
  formEstado: FormGroup;
  tituloaccion:string ="Aprobacion de la Solicitud"
  BotonAccion: string = "Guardar";

  constructor(
    private dialogoReferencia: MatDialogRef<DialogEditEstadoSolicitudesComponent>
    , private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _solicitudService: SolicitudService ,   
   
    @Inject(MAT_DIALOG_DATA) public data:Solicitud
    
    ){
      this.formEstado = this.fb.group({
        estado: [data.estado] // Establece el estado actual como valor inicial
      });


    }
    ngOnInit(): void{

   
    }
    mostrarAlerta(msg: string, accion: string) {
      this._snackBar.open(msg, accion, {
        horizontalPosition: "end",
        verticalPosition: "top",
        duration: 3000
      });
    }

    addEditarEmpleado(){

      const nuevoEstado = this.formEstado.value.estado;
      const modelo: Solicitud = {
        idSolicitud: this.data.idSolicitud,
        idUsuario: this.data.idUsuario,
        diasSolicita: this.data.diasSolicita,
        fechaInicio: this.data.fechaInicio,
        fechaFin: this.data.fechaFin,
        fechaRetorna: this.data.fechaRetorna,
        estado: nuevoEstado, // Nuevo estado obtenido del formulario
        observaciones: this.data.observaciones,
        fechaCreacion: this.data.fechaCreacion
      };


     
      this._solicitudService.cambiarEstadoSolicitud(this.data.idSolicitud,modelo).subscribe({
         
        next: (data) => {
          this.mostrarAlerta("Estado fue editado","Listo");
          this.dialogoReferencia.close("Editado");
        },error: (e) => {
          this.mostrarAlerta("No se puede Editar","Error");
        }
      
      
      })


     
        
      }


}
