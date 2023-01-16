const ReportStorage = require('./ReportStorage');

class Report{
    constructor(body){
        this.body = body;
    }
    // 보고서 제출
    async submit(activity_img, design_img){
        const report = this.body;
        try{
            const response = await ReportStorage.save(report,activity_img,design_img);
            return response;

        }catch(err){
            const result = {success: false, msg : err}
            return result;
        }
    }
    //보고서 전부 읽어오기
    async allread(){
        const report = this.body;
        try{
            const response = await ReportStorage.getReports(true);
            return response;

        }catch(err){
            const result = {success: false, msg : err}
            return result;
        }
    }
    async userreportread(){
        const report = this.body;
        try{
            const response = await ReportStorage.getReports(true);
            return response;

        }catch(err){
            const result = {success: false, msg : err}
            return result;
        }
    }
    
}
module.exports = Report;