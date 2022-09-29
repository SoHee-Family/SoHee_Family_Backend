"use strict";

// users.json 을 읽기 위해 fs 불러오기 (file system)
const fs = require("fs").promises;

class UserStorage {
  static #getUserInfo(data, id) { // #~ : 은닉화
    const users = JSON.parse(data); // json 형태로 data 만들기

    const idx = users.id.indexOf(id); // users의 id에서 파라미터로 넘겨준 id & indexOf => 파라미터로 받은 값의 인덱스 번호를 반환
    const usersKeys = Object.keys(users); // uesrs의 키 값들만 받아오기 => [id, psword, name]
    
    console.log("idx ="+idx);
    console.log("usersKeys ="+usersKeys);
    
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx]; //users의 key값과 idx(id)를 newUser의 key값에 넣음 (이제 이해했음)
      return newUser;
    }, {});

    return userInfo;
  }

  static getUsers(...fields) { // fields에 파라미터로 넘긴 데이터들이 배열로 들어옴
  // const users = this.#users;
  const newUsers = fields.reduce((newUsers,field) => {
    if (users.hasOwnProperty(field)) { // users에 해당 key값(field)가 있는지 확인
      newUsers[field] = users[field]
    } 
    return newUsers; 
    }, {}); // users의 key값이 빈 오브젝트 안에 들어감
  return newUsers;
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

  // 회원 정보를 저장하는 메소드
  static save(userInfo) {
    // const users = this.#users;
    users.id.push(userInfo.id); // 파라미터로 넘어온 데이터의 id를 id에 저장
    users.name.push(userInfo.name); // 이하 생략
    users.paword.push(userInfo.paword); // 이하 생략
    return {success: true}; // success = true 오브젝트
  }
}

module.exports = UserStorage; // 외부에서 사용할 수 있도록 외부로 내보내기

// readFile => promise 지원
// promise => 수행하는 동작이 끝남과 동시에 상태를 알려줌
// promise 반환 => then 메소드 접근 가능