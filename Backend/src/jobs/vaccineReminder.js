import cron from "node-cron";
import UserVaccine from "../models/userVaccine.js";
import sendEmail from "../utils/mail.js";
import sendSms from "../utils/sms.js";

// Run every day at 8:00 AM server time
cron.schedule("0 8 * * *", async () => {
    try {
        console.log("Running daily check for upcoming vaccines...");

        const now = new Date();

        // Start of today (00:00:00)
        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);

        // End of 7 days from now (23:59:59)
        const endOfWeek = new Date(now);
        endOfWeek.setDate(endOfWeek.getDate() + 7);
        endOfWeek.setHours(23, 59, 59, 999);

        const upcomingVaccines = await UserVaccine.find({
            scheduledDate: {
                $gte: startOfToday,
                $lte: endOfWeek
            },
            status: "Pending",
            reminderSentAt: { $exists: false }  // skip already notified
        })
        .populate("vaccine")
        .populate({
            path: "babyInfo",
            populate: { path: "user" }
        });

        if (!upcomingVaccines.length) {
            console.log("No pending vaccines in the next 7 days.");
            return;
        }

        console.log(`Found ${upcomingVaccines.length} upcoming vaccine(s). Sending reminders...`);

        for (const record of upcomingVaccines) {
            if (!record.babyInfo || !record.babyInfo.user || !record.vaccine) {
                console.warn(`Skipping record ${record._id}: missing babyInfo, user, or vaccine.`);
                continue;
            }

            const user = record.babyInfo.user;
            const babyName = record.babyInfo.babyName;
            const vaccineName = record.vaccine.name;
            const dueDate = record.scheduledDate.toISOString().split("T")[0]; // e.g. "2026-04-06"

            try {
                // const emailPromise = sendEmail({
                //     to: user.email,
                //     subject: `Upcoming Vaccination Reminder: ${vaccineName} 💉`,
                //     html: `
                //         <h3>Hello ${user.name || "Parent"},</h3>
                //         <p>This is a gentle reminder that the <b>${vaccineName}</b> vaccine for <b>${babyName}</b> is due soon.</p>
                //         <p><b>Scheduled Date:</b> ${dueDate}</p>
                //         <br/>
                //         <p>Thank you,</p>
                //         <p>Vaccination Tracker Team</p>
                //     `
                // }).catch(e => console.error(`Failed to send email to ${user.email} for record ${record._id}:`, e));

                // const smsBody = `Hello ${user.name || "Parent"}, a gentle reminder that the ${vaccineName} vaccine for ${babyName} is due on ${dueDate}. Thank you, Vaccination Tracker Team`;
                
                // let smsPromise = Promise.resolve();
                // if (user.phone) {
                //     smsPromise = sendSms({
                //         to: user.phone,
                //         body: smsBody
                //     }).catch(e => console.error(`Failed to send SMS to ${user.phone} for record ${record._id}:`, e));
                // }

                // // Send both notifications in parallel
                // await Promise.all([emailPromise, smsPromise]);

                // Mark reminder as sent to prevent duplicates
                await UserVaccine.findByIdAndUpdate(record._id, {
                    reminderSentAt: new Date()
                });

                console.log(`Reminders (Email & SMS) sent for ${vaccineName} on ${dueDate} to ${user.email}`);
            } catch (notificationError) {
                // Don't let one failed database update stop the rest
                console.error(`Failed to update DB after notifications for record ${record._id}:`, notificationError);
            }
        }

    } catch (error) {
        console.error("Error running vaccine reminder cron job:", error);
    }
});