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


// router.post('/:paymentId', function (request, response) {
//     var paymentID = request.params.paymentId;
//     var payerId = request.params.payerId;
    
    
//     const execute_payment_json = {
//         "payer_id": payerId,
//         "transactions":[{
//             "amount": {
//                 "currency": "CAD",
//                 "total": "250.00"
//             }
//         }]
//     };
    
//     paypal.payment.execute(paymentID, execute_payment_json, function (error, payment) {
//         if(error) throw error;
//         else {
               
//             var obj = JSON.parse(execute_payment_json);
            
//           //  var parsed = JSON.parse(request);
            
            
//             var paymentRecord = payments();
//             paymentRecord._id = paymentID;
//             paymentRecord.paymentID = paymentID;
//             paymentRecord.dayTimeStamp = Date.now().toString();
//             paymentRecord.amount = obj.transactions[0].amount.total ;
//             paymentRecord.note = " ";
            
//             paymentRecord.save(function(error){
//              if (error) response.send(error);
                
//              console.log("Get Payment Response");
              
//              response.redirect('https://selfstartbodysmart-jakechambers12.c9users.io/makepayment');
              
//               //  response.json({payment: paymentRecord});
//             });
         
//          /*
//             console.log("Get Payment Response");
//           // console.log(JSON.stringify(payment));
//           // payment = JSON.stringify(payment);
          
//           response.redirect('https://selfstartbodysmart-jakechambers12.c9users.io/makepayment');
           
//           // response.json({Payment: paymentRecord});
           
//           */
          
//         }
//     });
// });


router.get('/',function(request, response){
    var paymentID = request.query.paymentId;
    var payerId = request.query.PayerID;
   // var amount = request.body.
    
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions":[{
            "amount": {
                "currency": "CAD",
                "total": "250.00"
            }
        }]
    };
    
    paypal.payment.execute(paymentID, execute_payment_json, function (error, payment) {
        if(error) throw error;
        else {
               
            var obj = JSON.parse(execute_payment_json);
            
          //  var parsed = JSON.parse(request);
            
            var paymentRecord = payments();
            paymentRecord._id = paymentID;
            paymentRecord.paymentID = paymentID;
            paymentRecord.dayTimeStamp = Date.now().toString();
            paymentRecord.amount = obj.transactions[0].amount.total ;
            paymentRecord.note = " ";
            
            paymentRecord.save(function(error){
             if (error) response.send(error);
                
             console.log("Get Payment Response");
              
             response.redirect('https://selfstartbodysmart-jakechambers12.c9users.io/makepayment');
              
              //  response.json({payment: paymentRecord});
            });
         
         /*
            console.log("Get Payment Response");
           // console.log(JSON.stringify(payment));
           // payment = JSON.stringify(payment);
          
           response.redirect('https://selfstartbodysmart-jakechambers12.c9users.io/makepayment');
           
           // response.json({Payment: paymentRecord});
           
          */
          
        }
    });
});

module.exports = router;