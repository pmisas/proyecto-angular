import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { IresponseValidation } from '../iresponse-validation.metadata';
import { API_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { ICoworker, IProyect, ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata';
import { identifierName } from '@angular/compiler';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

    traerProyecto(id:any):Observable<any>{
      const response= {error:true, message:'No tienes proyecto', data:null}
      return this.http.get<{error:boolean, message:string, data: any}>(API_ROUTES.DATA_PROYECTS.PROYECTS + '/' + id)
      .pipe(
        map( r => {
          response.error=r.error
          response.data=r.data
          response.message=r.message
          if(response.error==false){
            return response
          }else{
            return null
          }
          
        }),
        catchError( e =>{
          response.message='Hubo un probelma'
          return of (response);
        }),
      )
    }

    //addUserToTask(worker:ICoworker, idProyecto:number,task:any):Observable<any>{
    //  return this.http.get<ITask>(API_ROUTES.DATA_PROYECTS.PROYECTS + '?task=' + task + '?id=' + idProyecto)
    //}

    //addUserToTask(idUser:number, idProyecto:number,idTask:number):Observable<Array<IProyect>>{
    //  this.http.get<Array<IProyect>>(API_ROUTES.DATA_PROYECTS.PROYECTS + '?id=' + idProyecto)
    //  .pipe(
    //    switchMap((r:any)=>{
    //      let task = r[0].task
    //      console.log( r)
    //      
    //      
    //      return r
    //    })
    //  )
    //  // TODO TERMINAR EL SERVICIO
    //}

    searchTasks(id:number):Observable<IresponseValidation>{
      const response= {error:true, message:'No tienes proyecto', data:null}
      return this.http.get<IresponseValidation>(API_ROUTES.DATA_TASK.TASKS + '/' + id)
      .pipe(
        map(r=>{
          response.data=r.data
          response.error=r.error
          response.message=r.message
          return response
        }),
        catchError( e =>{
          response.message='Hubo un probelma'
          return of (response);
        }),
      )
    }

    addProyect(id:number):Observable<IresponseValidation>{
      const response= {error:true, message:'No tienes proyecto', data:null}
      const newData={
        name: "proyect",
        id_Admin: id,
        description: "new proyect"
      }
      return this.http.post<{error:boolean, message:string, data:any}>(API_ROUTES.DATA_PROYECTS.PROYECTS, newData)
      .pipe(
        map(r=>{
          response.data=r.data
          response.error=r.error
          response.message=r.message
          return response
        }),
        catchError( e =>{
          response.message='Hubo un probelma'
          return of (response);
        }),
      )
    }

    addTask(data:any):Observable<any>{
      const response = { error:true, message:'falla cambiando los datos', data:null}
      return this.http.post(API_ROUTES.DATA_TASK.TASKS, data)
      .pipe(
        map(r=>{
          return r
        }),
        catchError( e =>{
          response.message='Hubo un probelma'
          return of (response);
        }),
      )
    }

    deleteTask(task:ITask):Observable<IresponseValidation>{
      const response = { error:true, message:'falla cambiando los datos', data:null}
      return this.http.delete<{error:boolean, message:string, data: any}>(API_ROUTES.DATA_TASK.TASKS + '/' + task.id)
      .pipe(
        map(r=>{
          response.data = r.data
          response.error = r.error
          response.message = r.message
          return response
        }),
        catchError( e =>{
          response.message='Hubo un probelma'
          return of (response);
        }),
      )
    }

    editTask(id:number, task:ITask|any):Observable<IresponseValidation>{
      const response = { error:true, message:'parece que hay cambios en el proyecto, recarge la pagina', data:null}
      return this.http.put<{error:boolean, message:string, data: any}>(API_ROUTES.DATA_TASK.TASKS + '/' + id, task)
      .pipe(
        map(r=>{
          response.data=r.data
          response.error=r.error
          response.message=r.message
          return response
        }),
        catchError( e =>{
          response.message='parece que hay cambios en el proyecto, recarge la pagina o intente despues'
          return of (response);
        }),
      )
    }

    traerTarea(idTask:number):Observable<IresponseValidation>{
      const response = { error:true, message:'falla cambiando los datos', data:null}
      return this.http.get<{error:boolean, message:string, data: any}>(API_ROUTES.DATA_TASK.TASKS + '/' + idTask + '/byId')
      .pipe(
        map(r=>{
          response.data=r.data
          response.error=r.error
          response.message=r.message
          return response
        }),
        catchError( e =>{
          response.message='problema al traer la tarea'
          return of (response);
        })
      )
    }

    editProyect(id:number, proyect:IProyect):Observable<IresponseValidation>{
      const response = { error:true, message:'falla cambiando los datos', data:null}
      return this.http.put<{error:boolean, message:string, data: any}>(API_ROUTES.DATA_PROYECTS.PROYECTS + '/' + id, proyect)
      .pipe(
        map(r=>{
          response.data=r.data
          response.error=r.error
          response.message=r.message
          return response
        }),
        catchError( e =>{
          response.message='Hubo un problema al editar el proyecto'
          return of (response);
        }),
      )
    }
    //reloadComponent():Observable<any>{
    //  
    //}

}
