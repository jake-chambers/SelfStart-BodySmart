import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { ProfileService } from '../profile/profile.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
  user:Object;
  isShown: boolean = false;
  Showing: boolean = false;
  @ViewChild('oldPass') oldPass: ElementRef;
  @ViewChild('newPass') newPass: ElementRef;
  @ViewChild('verifyNewPass') verifyNewPass: ElementRef;
  @ViewChild('id') id: ElementRef;

  
  constructor(
    private authService:AuthService,
    private router:Router,
    public profileservice:ProfileService,
    private flashmessage:FlashMessagesService,
  ) {}

  editUser(id:string, name:string, dob:string, healthcardno:string, phoneno:string, postalcode:string, medicalhistory:string, maritalstatus:string, email:string){
    this.profileservice.editUser(id,name,dob,healthcardno,phoneno,postalcode,medicalhistory,maritalstatus,email).subscribe(data=>{
      console.log(data);
      this.flashmessage.show('Profile Updated!', {cssClass: 'alert-success', timeout: 3000});
      this.ngOnInit();
    })
  }
  
  changePassword(username:string)
  {
    const user = 
    {
      username:username,
      password:this.oldPass.nativeElement.value,
    }
    
    if (this.newPass.nativeElement.value != this.verifyNewPass.nativeElement.value)
    {
      this.flashmessage.show('New Passwords do not match', {cssClass: 'alert-danger', timeout: 3000});
    }
    else
    {
      this.authService.authenticateUser(user).subscribe(data=>
        {
        if(data.success)
        {
          //if old password is good
          console.log("success");
          
          
          this.profileservice.changePassword(this.id.nativeElement.value, this.newPass.nativeElement.value).subscribe(data=>{
            console.log(data);
             this.flashmessage.show('Password Changed Successfully', {cssClass: 'alert-success', timeout: 3000});
          })
        }
        else
        {
          //if old password is bad
          this.flashmessage.show('Old password does not match', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }
  }
  
  ngOnInit() 
  {
    this.Showing = false;
    this.isShown = false;
    this.authService.getProfile().subscribe(profile=>{
    this.user=profile.user;
    console.log(profile.user);
  },
err=>{
  console.log(err);
  return false;
    });
  }
}
