const sql = require('mssql');
// sql驗證
const config = {
  user: 'mikey', //使用者的帳號
  password: '123', //密碼
  server: 'localhost',
  database: 'testdb', //db
  options: {
    trustServerCertificate: true
  }
};
// 暫存表#mikeyTable，無論user有沒有create權限都可以建立，但一斷線就會消失
let str1 = "create table #mikeyTable(orderID int,productN nvarchar(255),price int,num int);";
str1 += "insert into #mikeyTable values(12,'三大名著',500,1);";
str1 += "select * from #mikeyTable;";
sql.connect(config).then(pool => {
  return pool.request()
    .query(str1);
  // 如果你有讓user有insert item表的權限可以這樣
  // .query("insert into item values('草莓',900,'大湖草莓');");
}).then(result => {
  console.log(result.recordset);
}).catch(err => {
  console.error('SQL 錯誤:', err);
});


