import db from "../database.mjs";
import { sendJsonResponse } from "../utilFunction.mjs";

export const userPreferences = async (req, res) => {
    try {
        const id = req.user.id; 
        const { notification_emails, push_notifications, goal_reminders, unit_preferences} = req.body;

        const userPreferences = {
            user_id: id,
            notification_emails: notification_emails !== undefined ? notification_emails : true,
            push_notifications: push_notifications !== undefined ? push_notifications : true,
            goal_reminders: goal_reminders !== undefined ? goal_reminders : true,
            unit_preferences: unit_preferences ?? 'metric',
        };

        let userPref = await knex('user_preferences')
            .where({ user_id: id })
            .select('id')
            .first();

        if (userPref) {
            await knex('user_preferences')
                .where({ user_id: id })
                .update(userPreferences);
        } else {
            await knex('user_preferences')
                .insert(userPreferences);
        }

        sendJsonResponse(res, true, 200, "User preferences updated", userPreferences);
    } catch (error) {
        console.error("Error updating user preferences:", error);
        sendJsonResponse(res, false, 500, "Server error", null);
    }
}
