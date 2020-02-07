const model = require('../models/subscriber')

class Subsciber {
    static async subscribePath(data) {
        try {
            const info = await model.create(data)
            return info
        }
        catch(e) {
            throw e
        }
    }

    static async loginSubscriber() {
        try {
            const user = await model.findOne({email: email})
            if(user) {
                
            }
        } catch (e) {
            throw e
        }
    }
}
