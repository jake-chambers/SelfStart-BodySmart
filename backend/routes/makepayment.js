var express = require('express');
var router = express.Router();
var patientProfiles = require('../models/patientprofile');
var payments = require('../models/payments');
var paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AV_w-0nXi9R4KilFqKZpiI7lCFHuA72iaElGA7GkPZucZHXEbrTQ9CZgNA4iO0slfuLpJaGHHs150suP',
  'client_secret': 'EDprbTizwyP4rtyjfS4ftuf2O9QNY6BDJnTC1d9rdn1cdurT3i_U_rinyVXJQAR5inygEMhhGkorJvNJ'
});

var listPayment = {
    'count' : '1',
    'start_index' : '1'
};

router.get('/', function(request, response){ //gets the payments made
      const payerId = request.query.PayerId;
      
      paypal.payment.list(listPayment, function (error, payment) {
          
        if (error)  throw error;
        else {
            console.log("List Payments Response");
         //   console.log(JSON.stringify(payment));
            payment = JSON.stringify(payment);
            response.send({payments: payment});
        }

      });
  
});


router.post('/',function(request, response){  //called when a customer clicks the pay now button, it sets up the payment
       
   /*    
       var id = request.body.paymentID;
       var timeStamp = Date.now().toString();
       var amount = request.body.amount;
       var note = request.body.note;
       
       var newPayment = new payments();
       newPayment.paymentID = " ";
      
       newPayment.dayTimeStamp = timeStamp;
       newPayment.note = note;
     */
       
        const create_payment_json = {
          "intent": "sale",
          "payer": {
              "payment_method": "paypal"
          },
          "redirect_urls": {
              "return_url": "https://selfstartbodysmart-jakechambers12.c9users.io/api/executepayment", //redirects to this url upon success
              "cancel_url": "http://cancel.url"
          },
          "transactions": [{
              "item_list": {
                  "items": [{
                      "name": "Exercise Package",
                      "sku": "item",
                      "price": request.body.amount ,
                      "currency": "CAD",
                      "quantity": 1
                  }]
              },
              "amount": {
                  "currency": "CAD",
                  "total": request.body.amount
              },
              "description": "This is the payment description."
          }]
      };
      
      
      paypal.payment.create(create_payment_json, function (error, payment) {
          if (error) {
            console.log(error);
              throw error;
          } else {
            
           
           for(let i=0; i < payment.links.length; i++){
              if(payment.links[i].rel === 'approval_url'){ //looping the json response to look for the approval url
              //  response.redirect(payment.links[i].href);   //the user is redirected to the approval url that came from the json response
              var link = payment.links[i].href;
              link = JSON.stringify(link);
              response.send({links: link });
              }
            }
            
         /*   
            newPayment.save(function(error){
             if (error) {
                    response.send({ error: error });
                }
                else {
                   // console.log(newPayment.json());
                }
           });
          */  
          //    console.log("Create Payment Response");
            //  console.log(payment);
            //  response.send('Success test');  
              
          }
      });
  
});

module.exports = router;
