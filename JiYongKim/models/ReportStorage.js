"user strict"
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

class ReportStorage{
    
    // 모든 report 반환
    static #getReports (data, isAll, fields){
        const reports = JSON.parse(data);
        if(isAll) return reports;
        const newReports = fields.reduce((newReports, field)=>{
            if(reports.hasOwnProperty(field)){
                newReports[field] = reports[field];
            }
            return newReports;
        },{});
        return newReports;
    }

    static getReports(isAll,...fields){
        return fs.readFile("./databases/report.json",'utf-8')
        .then((data)=>{
            return this.#getReports(data,isAll,fields);
        })
        .catch(console.error);
    }


    // //유저 ID로 모든 report 반환
    // static #getReportById(data, id){
    //     const reports = JSON.parse(data);
    //     const idx = forms.id.indexOf(id);
    //     const formsKeys = Object.keys(forms);

    //     const reportInfo = formsKeys.reduce((newReport, info)=>{
    //         newReport[info] = reports[info][idx];
    //         return newReport;
    //     },{});
    //     return reportInfo;
    // }

    // static getReportById(id){
    //     return fs.readFile('/databases/report.json','utf-8')
    //     .then((data)=>{
    //         return this.#getReportById(data, id);
    //     })
    //     .catch(console.error);
    // }

    
    //유저 ID로 모든 report 반환
    static #getReportById(data, id){
        const reports = JSON.parse(data);
        const formsKeys = Object.keys(reports);
        const result = [];
        for (let i=0; i<reports.id.length; i++) {
            // console.log("아이디 :"+reports.id[i]);
            if(reports.id[i] === id){
                let idx = i;
                const reportInfo = formsKeys.reduce((newReport, info)=>{
                    newReport[info] = reports[info][idx];
                    return newReport;
                },{});
                result.push(reportInfo);
            }
          }

          return result;

        // const idx = reports.id.indexOf(id);
        // const reportInfo = formsKeys.reduce((newReport, info)=>{
        //     newReport[info] = reports[info][idx];
        //     return newReport;
        // },{});
        // return reportInfo;
    }

    static getReportById(id){
        return fs.readFile('./databases/report.json','utf-8')
        .then((data)=>{
            return this.#getReportById(data, id);
        })
        .catch(console.error);
    }

    // id와 date에 일치하는 reports 반환
    static getReportByDate(id,date){
        const reports = this.getReportById(id).then(result =>{
            var year = date.split('/')[0];
            var month = date.split('/')[1];
            var idx = 0;
            result.forEach(function(obj){
                if(obj.date.split('/')[0] != year || obj.date.split('/')[1] !=month){
                    delete result[idx];
                }
                idx++;
            })
            return result;
        })
        return reports;
    }

    // uuid로 report 찾기

    static #getReportByUUID(data, uuid){
        const reports = JSON.parse(data);
        const idx = reports.uuid.indexOf(uuid);
        const reportsKeys = Object.keys(reports);

        const report = reportsKeys.reduce((newReport, info)=>{
            newReport[info] = reports[info][idx];
            return newReport;
        },{});
        return report;
    }

    static getReportByUUID(uuid){
        return fs.readFile('./databases/report.json','utf-8')
        .then((data)=>{
            return this.#getReportByUUID(data, uuid);
        })
        .catch(console.error);
    }




    //보고서 저장
    static async save(report,activity_img,design_img){
        const reports = await this.getReports(true);
        var uuid = uuidv4();
        reports.uuid.push(uuid);
        reports.date.push(report.date);
        reports.id.push(report.id);
        reports.name.push(report.name);
        reports.older_name.push(report.older_name);
        reports.belong.push(report.belong);
        reports.activity_img.push(activity_img); // img 넣어야 함
        reports.design_img.push(design_img); // img 넣어야 함
        reports.report.push(report.report);
        fs.writeFile('./databases/report.json',JSON.stringify(reports))
        return {success : true, uuid : uuid};

    }

    static async delete(uuid, id){
        // const applyForms = await this.getApplyForms(true);
        const reports = await this.getReports(true);
    
        if(reports.uuid.includes(uuid)){
            const idx = reports.uuid.indexOf(uuid);
            if(id === reports.id[idx]){
                reports.uuid.splice(idx,1);
                reports.date.splice(idx,1);
                reports.id.splice(idx,1);
                reports.name.splice(idx,1);
                reports.older_name.splice(idx,1);
                reports.belong.splice(idx,1);
                reports.activity_img.splice(idx,1);
                reports.design_img.splice(idx,1);
                reports.report.splice(idx,1);
                fs.writeFile('./databases/report.json',JSON.stringify(reports))
                return{success:true};

            }else{
                return{success:false, msg:' 작성자 ID와 미일치 되어 삭제 실패'};
            }
        }
        return{success:false, msg:'삭제 실패'};
    }



}
module.exports = ReportStorage;