"user strict"

const fs = require('fs').promises;

class ApplyFormStorage{

    // 모든 신청서 반환
    static #getApplyForm(data, isAll, fields){
        const forms = JSON.parse(data);
        if(isAll) return forms;
        const newForms = fields.reduce((newForms, field) =>{
            if(forms.hasOwnProperty(field)){
                newForms[field] = forms[field];
            }
            return newForms;
        },{});
        return newForms;
    }

    static getApplyForms(isAll,...fields){
        return fs.readFile("./databases/applyForm.json",'utf-8')
        .then((data)=>{
            return this.#getApplyForm(data,isAll,fields);
        })
        .catch(console.error);
    }

    // 유저 신청서 저장
    static async save(applyForm){
        const applyForms = await this.getApplyForms(true);
        if(applyForms.id.includes(applyForm.id)){
            return{success : false, msg : "이미 신청서를 작성한 id 입니다."}
        }
        // success logic
        applyForms.id.push(applyForm.id);
        applyForms.name.push(applyForm.name);
        applyForms.tel.push(applyForm.tel);
        applyForms.address.push(applyForm.address);
        applyForms.motive.push(applyForm.motive);
        applyForms.status.push(null);
        fs.writeFile("./databases/applyForm.json",JSON.stringify(applyForms));
        return{success:true};
    }

    // 유저 id로 작성된 신청서 반환
    static #getApplyFormById(data, id){
        const forms = JSON.parse(data);
        const idx = forms.id.indexOf(id);
        const formsKeys = Object.keys(forms);

        const applyFormInfo = formsKeys.reduce((newForm, info)=>{
            newForm[info] = forms[info][idx];
            return newForm;
        }, {});
        return applyFormInfo;
    }

    static getApplyFormById(id){
        return fs
        .readFile('./databases/applyForm.json','utf-8')
        .then((data)=>{
            return this.#getApplyFormById(data, id);
        })
        .catch(console.error);
    }

    //유저 id로 신청서 삭제
    static async delete(id){
        const applyForms = await this.getApplyForms(true);
console.log("아이디"+id)
        if(applyForms.id.includes(id)){
            const idx = applyForms.id.indexOf(id);
            applyForms.id.splice(idx,1);
            applyForms.name.splice(idx,1);
            applyForms.tel.splice(idx,1);
            applyForms.address.splice(idx,1);
            applyForms.motive.splice(idx,1);
            applyForms.status.splice(idx,1);
            fs.writeFile("./databases/applyForm.json",JSON.stringify(applyForms));
            return{success:true};
        
        }
        return{success:false, msg:'삭제 실패'};

    }

    static async matching(id){
        const applyForms = await this.getApplyForms(true);
        const idx = applyForms.id.indexOf(id)
        applyForms.status[idx]=true;
        fs.writeFile("./databases/applyForm.json",JSON.stringify(applyForms));
        return{success:true};
    }
    static async matchingcf(id){
        const applyForms = await this.getApplyForms(true);
        console.log(applyForms)
        const idx = applyForms.id.indexOf(id);
        console.log("idx : fsa"+idx)
        applyForms.status[idx]=false;
        fs.writeFile("./databases/applyForm.json",JSON.stringify(applyForms));
        return{success:true};
    }
}
module.exports = ApplyFormStorage;