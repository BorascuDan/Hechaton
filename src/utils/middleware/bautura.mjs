import db from "../database.mjs";
import { sendJsonResponse } from "../utilFunction.mjs";

export const bautura = async (req, res) => {
    try {
        const id = req.user;
        const { location } = (req.body);
        // Validate that location is either 0 or 1
        if (location !== '0' && location !== '1') {
            return sendJsonResponse(res, false, 400, "Invalid location parameter. Must be 0 or 1.", null);
        }
        let bar = 1;
        if (location === '0') bar = 0;

        // Check if user record exists for this location
        let user = await db('drink')
                    .where({user_id: id, location: bar})
                    .select('id')
                    .first();
        
        if (user) {
            // Update existing record
            await db('drink')
                .where({ user_id: id, location: bar })
                .increment('sips', 1);
        } else {
            // Create new record
            await db('drink').insert({
                user_id: id,
                location: bar,
                sips: 1
            });
        }

        sendJsonResponse(res, true, 200, `sips incremented successfully`, null);
    } catch (error) {
        console.error(`Location ${req.body.location} increment failed:`, error);
        sendJsonResponse(res, false, 500, "Server error", null);
    }
};

// Middleware to get the sum of sips from both locations
export const getTotalSips = async (req, res) => {
    try {
        const id = req.user;
        
        // Get total sips from location 0
        const location0Result = await db('drink')
            .where({user_id: id, location: 0})
            .select('sips')
            .first();
        
        const location1Result = await db('drink')
            .where({user_id: id, location: 1})
            .select('sips')
            .first();
            
        const totalSips =  location0Result.sips + location1Result.sips;
        
        sendJsonResponse(res, true, 200, "Total sips retrieved successfully", Math.floor(Number(totalSips/4)));
    } catch (error) {
        console.error("Get total sips failed:", error);
        sendJsonResponse(res, false, 500, "Server error", null);
    }
};

export const locatie = async (req, res) => {
    try {
        const id = req.user;
        const { location } = (req.body);
        let totalSips;
        if (location === '0'){
        totalSips = await db('drink')
            .where({user_id: id, location: 0})
            .select('sips')
            .first();
        }else {
        totalSips = await db('drink')
            .where({user_id: id, location: 1})
            .select('sips')
            .first();
        }    
        totalSips = totalSips.sips;
        
        sendJsonResponse(res, true, 200, "Total sips retrieved successfully", Math.floor(Number(totalSips/4)));
    } catch (error) {
        console.error("Get total sips failed:", error);
        sendJsonResponse(res, false, 500, "Server error", null);
    }
}