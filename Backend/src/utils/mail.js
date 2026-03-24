import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

async function sendEmail({ to, subject, html }) {
    try {
        await transporter.sendMail({
            from: `"Vaccination Tracker" <${process.env.EMAIL}>`,
            to,
            subject,
            html,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email sending failed:", error);
    }
}

export default sendEmail;