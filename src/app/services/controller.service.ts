import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { IdTypes } from '../taxpayer-management/kyc/kyc.component';
@Injectable({
  providedIn: 'root'
})

export class ControllerService {

  baseUrl: string ="http://192.168.1.130:8181/"
  
  constructor(private http:HttpClient ) { }

  
  listIdTypes():Observable<any>{
    return this.http.get(this.baseUrl+'uaa/identitytype/?pageNo=0&pageSize=10&search=0')
  }

  listIdRegions():Observable<any>{
    return this.http.get(this.baseUrl+'uaa/region/?pageNo=0&pageSize=10&search=0')
  }


   getDistrictByRegionId(id:string){
    return this.http.get(this.baseUrl+'uaa/district/region/'+id)
  }

  getWardByDistrictId(id:string){
    return this.http.get(this.baseUrl+'uaa/ward/district/'+id)
  }

  getShehiaByWardId(id:string){
    return this.http.get(this.baseUrl+'uaa/shehia/ward/'+id)
  }

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
