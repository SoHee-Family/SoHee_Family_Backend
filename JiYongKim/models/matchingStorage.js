"use strict";
const User = require('../models/User');

// users.json 을 읽기 위해 fs 불러오기 (file system)
const fs = require("fs").promises;

class matchingStorage {
  static getgrandInfo() {
    return fs
      .readFile('./databases/matching.json','utf-8') // info.json 읽기
      .then((data) => {
        const users = JSON.parse(data); // json 형태로 data 만들
        return users;
      }) // data를 받아서 은닉화된 메소드 반환
      .catch(console.error);
  } // 에러 발생 시 콘솔에 출력


  static #getinfo(data, isAll, fields){
    const info = JSON.parse(data);
    if(isAll) return info;
    const newinfo= fields.reduce((newinfo,field)=>{
        if(info.hasOwnProperty(field)){
            newinfo[field]=info[field];
        }
        return newinfo;
    },{});
    return newinfo;
}


static getinfo(isAll,...fields){//인자를 여러개 받아올 수 있다.
    return fs.readFile("./databases/matching.json",'utf-8')
    .then((data)=>{
        return this.#getinfo(data,isAll,fields);
    })
    .catch(console.error);

}


  // 회원 정보를 저장하는 메소드
  static async save(id,Older){
    console.log("save")
    const user = new User();
    const info = await user.getuserinfo(id);
    console.log("info : "+info)
    const matchinginfo = await this.getinfo(true);
    console.log("matchinginfo:"+matchinginfo)
    //데이터 추가
    matchinginfo.id.push(info.id);
    matchinginfo.name.push(info.name);
    matchinginfo.belong.push(info.belong);
    matchinginfo.older.push(Older);
    
    console.log("matchinginfo:"+matchinginfo.id,matchinginfo.older)
    fs.writeFile("./databases/matching.json",JSON.stringify(matchinginfo));
    return {success:true};
}
static async del(Idx){
  const info = await this.getinfo(true);
  info.id.splice(Idx.delidx,1);
  info.name.splice(Idx.delidx,1);
  info.belong.splice(Idx.delidx,1);
  info.older.splice(Idx.delidx,1);
  fs.writeFile("./databases/matching.json",JSON.stringify(info));
  return {success:true};
}
//유저 아이디로 회원정보 가져오기
static #getuserinfo(data, id){
    const forms = JSON.parse(data);
    const idx = forms.id.indexOf(id);
    const formsKeys = Object.keys(forms);

    const applyFormInfo = formsKeys.reduce((newForm, info)=>{
        newForm[info] = forms[info][idx];
        return newForm;
    }, {});
    return applyFormInfo;
}

static getuserinfo(id){
    return fs
    .readFile('./databases/applyForm.json','utf-8')
    .then((data)=>{
        return this.#getuserinfo(data, id);
    })
    .catch(console.error);
}


// 요상해서 하나 더 만들어 봄
static #getuserInfo2(data, id){
  const forms = JSON.parse(data);
  const idx = forms.id.indexOf(id);
  const formsKeys = Object.keys(forms);

  const applyFormInfo = formsKeys.reduce((newForm, info)=>{
      newForm[info] = forms[info][idx];
      return newForm;
  }, {});
  return applyFormInfo;
}

static getuserInfo2(id){
  return fs
  .readFile('./databases/matching.json','utf-8')
  .then((data)=>{
      return this.#getuserInfo2(data, id);
  })
  .catch(console.error);



}
}
module.exports = matchingStorage; // 외부에서 사용할 수 있도록 외부로 내보내기

// readFile => promise 지원
// promise => 수행하는 동작이 끝남과 동시에 상태를 알려줌
// promise 반환 => then 메소드 접근 가능