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
    async matching(idx){
        try{
            const response = await ApplyFormStorage.matching(idx-1);
            return response;
        }catch(err){
            const result = {success: false, msg : err}
            return result;
        }
    }
    async delete(id){
        try{
            const response = await ApplyFormStorage.delete(id);
            return response;
        }catch(err){
            const result = {success: false, msg : err}
            return result;
        }
    }




    
}
module.exports = ApplyForm;