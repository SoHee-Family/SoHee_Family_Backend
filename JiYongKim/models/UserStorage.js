"use strict";

// users.json 을 읽기 위해 fs 불러오기 (file system)
const fs = require("fs").promises;

class UserStorage {
  static #getUserInfo(data, id) { // #~ : 은닉화
    const users = JSON.parse(data); // json 형태로 data 만들기

    const idx = users.id.indexOf(id); // users의 id에서 파라미터로 넘겨준 id & indexOf => 파라미터로 받은 값의 인덱스 번호를 반환
    const usersKeys = Object.keys(users); // uesrs의 키 값들만 받아오기 => [id, psword, name]
    
    // console.log("idx ="+idx);
    // console.log("usersKeys ="+usersKeys);
    
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx]; //users의 key값과 idx(id)를 newUser의 key값에 넣음 (이제 이해했음)
      return newUser;
    }, {});

    return userInfo;
  }
  // 은닉화 된 데이터를 반환
  static getUserInfo(id) {
    return fs

      .readFile('./databases/user.json','utf-8') // users.json 읽기
      .then((data) => {
        return this.#getUserInfo(data, id);
      }) // data를 받아서 은닉화된 메소드 반환
      .catch(console.error);
  } // 에러 발생 시 콘솔에 출력


  static #getUsers(data, isAll, fields){
    const users = JSON.parse(data);
    if(isAll) return users;
    const newUsers= fields.reduce((newUsers,field)=>{
        if(users.hasOwnProperty(field)){
            newUsers[field]=users[field];
        }
        return newUsers;
    },{});
    return newUsers;
}


static getUsers(isAll,...fields){//인자를 여러개 받아올 수 있다.
    return fs.readFile("./databases/user.json",'utf-8')
    .then((data)=>{
        return this.#getUsers(data,isAll,fields);
    })
    .catch(console.error);

}


  // 회원 정보를 저장하는 메소드
  static async save(userInfo){
    const users = await this.getUsers(true);
    console.log("유저"+users);
    //데이터 추가
    if(users.id.includes(userInfo.id)){
        return {success: false, msg : "이미 존재하는 id 입니다."}
    }
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.psword.push(userInfo.psword);
    users.tel.push(userInfo.tel);
    users.region.push(userInfo.region);
    users.belong.push(userInfo.belong);
    fs.writeFile("./databases/user.json",JSON.stringify(users));
    return {success:true};
}


}

module.exports = UserStorage; // 외부에서 사용할 수 있도록 외부로 내보내기

// readFile => promise 지원
// promise => 수행하는 동작이 끝남과 동시에 상태를 알려줌
// promise 반환 => then 메소드 접근 가능