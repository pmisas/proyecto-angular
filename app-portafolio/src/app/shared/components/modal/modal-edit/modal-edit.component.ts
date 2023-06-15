import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ProyectService } from '@data/services/api/proyect.service';
import { ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent {
  public show = false
  @Input() task:ITask
  registerForm!: FormGroup
  @Output() enviar: EventEmitter<void> = new EventEmitter<void>();




  msgError: string

constructor(
  private formBuilder:FormBuilder,
  ){}



ngOnInit(): void {
  //validations 
  this.registerForm = this.formBuilder.group ({
    firstName: [ `${this.task.name}`, [Validators.required, Validators.minLength(5) ,Validators.maxLength(49)]],
    description: [ `${this.task.description}`, [Validators.required, Validators.minLength(5) ,Validators.maxLength(60)]],
    date: [``] ,
  })
}


onSingup(formfield: string){
  if(this.registerForm.valid){

    return
  }else {
    this.validateAllFormFields(this.registerForm, formfield)
  } 
}
 
validateAllFormFields(formGroup: FormGroup, formfield: string){
  Object.keys(formGroup.controls).forEach(field =>{
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      this.registerForm.controls[formfield].markAsDirty({onlySelf: true});
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control, formfield)
    }
  })
}

autenticate() {
  this.registerForm.markAllAsTouched()
  if(this.registerForm.valid){
    console.log('edit')
    this.hideModal()
    }else {
    this.msgError= "*Formulario invalido. llene los espacios que se piden"
    }
  }


  showModal(){
    this.show = true
  }

  hideModal(){
    this.show = false
    this.enviar.emit()
  }

}
