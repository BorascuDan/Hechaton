import db from "../database.mjs";
import { sendJsonResponse } from "../utilFunction.mjs";

export const personalDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const {age, weight, height, gender} = req.body;

        let complition = false;
        if (age&&weight&&height&&gender) complition = true

        let gen;
        gender ? gen = true : gen = false;

        const userProfile = {
            user_id: id,
            age: age ?? null,
            weight: weight ?? null,
            height: height,
            gender: gen,
            profile_completed: complition

        };
        let user = await db('user_profiles')
                    .where({user_id: id})
                    .select('id')
                    .first();

        if (user){
            await db('user_profiles')
            .update(userProfile);
        }else{
            await db('user_profiles')
            .insert(userProfile);
        }

        sendJsonResponse(res, true, 200, "inserted personal details", userProfile);
    } catch (error) {
        console.error("Adiing data error:", error);
        sendJsonResponse(res, false, 500, "Server error", null);
    }
}
