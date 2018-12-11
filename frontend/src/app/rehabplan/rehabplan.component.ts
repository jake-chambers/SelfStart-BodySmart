import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RehabplanService } from './rehabplan.service';
import { Http } from '@angular/http';


@Component({
  selector: 'app-rehabplan',
  templateUrl: './rehabplan.component.html',
  styleUrls: ['./rehabplan.component.css'],
  providers: [RehabplanService]
})
export class RehabplanComponent implements OnInit {
  
  plansArray: any [] = [];

  constructor(public rehabplanService: RehabplanService){}
  
  ngOnInit() {
    this.getPlans();
  }
  
  // for testing purposes
  getPlans(){
    this.rehabplanService.getPlans().subscribe(data=>{
      this.plansArray = [];
      for (var i = 0; i < data.manageplans.length; i++){
        this.plansArray.push(data.manageplans[i]);
      }
      console.log("These are the plans");
      console.log(data.manageplans);
    })
  }
  
  deletePlan(planId:string){
    this.rehabplanService.deletePlan(planId).subscribe(
      data => console.log(data),
      err => console.log(err),
      );
      this.ngOnInit();
  }
  
  // viewPlans(data){
  //   this.plans = [];
  //   for (var i = 0; i < this.data.length; i++){
  //     this.plans.push(data[i]);
  //   };
  // }

}
