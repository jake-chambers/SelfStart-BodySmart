import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CreateexerciseService {

  constructor(public http: Http) { }
  addExercise(name:string, description:string, author:string, objectives:string, actionSteps: string, location:string, frequency:string, duration:string, mulitMediaURL: string){
    var body = {
        name: name, 
        description: description, 
        authorName: author, 
        objectives: objectives, 
        actionSteps: actionSteps, 
        location: location, 
        frequency: frequency, 
        duration: duration, 
        multimediaURL: mulitMediaURL
    }
    console.log(body);
    return this.http.post('/api/manageexercises', body).map(res => res.json());
  }
}
