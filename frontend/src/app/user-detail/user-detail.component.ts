import { Component, OnInit } from '@angular/core';
import { ManageusersService } from '../manageusers/manageusers.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [ManageusersService]
})
export class UserDetailComponent implements OnInit {

  patient: any[] = [];

  constructor(private user:ManageusersService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getPatient();
  }
  
  getPatient(){
    // const id = +this.route.snapshot.paramMap.get('_id');
    // console.log(id);
    // this.user.getProfile(id).subscribe(data=>{
    //   this.patient = [];
    //   for (var i = 0; i < data.patientprofile.length; i++){
    //     this.patient.push(data.patientprofile[i]);
    //   }
    //   console.log("This is the profile");
    //   console.log(data.patientprofile);
    // })
  }

}
