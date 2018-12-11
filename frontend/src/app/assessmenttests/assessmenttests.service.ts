import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AssessmenttestsService {

  constructor(public http: Http) { }


    getQuestions(id:string){
    
      return this.http.get('/api/manageforms/' + id).map(res => res.json());
    }
    getForms(id:string){
      return this.http.get('/api/manageforms/' + id).map(res => res.json());
    }
    submitAnswers(formid:string, questionid:string, answer:string){
      
      var body={
        answer:answer,
      }
      
      return this.http.post('/api/manageforms/' + formid +'/'+ questionid, body).map(res => res.json());
    }
}
