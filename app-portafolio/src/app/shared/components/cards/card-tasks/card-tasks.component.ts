import { Component, Input, OnInit } from '@angular/core';
import { ICoworker, IProyect, ITask } from './card-tasks.metadata';
import { ProyectService } from '@data/services/api/proyect.service';
import { range } from 'rxjs';

@Component({
  selector: 'app-card-tasks',
  templateUrl: './card-tasks.component.html',
  styleUrls: ['./card-tasks.component.css']
})
export class CardTasksComponent implements OnInit{
  @Input() task:ITask
  

  constructor(
    private proyectService: ProyectService
  ){
  }

  ngOnInit(): void {
    console.log(this.task)
    //let code = this.proyecto.coworker.find((persona:ICoworker)=>persona.license==="ADMIN")
//
    //this.proyectService.searchTasks(code!.id).subscribe(r=>{
    //  //for(let i=0; i< r.length; i++){
    //  //  this.task.push(r[i])
    //  //}
    //  this.task.push(r[0])
    //  console.log(this.task)
    //})
  }



  //searchWorkerForId(id:number){
  //  let person = this.proyecto.coworker.find((persona:ICoworker)=>persona.id===1)
  //  return person
  //}

  //agregarUser(task:ITask){
  //  let user = JSON.parse(localStorage.getItem("currentUserCatask")!).id
  //  let person = this.searchWorkerForId(user)
  //  let idProyecto = this.proyecto.id
  //  this.proyectService.addUserToTask(person!, idProyecto, this.proyecto.task).subscribe(r=>{
  //    console.log(r)
  //  })
//
  //}


  

}