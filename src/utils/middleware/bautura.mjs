import db from "../database.mjs";
import { sendJsonResponse } from "../utilFunction.mjs";

export const bautura = async (req, res) => {
    try {
        const id = req.user;
        
        let user = await db('drink')
                    .where({user_id: id})
                    .select('id')
                    .first();

        
                    if (user){
                        await db('drink')
                            .where({ user_id: id })
                            .increment('sips', 1);

                    }else{
                        await db('drink').insert({
                            user_id: id,
                            sips: 1
                          });
                    }

        sendJsonResponse(res, true, 200, "Sensor data saved successfully", null);
    } catch (error) {
        console.error("get tempreture failed:", error);
        sendJsonResponse(res, false, 500, "Server error", null);
    }
}


export const location = async (req, res) => {
    try {
        const id = req.user;
        
  
        await db('drink')
        .where({ user_id: id })
        .update({
            sips: 0,
            location: db.raw('NOT location')
        });

                    
        sendJsonResponse(res, true, 200, "Sensor data saved successfully", null);
    } catch (error) {
        console.error("get tempreture failed:", error);
        sendJsonResponse(res, false, 500, "Server error", null);
    }
}

export const pahare = async (req, res) => {
    try {
        const id = req.user;
        
  
        let pahar = await db('drink')
        .where({ user_id: id })
        .select('sips')
        .first();

        sendJsonResponse(res, true, 200, "Sensor data saved successfully", Math.floor(Number(pahar.sips/4)));
    } catch (error) {
        console.error("get tempreture failed:", error);
        sendJsonResponse(res, false, 500, "Server error", null);
    }
}