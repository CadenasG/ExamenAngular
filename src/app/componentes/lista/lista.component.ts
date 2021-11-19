import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { UsuarioForm } from 'src/app/models/usuarioForm';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = []
  usuFormulario: UsuarioForm[] = []
  menuItems: MenuItem[] = []
  display: boolean = false
  formulario: FormGroup = new FormGroup({})

  valNombre: boolean = false
  valEdad: boolean = false
  valProfesion: boolean = false
  valSexo: boolean = false
 

  constructor(private servicio: UsuarioService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.servicio.getAll().subscribe(
      (result : any) =>{
        this.usuarios = result
      },
      error => {
        console.log(error)
      }
    )

    this.menuItems =[{
      label: 'Nuevo',
      icon: 'pi pi-fw pi-plus',
      command: () => this.mostrarModal()
    }] 

    this.formulario = this.fb.group({
      nombre:["",[Validators.required,Validators.pattern("[a-zA-Z ]{2,60}")]],
      edad:["",[Validators.required,Validators.pattern("\\d{1,2}")]],
      profesion:["",[Validators.pattern("[a-zA-Z ]{2,60}")]],
      sexo:["",[Validators.required]],
    })
  }

  mostrarModal(){
    this.formulario = this.fb.group({
      nombre:["",[Validators.required,Validators.pattern("[a-zA-Z ]{3,60}")]],
      edad:["",[Validators.required,Validators.pattern("\\d{1,3}")]],
      profesion:["",[Validators.pattern("[a-zA-Z ]{3,60}")]],
      sexo:["",[Validators.required]],
    })
    this.display = true
  }

  validarNombre(){
    if(this.formulario.controls['nombre'].hasError('required') || this.formulario.controls['nombre'].hasError('pattern')){
      this.valNombre = true
    }else{
      this.valNombre = false
    }
  }

  validarEdad(){
    if(this.formulario.controls['edad'].hasError('required') || this.formulario.controls['edad'].hasError('pattern')){
      this.valEdad = true
    }else{
      this.valEdad = false
    }
  }

  validarProfesion(){
    if(this.formulario.controls['profesion'].hasError('pattern')){
      this.valProfesion = true
    }else{
      this.valProfesion = false
    }
  }

  validarSexo(){
    if(this.formulario.controls['sexo'].hasError('required')){
      this.valSexo = true
    }else{
      this.valSexo = false
    }
  }

  guardar(){
    if(this.formulario.invalid){
      this.validarNombre()
      this.validarEdad()
      this.validarProfesion()
      this.validarSexo()
    }else{
      
      let id: number = this.usuFormulario.length
      let nombre:string = this.formulario.get('nombre')?.value as string
      let edad: number = this.formulario.get('edad')?.value as number
      let profesion:string = this.formulario.get('profesion')?.value as string
      let sexo:string = this.formulario.get('sexo')?.value as string

      this.usuFormulario.push(new UsuarioForm(id,nombre,edad,profesion,sexo));
      this.display = false
    }
  }
}


