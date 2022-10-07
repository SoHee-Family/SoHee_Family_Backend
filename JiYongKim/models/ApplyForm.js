const ApplyFormStorage = require('./ApplyFormStorage');

class ApplyForm{
    constructor(body){
        this.body = body;
    }

    // 신청서 제출
    async submit(){
        const form = this.body;
        try{
            const response = await ApplyFormStorage.save(form);
            return response;
        }catch(err){
            const result = {success: false, msg : err}
            return result;
        }
    }


    
}
module.exports = ApplyForm;