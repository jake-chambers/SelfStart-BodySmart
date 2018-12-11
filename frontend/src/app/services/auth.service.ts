import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {ProfileService} from '../profile/profile.service';
@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http, public profileservice: ProfileService) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('https://localhost:8081/api/register', user,{headers: headers})
      .map(res => res.json());
  }
  
      //were gettin the profile each time the user stays logged in.
    //We dont need user in the get,because were getting the profile, not sending data
    //but the profile is secured so we need the loadToken function
    getProfile(){
      let headers = new Headers();
      this.loadToken();
      //add an extra header for the id_token varification
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type','application/json');
      return this.http.get('https://localhost:8081/api/patientprofile/profile',{headers: headers})
        .map(res => res.json());
    }
    
    // editProfile(user : any, key : any, newValue : any)
    // {
    //   var body = 
    //   {
        
    //     key : newValue,
    //   }
    //   alert(body.username);
    //   alert(body.key);
    //   alert(key);

    //   // let body = new data();
    //   //add an extra header for the id_token varification
    //   // body.append(key,newValue);
    //   this.http.put('https://localhost:8081/api/patientprofile/profile', body);
    // }
    
    // editProfile
    // (name: any,
    // email: any, 
    // username: any,
    // postalCode: any, 
    // DOB: any, 
    // phone: any, 
    // maritalStatus: any, 
    // healthCardNumber: any, 
    // medicalHistory: any)
    // {
      
    //   var body = {
    //     name: name,
    //     email : email,
    //     username : username,
    //     postalCode : postalCode,
    //     DOB : DOB,
    //     phone : phone,
    //     maritalStatus : maritalStatus,
    //     healthCardNumber : healthCardNumber,
    //     medicalHistory : medicalHistory,

    //   }
    //   return this.http.put('https://localhost:8081/api/patientprofile/profile', body).map(res=>res.json());
    // }

  
    //make a post request to authenticateUser
    //we pass the user and header along in the post method.
    authenticateUser(user){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('https://localhost:8081/api/patientprofile/authenticate', user,{headers: headers})
        .map(res => res.json());
    }
    
  
    
    
    storeUserData(token,user){
      //save it in local storage. setItem takes a key and an item.
      localStorage.setItem('id_token',token);
      //for users, we need to stringigy it cause local storage can only store strings not objects
      localStorage.setItem('user',JSON.stringify(user));
      this.authToken=token;
      this.user=user;
    }

    loadToken(){
      const token=localStorage.getItem('id_token');
      this.authToken=token; //getting the token from local storage
    }

    //creating logout
    logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
  }

    loggedIn(){
      return tokenNotExpired('id_token');
    }
    
    isAdmin(){
      var temp=localStorage.getItem('user');
      var user = JSON.parse(temp);
      if(user.isAdmin==true){return true;}
      else {return false;}
    }

}