"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
require("rxjs/add/operator/switchMap");
var ViewpatientComponent = /** @class */ (function () {
    function ViewpatientComponent(manageusers, flashmessage, router, route) {
        this.manageusers = manageusers;
        this.flashmessage = flashmessage;
        this.router = router;
        this.route = route;
        this.ID = [];
        this.patientID = [];
        this.pat = [];
        this.exerciseArrays = [];
        this.isCollapsed = false;
    }
    ViewpatientComponent.prototype.ngOnInit = function () {
        var id = this.route.snapshot.paramMap.get('_id');
        console.log(id);
        this.getPatient(id);
    };
    ViewpatientComponent.prototype.getPatient = function (id) {
        var _this = this;
        console.log("this is id: " + id);
        this.manageusers.getProfile(id).subscribe(function (data) {
            _this.pat = data.manageUsers;
            console.log("This is the profile");
            console.log(data.manageUsers);
            console.log(_this.pat);
            _this.exerciseArrays = _this.pat.exercisePlan;
            console.log(_this.exerciseArrays);
        });
    };
    ViewpatientComponent.prototype.collapsed = function (event) {
        console.log(event);
    };
    ViewpatientComponent.prototype.expanded = function (event) {
        console.log(event);
    };
    ViewpatientComponent = __decorate([
        core_1.Component({
            selector: 'app-viewpatient',
            templateUrl: './viewpatient.component.html',
            styleUrls: ['./viewpatient.component.css']
        })
    ], ViewpatientComponent);
    return ViewpatientComponent;
}());
exports.ViewpatientComponent = ViewpatientComponent;
