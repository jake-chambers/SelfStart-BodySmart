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
var ManageexercisesService = /** @class */ (function () {
    function ManageexercisesService(http) {
        this.http = http;
        this.messageSource2 = new BehaviorSubject_1.BehaviorSubject("");
        this.currentMessage2 = this.messageSource2.asObservable();
    }
    ManageexercisesService.prototype.getExercises = function () {
        return this.http.get('/api/manageexercises').map(function (res) { return res.json(); });
    };
    ManageexercisesService.prototype.changeMessage2 = function (message2) {
        this.messageSource2.next(message2);
    };
    ManageexercisesService.prototype.editExercise = function (ID, name, description, authorName, objectives, actionSteps, location, frequency, duration, multimediaURL) {
        var body = {
            name: name,
            description: description,
            authorName: authorName,
            objectives: objectives,
            actionSteps: actionSteps,
            location: location,
            frequency: frequency,
            duration: duration,
            multimediaURL: multimediaURL
        };
        return this.http.put(('/api/manageexercises/' + ID), body).map(function (res) { return res.json(); });
    };
    ManageexercisesService.prototype.updateRating = function (ID, rating, uId) {
        var body = { rating: rating,
            userID: uId };
        return this.http.put(('/api/manageexercises/' + ID), body).map(function (res) { return res.json(); });
    };
    ManageexercisesService.prototype.getRating = function (ID) {
        return this.http.get('/api/manageexercises/' + ID).map(function (res) { return res.json(); });
    };
    ManageexercisesService.prototype.deleteExercise = function (id) {
        return this.http["delete"]('/api/manageexercises/' + id).map(function (res) { return res.json(); });
    };
    ManageexercisesService.prototype.updateRehabRating = function (ID, rating, eName, uId) {
        var body = { rating: rating,
            eName: eName,
            uID: uId
        };
        var ratingsJSON = this.http.get(('/api/rating/'));
        for (var i = 0; i < ratingsJSON.length; i++) {
            if (ratingsJSON[i].uID == uId) {
                return this.http.put(('/api/rating/' + ratingsJSON[i]._id), body).map(function (res) { return res.json(); });
            }
        }
        console.log("IN THE ManageexercisesService SERVICE");
        console.log("RATING IS: " + rating);
        // console.log("EID is : " + eId);
        console.log("userID is : " + uId);
        return this.http.post(('/api/rating/'), body).map(function (res) { return res.json(); });
    };
    ManageexercisesService = __decorate([
        core_1.Injectable()
    ], ManageexercisesService);
    return ManageexercisesService;
}());
exports.ManageexercisesService = ManageexercisesService;
