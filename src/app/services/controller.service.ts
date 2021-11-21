import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { User } from '../users/list-users/list-users.component';
@Injectable({
  providedIn: 'root'
})

export class ControllerService {

  baseUrl: string ="http://192.168.1.130:8181/"
  
  constructor(private http:HttpClient ) { }
  // listUsers():Observable<User[]>{
  //   return this.http.get<User[]>(this.baseUrl+'users')
  // }
  getNidaInformation(id:string){
    return this.http.get(this.baseUrl+'mock/nida/'+id)
  }
  getPassportInformation(id:string){
    return this.http.get(this.baseUrl+'mock/nida/'+id)
  }
  addUser(userObj:any){
    return this.http.post(this.baseUrl+'users/',userObj)
  }

  applyForZNumber(userObj:any){
    return this.http.post(this.baseUrl+'registration/person/',userObj)
  }

  institutionApplyForZNumber(userObj:any){
    return this.http.post(this.baseUrl+'registration/institution/',userObj)
  }

  submitRegistration(userObj:any){
    return this.http.post(this.baseUrl+'registration/business/',userObj)
  }

  deleteUser(id:string){
    return this.http.delete(this.baseUrl+'users/'+id)
  }

  updateUser(id:any,userObj:any){
    return this.http.put(this.baseUrl+'users/'+id,userObj)
  }
}
