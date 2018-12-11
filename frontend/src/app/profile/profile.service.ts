import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import  'rxjs/add/operator/map';
@Injectable()
export class ProfileService {
    user:any;
  constructor(private http:Http) { 
      
  }
  
  getProfile(){
     return this.http.get('/api/patientprofile').map(res => res.json());
    }
    editUser(id:string, name:string,dob:string,healthcardno:string,phoneno:string,postalcode:string,medicalhistory:string,maritalstatus:string,email:string){
        var body ={
        DOB: dob,
        postalCode: postalcode,
        phone: phoneno,
        maritalStatus: maritalstatus,
        healthCardNumber: healthcardno,
        email: email,
        name : name,
        medicalHistory : medicalhistory,
        }
        return this.http.put('/api/manageusers/'+ id, body).map(res => res.json());
    }
    
    
    changePassword(id: string, newPassword: string)
    {
        var body = 
        {
            password: newPassword
        }
        
        return this.http.put('/api/manageusers/' + id, body).map(res => res.json());
    }
}
