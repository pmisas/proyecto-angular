import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ProyectService } from '@data/services/api/proyect.service';
import { ICoworker, ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata';
import { HideModalService } from '@shared/services/hide/hide-modal.service';
import { RefreshService } from '@shared/services/refresh/refresh.service';
import { WorkersService } from '@shared/services/workers/workers.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent {
  public show = false
  workers:Array<ICoworker>
  @Input() task:ITask
  
  editForm!: FormGroup
  @Output() enviar: EventEmitter<void> = new EventEmitter<void>();
  user:Array<ICoworker> =[]
  id:number
  my: any

  msgError: string

constructor(
  private formBuilder:FormBuilder,
  private proyectService : ProyectService,
  private refreshService: RefreshService,
  private workersService: WorkersService,
  private hideModalService:HideModalService
  ){
    
  }



  ngOnInit(){

  this.user = this.task.users

  this.workersService.workers$.subscribe(m=>{
    this.workers=m
  })

  

  //validations 
  this.editForm = this.formBuilder.group ({
    //id_P: [this.workers.find((u:ICoworker)=>u.is_Admin===true)!.id],
    name: [ `${this.task.name}`, [Validators.required, Validators.minLength(5) ,Validators.maxLength(49)]],
    description: [ `${this.task.description}`, [Validators.required, Validators.minLength(5) ,Validators.maxLength(70)]],
    date: [`${this.task.date}`],
    chek: [this.task.check],
    users:[``]
  })
}


recibirMensaje(user:ICoworker){
  
  if (this.task.users.find((u:ICoworker)=>user.id===u.id)){
    this.task.users.forEach((element, index)=>{
      if(element.id === user.id){
        delete this.task.users[index];
        this.task.users.splice(index,1) //borrar este si falla
      }
   })
   //this.task.users.pop()
   
  }else{
    this.task.users.push(user)
  }
  //console.log(this.task.users)
}


onSingup(formfield: string){
  if(this.editForm.valid){

    return
  }else {
    this.validateAllFormFields(this.editForm, formfield)
  } 
}
 
validateAllFormFields(formGroup: FormGroup, formfield: string){
  Object.keys(formGroup.controls).forEach(field =>{
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      this.editForm.controls[formfield].markAsDirty({onlySelf: true});
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control, formfield)
    }
  })
}

autenticate() {
  this.editForm.markAllAsTouched()
  if(this.editForm.valid){
    this.editForm.controls['users'].setValue(this.task.users)

    //si mientras que hago los ajustes se une una persona mas o se va 
    //TODO
    //

    this.proyectService.editTask(this.task.id, this.editForm.value).subscribe(r=>{
      if(r.error){
        this.msgError=r.message
      }else{
        this.hideModalService.hide.emit()
        this.refreshService.refresh.emit()
        this.ngOnInit()
      }
    })
   
    }else {
    }
  }

  showModal(){
    this.show = true
    this.hideModalService.hide.emit()
  }

  hideModal(){
    this.show = false
    this.refreshService.refresh.emit()
    this.hideModalService.hide.emit()
    this.ngOnInit()
  }

  isSelected(worker:ICoworker):boolean{
    if(this.task.users.find((person:ICoworker)=>person.id===worker.id)){
      return true
    }else{
      return false
    }

  }

}
