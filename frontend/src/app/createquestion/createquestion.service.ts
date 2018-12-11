import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CreatequestionService {

  constructor(public http: Http) { }
  
  addQuestion(question: string)
  {
      var body = {
          formName: question
      }
      
      console.log(body);
      
      return this.http.post('/api/manageforms', body).map(res => res.json());
  }
  createForm (name: string, description: string)
  {
    var body = {
      formName: name,
      formDescription: description
    }
    return this.http.post('/api/manageforms', body).map(res => res.json());
    
  }
 
}
