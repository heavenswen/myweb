//mysql 查询 
var UserSQL = {
    //模版语句
    insert:'INSERT INTO User(uid,userName) VALUES(?,?)', 
    //查询 user
    queryAll:'SELECT * FROM User',  
    //获得uid
    getUserById:'SELECT * FROM User WHERE uid = ? ',
  };
  
module.exports = UserSQL;
