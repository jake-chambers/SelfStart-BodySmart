import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class QuestionformService {

  private messageSource3 = new BehaviorSubject<any>("");
  currentMessage3 = this.messageSource3.asObservable();

  
  constructor(public http: Http) { }
  
  
  changeMessage3(message3: any)
  {
    this.messageSource3.next(message3);
  }
  
  sendForm(formID:string, id:string)
  {
    var body =
    {
      forms :formID,
    }
    
    return this.http.post('/api/manageusers/' + id, body).map(res => res.json());
  }
  
  getQuestions()
  {
      return this.http.get('/api/manageforms').map(res => res.json());
  }
  
  deleteQuestion(questionId: string)
  {
      return this.http.delete('/api/manageforms/' + questionId).map(res => res.json());
  }
  deleteForm(id:string){
    return this.http.delete('/api/manageforms/' + id).map(res => res.json());
  }


  editQuestion(questionId: string, edited: string)
  {
    
    var body = 
    {
      formName: edited
    }
    return this.http.put(('/api/manageforms/' + questionId), body).map(res => res.json());
  }
  
  
  getQuestion(id : string)
  {
    return this.http.get('/api/manageforms/' + id).map(res => res.json())
  }
}
