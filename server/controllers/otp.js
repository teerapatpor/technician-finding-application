const userInfoModel = require("../models").userInfomations;
require("dotenv/config");
var accountSid = process.env.OTPID; // Your Account SID from www.twilio.com/console
var authToken = process.env.OTPAUTH; // Your Auth Token from www.twilio.com/console
var otpGenerator = require("otp-generator");
const client = require("twilio")(accountSid, authToken);
module.exports = {
  sendOTP: async (args) => {
    try {
      const otpGen = await otpGenerator.generate(6, {
        alphabets: false,
        upperCase: false,
        specialChars: false,
      });
      const phoneNumber = "+66" + args.phone;
      await client.messages
        .create({
          body: "OTP: " + otpGen,
          to: phoneNumber, // Text this number
          from: "+14055443804 ", // From a valid Twilio number
          messagingServiceSid: "MG7bbe7bd63320f9a97dfcaf7ef96a6243",
        })
        .then((message) => console.log(message.sid));
      return otpGen;
    } catch (error) {
      throw error;
    }
  },
  phoneCheck: async (args) => {
    try {
      const checkMatchPhone = await userInfoModel.findOne({
        phone: args.phone,
      });

      if (checkMatchPhone === null) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },
};
