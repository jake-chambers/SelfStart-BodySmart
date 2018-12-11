import { Component, OnInit } from '@angular/core';
import { MakepaymentService } from './makepayment.service';
import { Http } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-makepayment',
  templateUrl: './makepayment.component.html',
  styleUrls: ['./makepayment.component.css'],
  providers: [MakepaymentService]
})

export class MakepaymentComponent implements OnInit {

  paymentID: number;
 // dayTimeStamp: String;
  amount: String;
  note: String;
  formdata: any;
  link: string;
  
  isButtonVisible: boolean;
  termsVisible: boolean;

  constructor(private payment: MakepaymentService,  private flashmessage:FlashMessagesService) { }

  ngOnInit() {
    this.formdata = new FormGroup({
         note: new FormControl(""),
         amount: new FormControl("")
      });
      
     this.isButtonVisible = false;
     this.termsVisible = true;
  }
  
  termsAndAgreementsChecked() : void {
      this.isButtonVisible = true;
      this.termsVisible = false;
  }
  
  paymentBtnClicked(data) : void {
    //commented this out cause it was throwing an error
  //   this.paymentID = id;
     
    var check = false;
    if (data.note.length > 0)
    {
        this.note = data.note;
    }
    else
    {
       this.note = "NA";
    }
    if (data.amount.length > 0)
    {
        this.amount = data.amount;
        check = true;
    }
   
     
    if (check)
    {
        this.payment.setUpPayment(this.amount, this.note).subscribe(data=>{
             
             this.link = data.links;
             this.link = this.link.substring(1,this.link.length-1);
             window.open(this.link, "_blank");
         })
    }
    else
    {
        window.scrollTo(0, 0);
        this.flashmessage.show('Select a payment Plan!', {cssClass: 'alert alert-danger', timeout: 3000});
    }
  } 

}
