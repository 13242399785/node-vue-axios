var express=require('express');
var app=express();
var fs=require('fs');
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));//创建 application/x-www-form-urlencoded 编码解析

console.log("当前目录地址："+__dirname)
var mysql=require('mysql');
//连接数据库
var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'123456',
	database:'mydata'
});
connection.connect();
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });

var datas = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.get('/',function(req,res){
	// res.send('<h1 style="text-align:center;position:absolute;top:50%;color:red;">welcome to 首页!</h1>')
	res.send("欢迎来到首页!")
})

//显示列表
app.get('/listUsers',function(req,res){
	fs.readFile(__dirname+"/"+'user.json','utf8',function(err,data){
		console.log(data);
		console.log("reqquery:",req.body);
		res.end(data);
	})
})

//添加
app.get('/addUser',function(req,res){
	fs.readFile(__dirname+"/"+"user.json","utf8",(err,data) => {
		data=JSON.parse(data);
		data['user4']=datas['user4'];
		console.log(data);
		res.end(JSON.stringify(data))
	})
})

//删除
app.get('/deleteUser',(req,res)=>{
	fs.readFile(__dirname+'/'+'user.json','utf8',(err,data)=>{
		data=JSON.parse(data);
		delete data['user'+2];
		console.log(data);
		res.end(JSON.stringify(data));
	})
})
//根据id显示详情
app.get('/list/:id',(req,res)=>{
	fs.readFile(__dirname+"/"+'user.json','utf8',(err,data)=>{
		data=JSON.parse(data);
		var user=data['user'+req.params.id];
		console.log(user);
		res.end(JSON.stringify(user))
	})
})
// 注册
app.use('/register',(req,res)=>{
	let param=req.body;
	let sql="INSERT INTO user(id,usernames,password) VALUES(0,?,?)";
	let data=[param.usernames,param.password];
	console.log(data)
	connection.query(sql,data,function(error,results){
		results=JSON.stringify(results);
		results=JSON.parse(results);
		if(error) throw error;
		console.log(results)
	})
})
//登录
app.use('/login',(req,res)=>{
	let param=req.body;
	console.log(param);
	let sql='SELECT COUNT(*) AS TOTAL FROM user WHERE username=? and password=?'
	let data=[param.user,param.password];
	connection.query(sql, data,function (error, results) {
	  results=JSON.stringify(results);//去掉ROWdataPacket
	  results=JSON.parse(results);//转为json对象

	  console.log(results)
	  if (error) throw error;
	  console.log(results[0].total)
	  if(results[0].TOTAL==1){
	  	console.log("登录成功");
	  	res.send("登录成功!");	  	
	  }else if(results[0].TOTAL==0){
	  	console.log("登录失败");
	  	res.send("登录失败!")
	  }
	});	
})

//商品插入数据
app.use('/insertinfo',(req,res)=>{
	let param=req.body;
	let sql="INSERT INTO eat(id,time,fine,remark) VALUES(0,?,?,?)";
	let data=[param.time,param.fine,param.remark];
	console.log(data)
	connection.query(sql,data,function(error,results){
		results=JSON.stringify(results);
		results=JSON.parse(results);
		if(error) throw error;
		console.log(results.affectedRows)
		if(results.affectedRows>0){
			res.send('ok')
		}else{
			res.send('err')
		}
	})
})

//列表
app.use('/listshow',(req,res)=>{
	let sql="SELECT * FROM eat ORDER BY time desc";
	connection.query(sql,function(error,results){
		results=JSON.stringify(results);
		results=JSON.parse(results);
		if(error) throw error;
		console.log(results)		
		if(results.length){
			console.log('数据连接成功')
			res.send(results)
		}else{
			res.send('err')
		}
	})	
})

//修改数据
app.use('/updateinfo',(req,res)=>{
	let param=req.body;
	let sql="UPDATE eat SET fine=?,remark=? WHERE Id=?";
	console.log(param)
	let data=[param.fine,param.remark,param.Id];
	connection.query(sql,data,function(error,results){
		results=JSON.stringify(results);
		results=JSON.parse(results);
		if(error) throw error;
		console.log(results.affectedRows)
		if(results.affectedRows>0){
			res.send('ok')
		}else{
			res.send('err')
		}
	})
})

//删除数据
app.use('/deleteinfo',(req,res)=>{
	let param=req.query;
	let sql="DELETE FROM eat WHERE Id in(?)";//删除多个用in() 单个用=
	let data=[param.Id];
	console.log(param)
	// console.log(param.length)
	connection.query(sql,data,function(err,results){
		results=JSON.stringify(results);
		results=JSON.parse(results);
		if(err) throw err;
		console.log(results.affectedRows);
		if(results.affectedRows>0){
			res.send('ok');
		}else{
			res.send('err')
		}
	})
})

var server=app.listen(8888,function(data){
	var host=server.address().address;
	var port=server.address().port;
	// console.log(server)
	console.log("访问地址：http://%s:%s",'192.168.5.147',port)
}) 