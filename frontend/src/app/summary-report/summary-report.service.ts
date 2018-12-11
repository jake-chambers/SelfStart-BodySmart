import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SummaryReportService {

  constructor(private http: Http) { }
  
  getRating(){
      return this.http.get('/api/manageexercises/').map(res => res.json());
  }

  getExercisesForPlan(id: string) {
    return this.http.get('/api/rehabPlan/' + id).map(res => res.json());
  }

}
