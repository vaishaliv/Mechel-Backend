require("dotenv").config();
const Fast2SMS = require('fast2sms');  

const options = {  
    authorization: 'ai8xVS4RIX2QrkLDjs5lGUte1zqPpBWYuFnZEAvJNCfK3TOM7wYdWyc4uUK6Op7VGDMQFg9lJNbfqhtB',  
    message: 'Test Message from fast2sms',  
    numbers: ['7738180202', '9769909978']  
};  

// Fast2SMS.
Fast2SMS.sendMessage(options)  
.then(data => {  
        console.log('SMS sent successfully:', data);  
    })  
.catch(err => {  
        console.error('Error sending SMS:', err);  
    });  



// // Import the Twilio library
// const twilio = require("twilio");

// // Twilio credentials from your Twilio Console
// const accountSid = process.env.TWILLO_ACCOUNT_SID; // Replace with your Account SID
// const authToken = process.env.TWILLO_AUTH_TOKEN; // Replace with your Auth Token

// const client = require("twilio")(accountSid, authToken);

// client.messages
//   .create({
//     body: "Hello from Twilio and Node.js!",
//     to: "+919769909978", // e.g. '+1234567890'
//     from: "+917738180202", // e.g. '+0987654321'
//   })
//   .then((message) => console.log(message.sid))
//   .catch((error) => console.error(error));
