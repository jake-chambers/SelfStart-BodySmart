import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CreateplanService {

  constructor(public http: Http) { }
  
  getExercises(){
    return this.http.get('/api/manageexercises').map(res => res.json());
  }
    
  getExerciseByID(p: string){
    return this.http.get('/api/manageexercises/' + p).map(res => res.json());  
  }
    
  addPlan(id: string, array: any[])
  {
    var body = {
        _id: id,
        exercisePlanArray: array,
    }
    console.log(body);
    return this.http.put('/api/manageusers/' + id, body).map(res => res.json());
    
  }
  
  getPlan(id: string) {
    return this.http.get('/api/manageusers/' + id).map(res => res.json());
  }
  
  createRehabPlan(array: any[], name:string) {
    var body = {
      exercises: array,
      name: name,
    }
    return this.http.post('api/rehabPlan', body).map(res => res.json());
  }
  
  getRehabPlans(){
    return this.http.get('api/rehabPlan').map(res => res.json());
  }
  
  addRehabPlanPatient(patID: string, rehabArray: string[]) {
    var body = {
      rehabPlan: rehabArray,
    }
    return this.http.put(('api/manageusers/' + patID), body).map(res => res.json());
  }
  
  getRehabPlanByID(id:string) {
    return this.http.get('api/rehabPlan/' + id).map(res => res.json());
  }
  
  deleteRehabPlan(id:string) {
    return this.http.delete('api/rehabPlan/' + id).map(res => res.json());
  }
  
}
