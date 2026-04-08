import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

// Ensure environment variables are loaded
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const sendSms = async ({ to, body }) => {
    try {
        // Assuming phone numbers in the database might not have the country code prefix
        let formattedPhone = to;
        if (!formattedPhone.startsWith('+')) {
            // Prepend +91 for Indian numbers as default. Modify if needed for other country codes.
            formattedPhone = `+91${formattedPhone}`;
        }

        const message = await client.messages.create({
            body,
            from: twilioPhoneNumber,
            to: formattedPhone
        });
        
        console.log(`SMS sent successfully to ${formattedPhone}. SID: ${message.sid}`);
        return message;
    } catch (error) {
        console.error(`Failed to send SMS to ${to}:`, error.message);
        throw error;
    }
};

export default sendSms;
