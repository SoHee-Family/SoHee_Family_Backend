const Storage = require("./matchingStorage");

class matching{
    constructor(body){
        this.body = body;
    }
async info(){
    const grand = await Storage.getgrandInfo();
    return grand;
} // id가 없는 경우 메시지 출력

async plus(id,older){
    console.log("plus")
    console.log(id,older)
    const response = await Storage.save(id,older);//입력받은 값을 넣은 변수를 grandstorage.save메서드에 태워 보내서 로직실행 후 넘겨받은값 변수에 저장
        return response;//프로미스로 반한된 값은 넘겨받는 시간이 오래걸려 나타나기에 await-async를 사용하여 값을 넘겨받아야함
}
async delete(){
    const client = this.body;
    try{const response = await Storage.del(client);//입력받은 값을 넣은 변수를 grandstorage.save메서드에 태워 보내서 로직실행 후 넘겨받은값 변수에 저장
        return response;}//프로미스로 반한된 값은 넘겨받는 시간이 오래걸려 나타나기에 await-async를 사용하여 값을 넘겨받아야함
    catch(err){
        console.log(err)
        const a = {success:false, msg:err};
        return a;
    }
}


}

module.exports = matching;