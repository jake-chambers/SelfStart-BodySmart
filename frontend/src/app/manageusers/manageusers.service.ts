import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ManageusersService {
    
    patientID : any;
    private ID = new BehaviorSubject<any>("");
    currentID = this.ID.asObservable();
    
    constructor(public http: Http) { }
    
//     changeMessage(id: any) {
//     this.messageSource.next(id)
//   }

    passID(id: any){
        this.patientID = id;
        console.log("this is the patientID: " + this.patientID);
    }
    
    getID() {
        console.log("this is get patientID: " + this.patientID);
        return this.patientID;
    }


    getPatients(){
        return this.http.get('/api/manageusers').map(res => res.json());
    }
    
    getProfile(p:string){
        console.log('/api/manageusers/' + p);
        return this.http.get('/api/manageusers/' + p).map(res => res.json());
    }
    
    getRehabPlan(id: string) {
        return this.http.get('/api/rehabPlan/' + id).map(res=>res.json());
    }
    
    updateProfile(p:string, n:string, user:string, mail:string, postal:string, dob:string, mar:string, health:string, medic:string){
        var body = {
            name: n,
            username: user,
            email: mail,
            postalCode: postal,
            DOB: dob,
            maritalStatus: mar,
            healthCardNumber: health,
            medicalHistory: medic
        }
        return this.http.put(('/api/manageusers/' + p), body).map(res => res.json());
    }
    

    
    addPlan(array: any [], id: string){
        var body ={
            rehabPlan: array,
        }
        return this.http.put(('/api/manageusers/' + id), body).map(res => res.json());
    }
    

    
    // updatePatient(ID: any, name: any, user: any, email: any, postalcode: any, phone: any, dob: any, maritalstatus: any, healthcardnumber: any, medicalhistory: any){
    //   var body = {
    //     name: name,
    //     username: user,
    //     email: email,
    //     postalCode: postalcode,
    //     phone: phone,
    //     DOB: dob,
    //     maritalStatus: maritalstatus,
    //     healthCardNumber: healthcardnumber,
    //     medicalHistory: medicalhistory
    //   }
    //   return this.http.put(('/api/manageusers/'+ ID), body).map(res=>res.json());
    // }
}

        