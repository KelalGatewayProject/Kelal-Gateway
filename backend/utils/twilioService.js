const twilio = require("twilio");
const validation = require("./validation");

/**
 * Twilio service for sending and verifying OTP codes
 */
const twilioService = {
  client: null,

  // Initialize the Twilio client
  init: () => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      console.error("Twilio credentials not found in environment variables");
      return;
    }

    twilioService.client = twilio(accountSid, authToken);
  },

  // Generate a random 6-digit OTP code
  generateOTP: () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  // Send OTP via SMS
  sendOTP: async (phoneNumber, otpCode) => {
    if (!twilioService.client) {
      twilioService.init();
    }

    if (!validation.isValidPhone(phoneNumber)) {
      throw new Error("Invalid phone number format");
    }

    try {
      const message = await twilioService.client.messages.create({
        body: `Your Kelal Gateway verification code is: ${otpCode}`,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER || "+15005550006", // Use test number if not provided
      });

      return {
        success: true,
        messageId: message.sid,
      };
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  },

  // Verify the OTP code
  verifyOTP: (userInputOTP, storedOTP) => {
    return userInputOTP === storedOTP;
  },
};

module.exports = twilioService;
