import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { Http, Headers } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class RehabplanService {
    
    
    private messageSource = new BehaviorSubject<any>("");
    currentMessage = this.messageSource.asObservable();
    
    
    
    private url = "https://selfstartbodysmart-jakechambers12.c9users.io/api";

    constructor(private http:Http) { }
    
    getPlans(){
        return this.http.get('/api/manageplans').map(res => res.json());
    }
    
    deletePlan(planId:string){
        return this.http.delete('/api/manageplans/' + planId).map(res =>res.json());
    }
    
    addExerciseToPlan(RehabName:string, ExerciseName:string){
        var body = {
            rehabName:RehabName,
            exerciseName:ExerciseName,
            
        }
    }
    
    changeMessage(message: any) 
    {
        this.messageSource.next(message);
    }
    


}
