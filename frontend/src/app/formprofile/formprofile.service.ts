import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FormprofileService {
    private messageSource = new BehaviorSubject<any>("");
    currentMessage = this.messageSource.asObservable();
  constructor(public http: Http) { }

    changeMessage(message: any)
  {
    this.messageSource.next(message);
  }
  deleteQuestion(id:string, qid:string){
    return this.http.delete('/api/manageforms/'+id+'/'+qid).map(res => res.json());
  }
  editForm(id: string, name: string, description: string){
    var body={
      name:name,
      description:description
    }
    return this.http.put('/api/manageforms/'+id, body).map(res => res.json());
  }
}
