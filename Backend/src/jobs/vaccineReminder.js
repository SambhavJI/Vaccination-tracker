import cron from "node-cron";
import UserVaccine from "../models/userVaccine.js";
import sendEmail from "../utils/mail.js";

// Run every day at 8:00 AM server time
cron.schedule("* * * * *", async () => {
    try {
        console.log("Running daily check for upcoming vaccines...");

        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 7);
        
        const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

        const upcomingVaccines = await UserVaccine.find({
            "scheduledDate": {
                $gte: startOfDay,
                $lte: endOfDay
            },
            "status": "Pending"
        })
        .populate("vaccine")
        .populate({
            path: "babyInfo",
            populate: {
                path: "user"
            }
        });

        if (!upcomingVaccines.length) {
            console.log("No pending vaccines exactly 7 days from now found.");
            return;
        }

        for (const record of upcomingVaccines) {
            if (!record.babyInfo || !record.babyInfo.user || !record.vaccine) {
               continue; 
            }
            
            const user = record.babyInfo.user;
            const babyName = record.babyInfo.babyName;
            const vaccineName = record.vaccine.name;
            const dueDate = new Date(record.scheduledDate).toLocaleDateString();

            // await sendEmail({
            //     to: user.email,
            //     subject: `Upcoming Vaccination Reminder: ${vaccineName} 💉`,
            //     html: `
            //         <h3>Hello ${user.name || "Parent"},</h3>
            //         <p>This is a gentle reminder that the <b>${vaccineName}</b> vaccine for your baby, <b>${babyName}</b>, is scheduled for next week.</p>
            //         <p><b>Scheduled Date:</b> ${dueDate}</p>
            //         <br/>
            //         <p>Thank you,</p>
            //         <p>Vaccination Tracker Team</p>
            //     `
            // });
            
            console.log(`Reminder email sent to ${user.email} for ${vaccineName} scheduled on ${dueDate}`);
        }
    } catch (error) {
        console.error("Error running vaccine reminder cron job:", error);
    }
});
