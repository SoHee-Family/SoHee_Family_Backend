"use strict";

// users.json 을 읽기 위해 fs 불러오기 (file system)
const fs = require("fs").promises;

class grandStorage {
  static getgrandInfo() {
    return fs
      .readFile('./databases/grand.json','utf-8') // grands.json 읽기
      .then((data) => {
        const users = JSON.parse(data); // json 형태로 data 만들
        return users;
      }) // data를 받아서 은닉화된 메소드 반환
      .catch(console.error);
  } // 에러 발생 시 콘솔에 출력


  static #getgrands(data, isAll, fields){
    const grands = JSON.parse(data);
    if(isAll) return grands;
    const newgrands= fields.reduce((newgrands,field)=>{
        if(grands.hasOwnProperty(field)){
            newgrands[field]=grands[field];
        }
        return newgrands;
    },{});
    return newgrands;
}


static getgrands(isAll,...fields){//인자를 여러개 받아올 수 있다.
    return fs.readFile("./databases/grand.json",'utf-8')
    .then((data)=>{
        return this.#getgrands(data,isAll,fields);
    })
    .catch(console.error);

}


  // 회원 정보를 저장하는 메소드
  static async save(grandInfo){
    const grands = await this.getgrands(true);
    //데이터 추가
    grands.name.push(grandInfo.name);
    grands.address.push(grandInfo.address);
    grands.specialNote.push(grandInfo.specialNote);
    grands.matching.push("없음");
    fs.writeFile("./databases/grand.json",JSON.stringify(grands));
    return {success:true};
}
static async del(grandIdx){
  const grands = await this.getgrands(true);
  console.log("3: "+grandIdx.delidx)
  grands.name.splice(grandIdx.delidx,1);
  grands.address.splice(grandIdx.delidx,1);
  grands.specialNote.splice(grandIdx.delidx,1);
  grands.matching.splice(grandIdx.delidx,1);
  fs.writeFile("./databases/grand.json",JSON.stringify(grands));
  return {success:true};
}
static async matching(grandIdx){
  const grands = await this.getgrands(true);
  //데이터 추가
  grands.matching[grandIdx]="매칭완료"
  fs.writeFile("./databases/grand.json",JSON.stringify(grands));
  return {success:true};
}

}

module.exports = grandStorage; // 외부에서 사용할 수 있도록 외부로 내보내기

// readFile => promise 지원
// promise => 수행하는 동작이 끝남과 동시에 상태를 알려줌
// promise 반환 => then 메소드 접근 가능