"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var ManageusersService = /** @class */ (function () {
    function ManageusersService(http) {
        this.http = http;
        this.ID = new BehaviorSubject_1.BehaviorSubject("");
        this.currentID = this.ID.asObservable();
    }
    //     changeMessage(id: any) {
    //     this.messageSource.next(id)
    //   }
    ManageusersService.prototype.passID = function (id) {
        this.patientID = id;
        console.log("this is the patientID: " + this.patientID);
    };
    ManageusersService.prototype.getID = function () {
        console.log("this is get patientID: " + this.patientID);
        return this.patientID;
    };
    ManageusersService.prototype.getPatients = function () {
        return this.http.get('/api/manageusers').map(function (res) { return res.json(); });
    };
    ManageusersService.prototype.getProfile = function (p) {
        console.log('/api/manageusers/' + p);
        console.log("this should work:" + this.http.get('/api/manageusers/' + p).map(function (res) { return res.json(); }));
        return this.http.get('/api/manageusers/' + p).map(function (res) { return res.json(); });
    };
    ManageusersService.prototype.updateProfile = function (p, n, user, mail, postal, dob, mar, health, medic) {
        var body = {
            name: n,
            username: user,
            email: mail,
            postalCode: postal,
            DOB: dob,
            maritalStatus: mar,
            healthCardNumber: health,
            medicalHistory: medic
        };
        return this.http.put(('/api/manageusers/' + p), body).map(function (res) { return res.json(); });
    };
    ManageusersService.prototype.addPlan = function (array, id) {
        var body = {
            exercisePlan: array
        };
        return this.http.put(('/api/manageusers/' + id), body).map(function (res) { return res.json(); });
    };
    ManageusersService = __decorate([
        core_1.Injectable()
    ], ManageusersService);
    return ManageusersService;
}());
exports.ManageusersService = ManageusersService;
