import { Component, OnInit, Input } from '@angular/core';
import { ManageusersService } from './manageusers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css'],
  providers: [ManageusersService]
})
export class ManageusersComponent implements OnInit {

  patientArray: any[] = [];
  patient: any;
  letter: string;
  
  name: string;
  username: string;
  email: string;
  postalCode: string;
  DOB: string;
  maritalStatus: string;
  healthCardNumber: string;
  medicalHistory: string;
  
  patientID: any;
  
  constructor(private user: ManageusersService) {
  
  }

  ngOnInit() {
    this.getPatients();
  }
  
  getPatients(): void {
    this.user.getPatients().subscribe(data=>{
      console.log(data.allUsers);
      this.patientArray = [];
      for (var i = 0; i < data.allUsers.length; i++) {
        this.patientArray.push(data.allUsers[i]);
      }
      console.log("These are the patients");
      console.log(data.allUsers);
    });
  }
  
  onSelect(p:string): void {
    console.log("this is p: " + p);
    this.user.getProfile(p).subscribe(data=>{
      this.patient = data.manageUsers;
      console.log("This is the profile");
      console.log(data);
    })
  }
  
  save(p:string, n:string, user:string, mail:string, postal:string, dob:string, mar:string, health:string, medic:string): void {
    this.name = n;
    this.username = user;
    this.email = mail;
    this.postalCode = postal;
    this.DOB = dob;
    this.maritalStatus = mar;
    this.healthCardNumber = health;
    this.medicalHistory = medic;
    console.log(this.name);
    this.update(p);
  }
  
  update(p:string): void{
      this.user.updateProfile(p, this.name, this.username, this.email, this.postalCode, this.DOB, this.maritalStatus, this.healthCardNumber, this.medicalHistory).subscribe(data =>{
      console.log(data);
      console.log(data.username);
      this.getPatients();
    });
  }
  
  byName(a,b) {
    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  }
  
  byLetter(id:string){
    this.letter = id;
  }
  
  passID(id: any)
  {
    this.patientID = id;
    console.log(id);
  }
  

}
