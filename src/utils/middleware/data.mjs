import db from "../database.mjs";
import { sendJsonResponse } from "../utilFunction.mjs";

export const dataSenzor = async (req, res) => {
    try {
        const id = req.user;
        //console.log(id)
        const sensorData = req.body.data;
        //console.log(sensorData);
        if (!Array.isArray(sensorData) || sensorData.length !== 14) {
            return sendJsonResponse(res, false, 400, "Invalid data format. Expected array with 14 elements.", null);
        }
  
        const sensorNames = [
            'iaq',
            'iaqAccuracy',
            'staticIaq',
            'co2Equivalent',
            'breathVocEquivalent',
            'rawTemperature',
            'pressure',
            'rawHumidity',
            'gasResistance',
            'stabStatus',
            'runInStatus',
            'temperature',
            'humidity',
            'gasPercentage'
        ];

        for (let i = 0; i < sensorData.length; i++) {
            const sensorName = sensorNames[i];
            const value = parseFloat(sensorData[i]);
            
            await db('senzors')
                .insert({
                    user_id: id,
                    senzor_id: i,
                    senzor_name: sensorName,
                    value: value
                });
        }
        
        const insertedData = await db('senzors')
            .select('*')
            .where({ user_id: id })
            .orderBy('id', 'desc')
            .limit(14);
        
        sendJsonResponse(res, true, 200, "Sensor data saved successfully", insertedData);
        
    } catch (error) {
        console.error("insert data error:", error);
        sendJsonResponse(res, false, 500, "Server error", null);
    }
};

export const temperatura = async (req, res) => {
    try {
        const id = req.user;

        const temperatura = await db('senzors')
                            .where({user_id: id, senzor_id:11})
                            .orderBy('id', 'desc')
                            .limit(1)
                            .select('value')
                            .first();
        console.log('temp: ', temperatura);
        sendJsonResponse(res, true, 200, "Sensor data saved successfully", temperatura.value - 10);
    } catch (error) {
        console.error("get tempreture failed:", error);
        sendJsonResponse(res, false, 500, "Server error", null);
    }
}