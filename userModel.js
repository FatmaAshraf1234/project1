class User {
    constructor(name,email,password){
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
//قاعده بيانات مؤقته بدل الداتا بيز
const users = [];

module.exports = {User, users};