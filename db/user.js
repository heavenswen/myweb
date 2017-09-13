//mysql 查询 
var UserSQL = {
    //添加语句
    insert:'INSERT INTO User(uid,userName) VALUES(?,?)', 
    //查询 user
    queryAll:'SELECT * FROM User',  
    //查询uid
    getUserById:'SELECT * FROM User WHERE uid = ? ',
  };
  
module.exports = UserSQL;
