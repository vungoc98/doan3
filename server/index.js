const express = require("express");
const jsonParser = require("body-parser").json();
const mysql = require("mysql"); 
const sessionStorage = require('node-sessionstorage');
 
var session = require("express-session");
var cookieParser = require('cookie-parser');
var app = express();
 
// Ket noi nodejs voi mysql
var con = mysql.createConnection({
	database: 'doan3',
	host: 'localhost',
	user: 'root',
	password: '123456'
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected");
});
  
var login; // ket qua tra ve cho client

// do cong angular va server khac nhau nen phai dung cai nay
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});

app.listen(3000, () => console.log("Server is running"));
 
// Xu ly thong tin dang nhap
app.post('/login', jsonParser, (req, res) => {
	var sql = "select * from user where username = ? and password = ?";
	
	sql = mysql.format(sql, [req.body.name, req.body.password]);
	 
	con.query(sql, function(err, results) {
		if (err) throw err; 
		if (results.length == 0) {
			this.login = new Login(check = 0);
		}
		for (var i = 0; i < results.length; i++) {
			this.login = new Login(1, results[i].username, results[i].password, results[i].name, results[i].address, results[i].email, results[i].mobile, results[i].acount_type);	 
		}
		res.send(this.login);
	})
   
});

// Cap nhat thong tin tai khoan
app.post('/updateAcount', jsonParser, (req, res) => {
	// ngay hien tai => tuong duong voi ngay cap nhat thong tin
	var update_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
	var message; // thong bao ket qua cap nhat
	var sql = "update user set name = ?, address = ?, email = ?, mobile = ?, update_date = ? where username = ?";
	sql = mysql.format(sql, [req.body.name, req.body.address, req.body.email, req.body.mobile, update_date, req.body.username]);
	console.log(sql);
	con.query(sql, function(err, results) {
		if (err) {
			message = "Error";
			res.send(message);
			throw err;
		}
		message = "Thay đổi thành công";
		res.send(message);
	})
});

// Thay doi mat khau tai khoan
app.post('/changePassword', jsonParser, (req, res) => {
	// ngay hien tai => tuong duong voi ngay cap nhat thong tin
	var update_date =(new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
	var sql = "update user set password = ?, update_date = ? where username = ?"; 
	sql = mysql.format(sql, [req.body.newPassword, update_date, req.body.username]);
	con.query(sql, function(err, results) {
		if (err) {
			message = "Error";
			res.send(message);
			throw err;
		}
		message = "Thay đổi thành công";
		res.send(message);
	})
})

// Lay nhom nguoi dung
app.get('/getAcount_Type', (req, res) => {
	var sql = "select distinct acount_type from user where acount_type != ?";
	sql = mysql.format(sql, 'Nhà phân phối');
	con.query(sql, function(err, results) {
		if (err) throw err;
		res.send(results); 
	})
})

// Dang ky tai khoan
app.post('/register', jsonParser, (req, res) => {
	// kiem tra co trung ten tai khoan? co thong bao loi, khong chen vao co so du lieu
	var sql = "select * from user where username = ?"; 
	sql = mysql.format(sql, [req.body.username]);
	
	con.query(sql, function(err, results) {
		if (err) throw err;

		// Trung ten tai khoan => thong bao loi
		if (results.length != 0) {
			this.login = new Login(check = 0);
			res.send(this.login);
		}

		// Chen vao co so du lieu
		else {
			// ngay hien tai => tuong duong voi ngay tao thong tin
			var create_date= (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
			// sinh ma code ngau nhien cho nguoi dung
			var rdmCode = "";
		    for( ; rdmCode.length < 6; rdmCode  += Math.random().toString(36).substr(2));
		    var code = rdmCode.substr(0, 6);
			console.log(code);

			sql = "insert into user(username, password, name, address, email, mobile, acount_type, image, dele, status, code, create_date) value(?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?)";
			sql = mysql.format(sql, [req.body.username, req.body.password, req.body.name, req.body.address, req.body.email, req.body.mobile, req.body.acount_type, req.body.image, 0, 0, code, create_date]);
			
			con.query(sql, function(err, results) {
				if (err) throw err;
				sql = "select * from user where username = ? and password = ?"; 
				sql = mysql.format(sql, [req.body.username, req.body.password]);
				con.query(sql, function(err, results) {
					if (err) throw err;  
					this.login = new Login(1, results[0].username, results[0].password, results[0].name, results[0].address, results[0].email, results[0].mobile, results[0].acount_type);	 
					res.send(this.login);
				})
			})
		}
		 
	}) 
})
 

// Lay thong tin tai khoan khi nguoi dung reload lai page
app.post('/getAcountInfo', jsonParser, (req, res) => {
	var sql = "select * from user where username = ?";
	
	sql = mysql.format(sql, [req.body.username]);
	 
	con.query(sql, function(err, results) {
		if (err) throw err; 
		if (results.length == 0) {
			this.login = new Login(check = 0);
		}
		for (var i = 0; i < results.length; i++) {
			this.login = new Login(1, results[i].username, results[i].password, results[i].name, results[i].address, results[i].email, results[i].mobile, results[i].acount_type);	 
		} 
		 
		res.send(this.login);
	})
})

// I. NHA PHAN PHOI
// 1. He thong san pham
// 1.1. Tao moi san pham

// Lay nhom san pham
app.get('/getProduct_Type', (req, res) => {
	var sql = "select name from product_category";

	con.query(sql, function(err, results) {
		if (err) throw err;
		res.send(results);
	});
})

class Login {
	constructor(check, username, password, name, address, email, mobile, acount_type) {
		this.check = check; // kiem tra thong tin tai khoan dang nhap dung hay sai (1: dung, 0: sai)
		this.username = username;
		this.password = password;
		this.name = name;
		this.address = address;
		this.email = email;
		this.mobile = mobile;
		this.acount_type = acount_type;
	}
}

// Tao moi san pham
app.post('/createProduct', jsonParser, (req, res) => {
	// ngay hien tai => tuong duong voi ngay tao thong tin
	var create_date= (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
	var product_category_id;
	// Tim product_category_id 
	var sql = "select id from product_category where name = ?";
	sql = mysql.format(sql, [req.body.product_type]); 
	con.query(sql, function(err, results) {
		if (err) {
			res.send("0");
			throw err;
		}
		product_category_id = results[0].id;
		console.log("id: " + product_category_id);
		// sinh ma code ngau nhien cho san pham
		var rdmCode = "";
	    for( ; rdmCode.length < 6; rdmCode  += Math.random().toString(36).substr(2));
	    var code = "PRODUCT_" + rdmCode.substr(0, 6);

		var sql = "insert into product(code, name, price, description, image, dele, product_category_id, create_date) values(?, ?, ?, ?, ?, ?, ?, ?)";
		sql = mysql.format(sql, [code, req.body.name, req.body.price, req.body.description, req.body.image, 0, product_category_id, create_date]);
		 
		con.query(sql, function(err, results) {
			if (err) {
				res.send("0");
				throw err;
			}
			 
			res.send("1");
		})
	}) 
})

// 1.2. Hien thi danh sach san pham

let product = require('./product.js'); // Lop Product
products = new Array(); // Mang chua cac san pham
app.get('/getMenuProduct', (req, res) => {
	products.splice(0, products.length);
	var sql = `select id, code, name, price, description, image, product_category_id, date_format(create_date, '%d-%m-%Y') as create_date, 
	date_format(update_date, '%d-%m-%Y') as update_date from product where dele = 0`;
	con.query(sql, function(err, results) {
		//console.log("r: " + results);
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			products[i] = new product(results[i].id, results[i].code, results[i].name, results[i].price, results[i].description,
				results[i].image, results[i].product_category_id, results[i].create_date, results[i].update_date);
			//console.log(products);
		}  
		res.send(products);
	})
})

// 1.3. Tim kiem san pham
app.post('/searchProduct', jsonParser, (req, res) => {
	products.splice(0, products.length);
	// console.log(req.body);
	var sql;
	// tim kiem chi theo ten san pham
	if (req.body.name !="" && req.body.code == "" && req.body.product_category_name == "") {
		sql = `select product.id, code, product.name, price, product.description, image, product_category_id, 
		date_format(product.create_date, '%d-%m-%Y') as create_date, date_format(product.update_date, '%d-%m-%Y') as update_date 
		from product where name like ? and dele = 0`;
		sql = mysql.format(sql, "%" + req.body.name + "%");
	}
	else if (req.body.name =="" && req.body.code != "" && req.body.product_category_name == "") {
		sql = `select product.id, code, product.name, price, product.description, image, product_category_id, 
		date_format(product.create_date, '%d-%m-%Y') as create_date, date_format(product.update_date, '%d-%m-%Y') as update_date 
		from product where code like ? and dele = 0`;
		sql = mysql.format(sql, "%" + req.body.code + "%");
	}
	else if (req.body.name =="" && req.body.code == "" && req.body.product_category_name != "") {
		sql = `select product.id, code, product.name, price, product.description, image, product_category_id, 
		 date_format(product.create_date, '%d-%m-%Y') as create_date, date_format(product.update_date, '%d-%m-%Y') as update_date 
		 from product, product_category where product_category_id = product_category.id and product_category.name = ? and product.dele = 0`;
		sql = mysql.format(sql, req.body.product_category_name);
	}
	// tim kiem theo 2 thu
	else if (req.body.name !="" && req.body.code != "" && req.body.product_category_name == "") {
		sql = `select product.id, code, product.name, price, product.description, image, product_category_id, 
		 date_format(product.create_date, '%d-%m-%Y') as create_date, date_format(product.update_date, '%d-%m-%Y') as update_date 
		 from product where name = ? and code = ? and dele = 0`;
		sql = mysql.format(sql, [req.body.name, req.body.code]);
	}
	else if (req.body.name !="" && req.body.code == "" && req.body.product_category_name != "") {
		sql = `select product.id, code, product.name, price, product.description, image, product_category_id, 
		 date_format(product.create_date, '%d-%m-%Y') as create_date, date_format(product.update_date, '%d-%m-%Y') as update_date 
		 from product, product_category where product_category_id = product_category.id and product.name like ? and product_category.name = ? and product.dele  = 0`;
		sql = mysql.format(sql, ["%" + req.body.name + "%", req.body.product_category_name]);
	}
	else if (req.body.name =="" && req.body.code != "" && req.body.product_category_name != "") {
		sql = `select product.id, code, product.name, price, product.description, image, product_category_id, 
		 date_format(product.create_date, '%d-%m-%Y') as create_date, date_format(product.update_date, '%d-%m-%Y') as update_date	
		 from product, product_category where product_category_id = product_category.id and code like ? and product_category.name = ? and product.dele = 0`;
		sql = mysql.format(sql, ["%" + req.body.code + "%", req.body.product_category_name]);
	}
	// ca 3 thu deu rong => hien thi tat ca danh sach
	else if (req.body.name =="" && req.body.code == "" && req.body.product_category_name == ""){
		sql = `select product.id, code, product.name, price, product.description, image, product_category_id, 
		 date_format(product.create_date, '%d-%m-%Y') as create_date, date_format(product.update_date, '%d-%m-%Y') as update_date
		 from product where dele = 0`;
	}
	// tim kiem theo ca 3 thu
	else {
		sql = `select product.id, code, product.name, price, product.description, image, product_category_id, 
		 date_format(product.create_date, '%d-%m-%Y') as create_date, date_format(product.update_date, '%d-%m-%Y') as update_date
		 from product, product_category 
		 where product_category_id = product_category.id and product.name = ? and code = ? and product_category.name = ? and product.dele = 0`;
		sql = mysql.format(sql, [req.body.name, req.body.code, req.body.product_category_name]);
	}
	// console.log(sql);
	con.query(sql, function(err, results) {
		//console.log("r: " + results);
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			products[i] = new product(results[i].id, results[i].code, results[i].name, results[i].price, results[i].description,
				results[i].image, results[i].product_category_id, results[i].create_date, results[i].update_date); 
		}
		res.send(products);
	})
	 
})

// 1.4. Cap nhat thong tin san pham
// Lay thong tin san pham can cap nhat
app.post('/getProductInfo', jsonParser, (req, res) => {  
	var sql = `select product.name, price, image, product.description, product_category.name as product_type 
	from product, product_category where product.id = ?
		and product_category_id = product_category.id`;
	sql = mysql.format(sql, req.body.id);
	console.log(sql);
	con.query(sql, function(err, results) {
		if (err) throw err; 
		res.send(results);
	})
})

// Cap nhat thong tin san pham
app.post('/updateProduct', jsonParser, (req, res) => {
	var product_category_id;
	// Tim product_category_id 
	var sql = "select id from product_category where name = ?";
	sql = mysql.format(sql, [req.body.product_type]);
	console.log("sql: " + sql);
	con.query(sql, function(err, results) {
		if (err) {
			res.send("0");
			throw err;
		}

		product_category_id = results[0].id; 
		// ngay hien tai => tuong duong voi ngay cap nhat thong tin
		var update_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate());
		 
		var sql = "update product set name = ?, price = ?, description = ?, image = ?, product_category_id = ?, update_date = ? where id = ?";
		sql = mysql.format(sql, [req.body.name, req.body.price, req.body.description, req.body.image, product_category_id, update_date, req.body.id]);
	 	console.log(sql);
		con.query(sql, function(err, results) {
			if (err) {
				res.send("0");
				throw err;
			}
			 
			res.send("1");
		})
	}) 
})

// 1.5. Hien thi danh sach nhom san pham 
let product_category = require('./product_category.js'); // Lop Product
product_categorys = new Array(); // Mang chua cac san pham
app.get('/getMenuProduct_Category', (req, res) => { 
	product_categorys.splice(0, products.length);
	var sql = `select id, name, description, date_format(create_date, '%d-%m-%Y') as create_date, date_format(update_date, '%d-%m-%Y') as  update_date 
	from product_category where dele = 0`;
	con.query(sql, function(err, results) { 
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			product_categorys[i] = new product_category(results[i].id, results[i].name, results[i].description, results[i].create_date, results[i].update_date);
		}
		res.send(product_categorys);
	})
})

// 1.6. Tao moi nhom san pham
app.post('/createProduct_Category', jsonParser, (req, res) => { 
	// ngay hien tai => tuong duong voi ngay tao thong tin
	var create_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
	product_categorys.splice(0, products.length);
	var sql = "insert into product_category(name, description, dele, create_date) values(?, ?, ?, ?)";
	sql = mysql.format(sql, [req.body.name, req.body.description, 0, create_date]);
	con.query(sql, function(err, results) {
		if (err) throw err;
		var sql = `select id, name, description, date_format(create_date, '%d-%m-%Y') as create_date, date_format(update_date, '%d-%m-%Y') as  update_date 
	from product_category`;
		con.query(sql, function(err, results) { 
			if (err) throw err;
			for(var i = 0; i < results.length; i++) {
				product_categorys[i] = new product_category(results[i].id, results[i].name, results[i].description, results[i].create_date, results[i].update_date);
			}
			res.send(product_categorys);
		})
	})
})

// 1.7. Cap nhat thong tin nhom san pham
// Lay thong tin nhom san pham can cap nhat
app.post('/getProductCategoryInfo', jsonParser, (req, res) => {
	var sql = "select name, description from product_category where name = ?";
	sql = mysql.format(sql, req.body.name); 
	con.query(sql, function(err, results) {
		if (err) throw err;
		res.send(results);
	})
})

// Cap nhat thong tin nhom san pham
app.post('/updateProduct_Category', jsonParser, (req, res) => { 
	// ngay hien tai => tuong duong voi ngay cap nhat thong tin
	var update_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
	 
	var sql = "update product_category set description = ?, update_date = ? where name = ?";
	sql = mysql.format(sql, [req.body.description, update_date, req.body.name]); 
	con.query(sql, function(err, results) {
		if (err) {
			res.send("0");
			throw err;
		}
		 
		res.send("1");
	}) 
})

// 2. He thong kho hang

// 2.1. Tao moi kho hang 
app.post('/createContainer', jsonParser, (req, res) => { 
	// ngay hien tai => tuong duong voi ngay tao thong tin
	var create_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
	// sinh ma code ngau nhien cho kho hang
	var rdmCode = "";
	for( ; rdmCode.length < 6; rdmCode  += Math.random().toString(36).substr(2));
	var code = "CONTAINER_" + rdmCode.substr(0, 6);

	var sql = "insert into container(code, name, address, dele, mobile, create_date) values(?, ?, ?, ?, ?, ?)";
	sql = mysql.format(sql, [code, req.body.name, req.body.address, 0, req.body.mobile, create_date]); 
	con.query(sql, function(err, results) {
		if (err) {
			res.send("0");
			throw err;
		}
		 
		res.send("1");
	}) 
})

// 2.2. Lay danh sach kho hang 
let container = require('./container.js'); // Lop Product
containers = new Array(); // Mang chua cac san pham
app.get('/getMenuContainer', (req, res) => { 
	containers.splice(0, containers.length);
	var sql = `select id, code, name, address, dele, mobile, 
	date_format(create_date, '%d-%m-%Y') as create_date, date_format(update_date, '%d-%m-%Y') as update_date 
	from container where dele = 0`;
	con.query(sql, function(err, results) { 
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			containers[i] = new container(results[i].id, results[i].code, results[i].name, results[i].address,
			results[i].dele, results[i].mobile, results[i].create_date, results[i].update_date);
		}
		res.send(containers);
	})
})

// Tim kiem kho hang
app.post('/searchContainer', jsonParser, (req, res) => {
	containers.splice(0, containers.length);
	var sql;

	// chi tim kiem theo ten
	if (req.body.name.trim() != "" && req.body.code.trim() == "") {
		sql = `select id, code, name, address, dele, mobile, 
		date_format(create_date, '%d-%m-%Y') as create_date, date_format(update_date, '%d-%m-%Y') as update_date from container
		where name like ? and dele = 0`;
		sql = mysql.format(sql, ["%" + req.body.name.trim() + "%"]); 
	}

	// chi tim kiem theo code
	else if (req.body.name.trim() == "" && req.body.code.trim() != "") {
		sql = `select id, code, name, address, dele, mobile, 
		date_format(create_date, '%d-%m-%Y') as create_date, date_format(update_date, '%d-%m-%Y') as update_date from container
		where code like ? and dele = 0`; 
		sql = mysql.format(sql, ["%" + req.body.code.trim() + "%"]); 
	}

	// tim kiem theo ca ten va code
	else if (req.body.name.trim() != "" && req.body.code.trim() != "") {
		sql = `select id, code, name, address, dele, mobile, 
		date_format(create_date, '%d-%m-%Y') as create_date, date_format(update_date, '%d-%m-%Y') as update_date from container
		where name = ? or code = ? and dele = 0`;
		sql = mysql.format(sql, [req.body.name.trim(), req.body.code.trim()]); 
	}

	// name va code deu trong
	else {
		sql = `select id, code, name, address, dele, mobile, 
	date_format(create_date, '%d-%m-%Y') as create_date, date_format(update_date, '%d-%m-%Y') as update_date 
	from container where dele = 0`;
	}
	 
	con.query(sql, function(err, results) { 
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			containers[i] = new container(results[i].id, results[i].code, results[i].name, results[i].address,
			results[i].dele, results[i].mobile, results[i].create_date, results[i].update_date);
		}
		res.send(containers);
	})
})

// 2.3. Xem chi tiet kho hang id
// 2.3.1. Thong tin co ban
app.post('/getContainerInfo', jsonParser, (req, res) => {
	var sql = "select * from container where id = ?";
	sql = mysql.format(sql, req.body.id);
	con.query(sql, function(err, results) { 
		if (err) throw err;
		res.send(results);
	})
})

// Cap nhat thong tin kho hang
app.post('/updateContainerInfo', jsonParser, (req, res) => {
	// ngay hien tai => ngay cap nhat thong tin kho hang
	var update_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
	 
	var sql = "update container set address = ?, mobile = ?, update_date = ? where id = ?";
	sql = mysql.format(sql, [req.body.address, req.body.mobile, update_date, req.body.id]);
	con.query(sql, function(err, results) { 
		if (err) {
			res.send("0");
			throw err;
		} 
		res.send("1");
	})
})

// 2.3.2. Tinh trang kho hang
app.post('/statusContainer', jsonParser, (req, res) => {
	products.splice(0, products.length);
	var sql = `select distinct container_product_detail.id, product.code, user_id, product.name, amount, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date,
	 date_format(expiry_date, '%d-%m-%Y') as expiry_date from product, 
	 container_product_detail where product.id = container_product_detail.product_id and container_product_detail.container_id = ?`;
	sql = mysql.format(sql, req.body.id);
	con.query(sql, function(err, results) {
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			products[i] = new product(results[i].id, results[i].code, results[i].name, "", "", "", "", "", "",
			 results[i].amount, results[i].manufacturing_date, results[i].expiry_date, results[i].user_id); 
		} 
		res.send(products);
	})
})

// Lay id cua cac container khac (Phuc vu qua trinh chuyen hang hoa)
app.post('/getAnotherIdContainer', jsonParser, (req, res) => {
	var sql = "select id from container where id != ? and dele = 0";
	sql = mysql.format(sql, req.body.id);
	con.query(sql, function(err, results) {
		if (err) throw err;
		res.send(results);
	})
})

// Cap nhat thong tin chuyen kho
app.post('/moveProductInfo', jsonParser, (req, res) => {
	// ngay hien tai => tuong duong voi ngay cap nhat thong tin
	var update_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
	 
	/* Kiem tra hang hoa chuyen den da co trong kho dich chua
	* 1. Da co => Cap nhat lai so luong cua hang hoa o ca 2 kho
	* 2. Chua co => Them hang hoa vao kho dich va cap nhat hang hoa o kho nguon
	*/
	var sql = "select id, amount from container_product_detail where product_id = ? and container_id = ? and manufacturing_date = ? and expiry_date = ?";
	sql = mysql.format(sql, [req.body.product_id, req.body.container_to, req.body.manufacturing_date, req.body.expiry_date]);
	con.query(sql, function(err, results) {
		if (err) {
			res.send("0");
			throw err;
		}
		// Truong hop 1: San pham can chuyen da co trong kho dich
		if (results.length != 0) {
			// Cap nhat so luong cua kho dich
			sql = "update container_product_detail set amount = ?, update_date = ? where container_id = ? and product_id = ?";
			sql = mysql.format(sql, [(parseInt(req.body.amount) + parseInt(results[0].amount)), update_date, req.body.container_to, req.body.product_id]);
			con.query(sql, function(err, results) {
				if (err) {
					res.send("0");
					throw err;
				}
			})

			// Cap nhat so luong cua kho nguon
			sql = "update container_product_detail set amount = ?, update_date = ? where container_id = ? and product_id = ?";
			sql = mysql.format(sql, [(parseInt(req.body.amount_before) - parseInt(req.body.amount)), update_date, req.body.container_from, req.body.product_id]);
			con.query(sql, function(err, results) {
				if (err) {
					res.send("0");
					throw err;
				}
			})

			// Them thong tin vao bang container_product_log
			sql = `insert into container_product_log(container_from, container_to, product_id, amount, manufacturing_date, expiry_date, update_date) 
				values (?, ?, ?, ?, ?, ?, ?)`;
			sql = mysql.format(sql, [req.body.container_from, req.body.container_to, req.body.product_id, req.body.amount, req.body.manufacturing_date, req.body.expiry_date, update_date]);
			con.query(sql, function(err, results) {
				if (err) {
					res.send("0");
					throw err;
				}
				res.send("1");
			})
		}

		// Truong hop 2: San pham can chuyen chua co trong kho dich
		else {
			// Them thong tin san pham vao kho dich
			sql = "insert into container_product_detail(product_id, container_id, user_id, amount, manufacturing_date, expiry_date, update_date) values (?, ?, ?, ? ,? , ?, ?)";
			sql = mysql.format(sql, [req.body.product_id, req.body.container_to, req.body.user_id, req.body.amount, req.body.manufacturing_date, req.body.expiry_date, update_date]);
			con.query(sql, function(err, results) {
				if (err) {
					res.send("0");
					throw err;
				}
			})

			// Cap nhat so luong cua kho nguon
			sql = "update container_product_detail set amount = ?, update_date = ? where container_id = ? and product_id = ?";
			sql = mysql.format(sql, [(parseInt(req.body.amount_before) - parseInt(req.body.amount)), update_date, req.body.container_from, req.body.product_id]);
			con.query(sql, function(err, results) {
				if (err) {
					res.send("0");
					throw err;
				}
			})

			// Them thong tin vao bang container_product_log
			sql = `insert into container_product_log(container_from, container_to, product_id, amount, manufacturing_date, expiry_date, update_date) 
				values (?, ?, ?, ?, ?, ?, ?)`;
			sql = mysql.format(sql, [req.body.container_from, req.body.container_to, req.body.product_id, req.body.amount, req.body.manufacturing_date, req.body.expiry_date, update_date]);
			con.query(sql, function(err, results) {
				if (err) {
					res.send("0");
					throw err;
				}
				res.send("1");
			})
		}
	})
})

// Tim kiem san pham trong tab: Tinh trang kho hang
app.post('/searchProductStatusContainer', jsonParser, (req, res) => {
	products.splice(0, products.length);
	var sql; 

	// Tim kiem theo ca name va code
	if (req.body.name.trim() != "" && req.body.code.trim() != "") {
		sql = `select distinct product.id, product.code, user_id, product.name, amount, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date from product, 
	 container_product_detail where product.id = container_product_detail.product_id and container_product_detail.container_id = ? and product.name = ? and product.code = ?`;
		sql = mysql.format(sql, [req.body.id, req.body.name, req.body.code]);
	}

	// Chi tim kiem theo name
	else if (req.body.name.trim() != "" && req.body.code.trim() == "") {
		sql = `select distinct product.id, product.code, user_id, product.name, amount, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date from product, 
	 container_product_detail where product.id = container_product_detail.product_id and container_product_detail.container_id = ? and product.name like ?`;
		sql = mysql.format(sql, [req.body.id, "%" +  req.body.name + "%"]);
	}

	// Chi tim kiem theo code
	else if (req.body.name.trim() == "" && req.body.code.trim() != "") { 
		sql = `select distinct product.id, product.code, user_id, product.name, amount, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date from product, 
	 container_product_detail where product.id = container_product_detail.product_id and container_product_detail.container_id = ? and product.code like ?`;
		sql = mysql.format(sql, [req.body.id, "%" +  req.body.code + "%"]);
	}

	// name va code deu de trong
	else { 
		sql = `select distinct product.id, product.code, user_id, product.name, amount, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date from product, 
	 container_product_detail where product.id = container_product_detail.product_id and container_product_detail.container_id = ?`;
		sql = mysql.format(sql, [req.body.id]);
	}
 
	con.query(sql, function(err, results) {
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			products[i] = new product(results[i].id, results[i].code, results[i].name, "", "", "", "", "", "",
			 results[i].amount, results[i].manufacturing_date, results[i].expiry_date, results[i].user_id); 
		}
		res.send(products);
	})
})

// 2.3.3. Lich su kho hang
let container_log = require('./container_product_log.js');
containerLogs = new Array(); // Mang chua thong tin cua lich su kho hang

// Hien thi lich su kho hang
app.post('/getContainerLog', jsonParser, (req, res) => {
	containerLogs.splice(0, containerLogs.length);
	products.splice(0, products.length);
	var sql = `select distinct name, code, amount, container_from, container_to, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date, 
	 date_format(container_product_log.update_date, '%d-%m-%Y') as update_date from product, 
	 container_product_log where product.id = container_product_log.product_id and container_product_log.container_from = ?`;
	sql = mysql.format(sql, req.body.id); 
	con.query(sql, function(err, results) {
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			containerLogs[i] = new container_log("", results[i].container_from, results[i].container_to, "", results[i].amount,
				results[i].manufacturing_date, results[i].expiry_date, results[i].name, results[i].code, results[i].update_date); 
		}
		res.send(containerLogs);
	})
})

// Tim kiem san pham trong tab: Lich su kho hang
app.post('/searchProductContainerLog', jsonParser, (req, res) => {
	containerLogs.splice(0, containerLogs.length);
	products.splice(0, products.length);
	var sql;
	if (req.body.name.trim() != "" && req.body.code.trim() != "") {
		sql =  `select name, code, amount, container_from, container_to, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date , 
		 date_format(container_product_log.update_date, '%d-%m-%Y') as update_date from product,
	 container_product_log where product.id = container_product_log.product_id and container_product_log.container_from = ? and name = ? and code = ?`;
		sql = mysql.format(sql, [req.body.id, req.body.name.trim(), req.body.code.trim()]);
	}
	else if (req.body.name.trim() != "" && req.body.code.trim() == "") {
		sql =  `select name, code, amount, container_from, container_to, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date , 
		 date_format(container_product_log.update_date, '%d-%m-%Y') as update_date from product, 
	 container_product_log where product.id = container_product_log.product_id and container_product_log.container_from = ? and name like ?`;
		sql = mysql.format(sql, [req.body.id, "%" + req.body.name.trim() + "%"]);
	}
	else if (req.body.name.trim() == "" && req.body.code.trim() != "") {
		sql =  `select name, code, amount, container_from, container_to, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date , 
		 date_format(container_product_log.update_date, '%d-%m-%Y') as update_date from product,
	 container_product_log where product.id = container_product_log.product_id and container_product_log.container_from = ? and code like ?`;
		sql = mysql.format(sql, [req.body.id, "%" + req.body.code.trim() + "%"]);
	}
	else {
		sql =  `select name, code, amount, container_from, container_to, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date, date_format(expiry_date, '%d-%m-%Y') as expiry_date , 
		 date_format(container_product_log.update_date, '%d-%m-%Y') as update_date from product, 
	 container_product_log where product.id = container_product_log.product_id and container_product_log.container_from = ?`;
		sql = mysql.format(sql, [req.body.id]);
	}
  
	con.query(sql, function(err, results) {
		if (err) throw err;
		for(var i = 0; i < results.length; i++) {
			containerLogs[i] = new container_log("", results[i].container_from, results[i].container_to, "", results[i].amount,
				results[i].manufacturing_date, results[i].expiry_date, results[i].name, results[i].code, results[i].update_date); 
		}
		res.send(containerLogs);
	})
})

// 2.3.4. Thong ke kho hang
thongke = require('./thong_ke.js');
var amount_from;
var amount_order;
var amount_to;
var amount_rest;
var array_product_TK = new Array();
// Xu ly bat dong bo trong cac cau truy van mysql - nodejs
const promisify = require("util").promisify; 
const queryPromise = promisify(con.query.bind(con)); 

async function thongKeKhoHang(id) { 
	// Kiem tra xem co phai kho tong hay khong
	var sql = "select name from container where id = ?";
	sql = mysql.format(sql, id);
	results = await queryPromise(sql);
	if (results[0].name == "Kho tổng") {
			sql = `select sum(amount_total) as amount_from from user, orders where orders.user_id = user.id and user.acount_type = ?`;
			sql = mysql.format(sql, ["Nhà cung cấp"]);  
	}
	else {
		sql = "select sum(amount) as amount_from from container_product_log where container_to = ?";
		sql = mysql.format(sql, id);
	}
	results = await queryPromise(sql);
	if (results[0].amount_from == null) amount_from = 0;
	else amount_from = results[0].amount_from;  

	sql = "select sum(amount) as amount_to from container_product_log where container_from = ?";
	sql = mysql.format(sql, id); 
	results = await queryPromise(sql); 
	if (results[0].amount_to== null) amount_to = 0;
	else amount_to = results[0].amount_to; 

	sql = "select sum(amount) as amount_rest from container_product_detail where container_id = ?";
	sql = mysql.format(sql, id);
	results = await queryPromise(sql);
	if (results[0].amount_rest == null) amount_rest = 0;
	else amount_rest = results[0].amount_rest;

	sql = `select product.code, product.name, product.image, sum(amount) as amount from container_product_detail,product 
	where container_id = ? and product_id = product.id and amount > 0 group by product_id`
	sql = mysql.format(sql, id);  
	results = await queryPromise(sql); 
	for (var i = 0; i < results.length; i++) {
		product_thongke = new product("", results[i].code, results[i].name, "", "", results[i].image, "", "", "")
		product_thongke.amount = results[i].amount;  
		array_product_TK[i] = product_thongke;
	} 
}

app.post('/thongKeKhoHang', jsonParser, async function(req, res) {
	// // Kiem tra xem co phai kho tong hay khong
	// var sql = "select name from container where id = ?";
	// sql = mysql.format(sql, req.body.id);
	// con.query(sql, function(err, results) {
	// 	if (err) throw err;
	// 	if (results[0].name == "Kho tổng") {
	// 		sql = `select sum(amount_total) as amount_from from user1, orders where orders.user_id = user1.id and user1.acount_type = ?`;
	// 		sql = mysql.format(sql, ["Siêu thị"]);  
	// 	}
	// 	else {
	// 		sql = "select sum(amount) as amount_from from container_product_log where container_to = ?";
	// 		sql = mysql.format(sql, req.body.id);
	// 	}
	// 	con.query(sql, function(err, results) {
	// 		if (err) throw err; 
	// 		amount_from = results[0].amount_from;  

	// 		sql = "select sum(amount) as amount_to from container_product_log where container_from = ?";
	// 		sql = mysql.format(sql, req.body.id);
	// 		con.query(sql, function(err, results) {
	// 			if (err) throw err;
	// 			amount_to = results[0].amount_to; 
	// 		})
	// 		sql = "select sum(amount) as amount_rest from container_product_detail where container_id = ?";
	// 		sql = mysql.format(sql, req.body.id);
	// 		con.query(sql, function(err, results) {
	// 			if (err) throw err;
	// 			amount_rest = results[0].amount_rest; 
	// 			ketquathongke = new thongke(amount_from, amount_from - amount_to - amount_rest , amount_to, amount_rest);  
	// 			res.send(ketquathongke); 
	// 		})
			 
	// 	})
	//}) 
	array_product_TK.splice(0, array_product_TK.length);
	await thongKeKhoHang(req.body.id); 
	ketquathongke = new thongke(amount_from, amount_from - amount_to - amount_rest , amount_to, amount_rest, array_product_TK);  
	res.send(ketquathongke);  
})

// Thong ke toan bo kho hang
var amount_import; // so luong nhap
var amount_export; // so luong xuat
var amount_manufacturing; // so luong con han
var amount_expiry; // so luong het han
var products = new Array(); // mang cac san pham con lai trong kho
var ketquathongketoanbo = new Object();
var array_product_TKTB = new Array();

async function thongKeToanBo() {  
	sql = `select sum(amount_total) as amount_import from user, orders where orders.user_id = user.id and user.acount_type = ?`;
	sql = mysql.format(sql, ["Siêu thị"]);   
	 
	results = await queryPromise(sql);
	if (results[0].amount_import == null) amount_import = 0;
	else amount_import = results[0].amount_import;  

	sql = "select sum(amount) as amount_manufacturing from container_product_detail where expiry_date >= CURDATE()";
	sql = mysql.format(sql); 
	results = await queryPromise(sql);
	if (results[0].amount_manufacturing == null) amount_manufacturing = 0;
	else amount_manufacturing = results[0].amount_manufacturing; 

	sql = "select sum(amount) as amount_expiry from container_product_detail where expiry_date < CURDATE()";
	sql = mysql.format(sql);
	results = await queryPromise(sql);
	if (results[0].amount_expiry == null) amount_expiry = 0;
	else amount_expiry = results[0].amount_expiry;

	sql = `select product.code, product.name, product.image, sum(amount) as amount from container_product_detail,product 
	where product_id = product.id and expiry_date >= CURDATE() and amount > 0 group by product_id`
	sql = mysql.format(sql);  
	results = await queryPromise(sql); 
	for (var i = 0; i < results.length; i++) {
		product_thongke = new product("", results[i].code, results[i].name, "", "", results[i].image, "", "", "")
		product_thongke.amount = results[i].amount;  
		array_product_TKTB[i] = product_thongke;
	} 
}

app.get('/thongketoanbo', async function(req, res) {
	array_product_TKTB.splice(0, array_product_TK.length);
	await thongKeToanBo(); 
	ketquathongketoanbo.amount_import = amount_import;
	ketquathongketoanbo.amount_export = amount_import - amount_manufacturing - amount_expiry ;
	ketquathongketoanbo.amount_manufacturing = amount_manufacturing;
	ketquathongketoanbo.amount_expiry = amount_expiry;
	ketquathongketoanbo.products =array_product_TKTB;   
	res.send(ketquathongketoanbo);  
})

// 3. Quan ly don hang
//1. Tao don nhap hang
// Lay thong tin nha cung cap
provider= require('./provider.js');
providers = new Array();
product_types = "";
app.get('/getProvidersInfo', (req, res) => {
	set_id = new Set();
	var sql = `select distinct user.id, product_category.name as product_type, user.name, user.code,
	user.address, user.mobile, user.email from user, provider_product,product_category, 
	product where user.id = provider_product.user_id and product.id = provider_product.product_id 
	and product.product_category_id = product_category.id`;
	con.query(sql, function(err, results) {
		k = 0;
		if (err) throw err; 
		for (var i = 0; i < results.length; i++) {
			set_id.add(results[i].id);
		}
		for (var i of set_id) {  
			var user; // Chua chi so tuong ung voi results 
			product_types = ""; 
			for (var j = 0; j < results.length ; j++) {  
				if (i == results[j].id) { 
					product_types += results[j].product_type + ", "; 
					user = j;
				} 
			}  
			if (product_types.charAt(product_types.length - 2) == ",") { 
				product_types = product_types.substr(0, product_types.length - 2);
			}
			pro = new provider(results[user].id, product_types, results[user].name, results[user].code, 
						results[user].address, results[user].mobile, results[user].email); 
			providers[k] = pro; 
			k++;
		}  
		res.send(providers);
	}) 
})

// Lay danh sach hang hoa cua nha cung cap
provider_product = require('./provider_product.js');
provider_products = new Array();

app.post('/getProviderProducts', jsonParser, (req, res)=> {
	provider_products.splice(0, provider_products.length);
	var sql; 
	// Chua chon nha cung cap nhung da xem san pham
	if(req.body.user_id == undefined) {
		sql = `select product.id, code, name, description, image, price, manufacturing_date, expiry_date
		 from product, provider_product, container_product_detail where user_id = 0 and provider_product.product_id = product.id
		 and product.dele = 0 and provider_product.dele = 0`;
	}

	// Da chon nha cung cap sau do moi lua chon san pham
	else {
		sql = `select product.id, code, name, description, image, price from product, provider_product
		 	where user_id = ? and provider_product.product_id = product.id and product.dele = 0 and provider_product.dele = 0`;
		sql = mysql.format(sql, req.body.user_id);
	} 
	con.query(sql, function(err, results) {
		if (err) throw err;
		for (var i = 0; i < results.length; i++) {
			pro_pro = new provider_product(results[i].id, results[i].code, results[i].name, results[i].description,
				results[i].image, results[i].price, false);
			provider_products[i] = pro_pro; 
		}
		res.send(provider_products);
	})
	 
})

// Tim kiem hang hoa phuc vu qua trinh nhap hang cua nha phan phoi
app.post('/searchProviderProducts', jsonParser, (req, res)=> {
	provider_products.splice(0, provider_products.length);
	var sql;
	// Chua chon nha cung cap
	if(req.body.user_id == undefined) {
		sql = `select product.id, code, name, description, image, price from product, provider_product
		 	where user_id = 0 and provider_product.product_id = product.id and product.dele = 0 and provider_product.dele = 0`;
	}
	// Khong tim kiem
	else if (req.body.name.trim() == "" && req.body.code.trim() == "") {
		sql = `select product.id, code, name, description, image, price from product, provider_product
		 	where user_id = ? and provider_product.product_id = product.id and product.dele = 0 and provider_product.dele = 0`;
		 	sql = mysql.format(sql, [req.body.user_id]);
	}
	// Tim kiem theo ten
	else if (req.body.name.trim() != "" && req.body.code.trim() == ""){
		sql = `select product.id, code, name, description, image, price from product, provider_product
		 	where user_id = ? and provider_product.product_id = product.id and name like ? and product.dele = 0 and provider_product.dele = 0`;
		 	sql = mysql.format(sql, [req.body.user_id, "%" +  req.body.name.trim() + "%"]);
	}
	// Tim kiem theo ma
	else if (req.body.name.trim() == "" && req.body.code.trim() != ""){
		sql = `select product.id, code, name, description, image, price from product, provider_product
		 	where user_id = ? and provider_product.product_id = product.id and code like ? and product.dele = 0 and provider_product.dele = 0`;
		 	sql = mysql.format(sql, [req.body.user_id, "%" +  req.body.code.trim() + "%"]);
	}
	// Tim kiem theo ca ten va ma
	else {
		sql = `select product.id, code, name, description, image, price from product, provider_product
		 	where user_id = ? and provider_product.product_id = product.id and code = ? and name = ? and product.dele = 0 and provider_product.dele = 0`;
		 	sql = mysql.format(sql, [req.body.user_id, req.body.code.trim(), req.body.name.trim()]);
	}
	con.query(sql, function(err, results) {
		if (err) throw err;
		for (var i = 0; i < results.length; i++) {
			pro_pro = new provider_product(results[i].id, results[i].code, results[i].name, results[i].description,
				results[i].image, results[i].price, false);
			provider_products[i] = pro_pro; 
		}
		res.send(provider_products);
	})
	 
})

//Them thong tin don nhap hang vao co so du lieu
/*
* Buoc 1: Them thong tin tong quat vao bang orders
* Buoc 2: Them chi tiet cac san pham vao bang order_detail
* Buoc 3: Them chi tiet cac san pham vao bang container_product_detail
*/
var moment = require('moment');
app.post('/createOrder', jsonParser, function(req, res) {
	// Buoc1: Them thong tin tong quat vao bang order
	// Tao ma code cho don hang
	var rdmCode = "";
	for( ; rdmCode.length < 6; rdmCode  += Math.random().toString(36).substr(2));
	var code = "ORDER_" + rdmCode.substr(0, 6);
	var sql = "insert into orders(code, user_id, price_total, amount_total, order_date, import_date, status) values (?,?,?,?,?,?,?)";
	sql = mysql.format(sql, [code, req.body.user_id, req.body.price_total, req.body.amount_total, req.body.order_date, 
		req.body.import_date, "Đã giao"]);
	// console.log(sql);
	con.query(sql, function(err, results) {
		if (err) {
			res.send("0");
			throw err;
		}
		sql = "select Max(id) as order_id from orders";
		con.query(sql, function(err, results1) {
			if (err) {
				res.send("0");
				throw err;
			}

			// Buoc 2 + 3: Them chi tiet cac san pham vao bang order_detail va bang container_product_detail
			// Mac dinh ngay san xuat = ngay nhap hang, han su dung = ngay nhap hang + 1 thang
			// console.log("length: " + req.body.products.length);
			for (var i = 0; i < req.body.products.length; i++) {
				sql = `insert into order_detail(order_id, product_id, amount, price, manufacturing_date, expiry_date)
				value (?, ?, ?, ?, ?, ?)`;
				sql = mysql.format(sql, [results1[0].order_id, req.body.products[i].id,
					req.body.products[i].amount, req.body.products[i].prices, 
					req.body.import_date, (moment(new Date(req.body.import_date)).add(1, 'months')).format("YYYY-MM-DD")]);  
			 
				con.query(sql, function(err, results2) {
					if (err) {
						res.send("0");
						throw err;
					}
				})
				// Bang container_product_detail
				var sql_container_product_detail = `insert into container_product_detail(product_id, container_id, 
				user_id, amount, manufacturing_date, expiry_date) values (?, ?, ?, ?, ?, ?)`;
				sql_container_product_detail = mysql.format(sql_container_product_detail, [req.body.products[i].id,
					1, req.body.user_id, req.body.products[i].amount, req.body.import_date, 
					(moment(new Date(req.body.import_date)).add(1, 'months')).format("YYYY-MM-DD")]);   
				con.query(sql_container_product_detail, function(err, results3) {
					if (err) {
						res.send("0");
						throw err;
					}
				})
			}
		})
		res.send("1");
	}) 
})

// 3.2. Quan ly don hang 
// Lay thong tin tong quat don nhap hang, xuat hang trong bang orders
app.get('/getOrderImportInfo', function(req, res) {
	var sql = `select orders.id, orders.code, name, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date,  
		date_format(import_date, '%d-%m-%Y') as import_date, orders.status 
		from orders, user where orders.user_id = user.id and acount_type = ?`;
	sql = mysql.format(sql, "Nhà cung cấp");
	con.query(sql, function(err, results) {
		if (err) throw err;
		res.send(results);
	})
})
app.get('/getOrderExportInfo', function(req, res) {
	var sql = `select orders.id, orders.code, name, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date, orders.status,
		date_format(export_date, '%d-%m-%Y') as export_date, orders.status, date_format(orders.update_date, '%d-%m-%Y') as update_date,
		reason from orders, user where orders.user_id = user.id and acount_type = ?`;
	sql = mysql.format(sql, "Siêu thị");
	con.query(sql, function(err, results) {
		if (err) throw err;
		res.send(results);
	})
})

// Xem thong tin chi tiet don hang boi id
app.post('/getOrderInfoById', jsonParser, function(req, res) {
	if (req.body.order_type == "donnhaphang") {
		var sql = `select orders.id, orders.code as order_code, user.name, user.code, 
		user.address, user.mobile, user.email, amount_total, price_total, date_format(import_date, '%d-%m-%Y') as import_date,
		date_format(order_date, '%d-%m-%Y') as order_date, orders.status 
		from orders, user where orders.user_id = user.id and orders.id = ?`; 
	}
	else {
		var sql = `select orders.id, orders.code as order_code, user.name, user.code,
		user.address, user.mobile, user.email, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date,  
		date_format(export_date, '%d-%m-%Y') as import_date, orders.status
		from orders, user where orders.user_id = user.id and orders.id = ?`; 
	}
	sql = mysql.format(sql, req.body.id);
	con.query(sql, function(err, results) {
		if (err) throw err; 
		res.send(results);
	})
})

app.post('/getOrderProducts', jsonParser, function(req, res) {
	var sql = `select product.id, product.code, product.name, product.image, amount, date_format(manufacturing_date, '%d-%m-%Y') as manufacturing_date,
		date_format(expiry_date, '%d-%m-%Y') as expiry_date, order_detail.price from product, order_detail where product.id = order_detail.product_id 
		and order_id = ? order by product.id asc`;
	sql = mysql.format(sql, req.body.id);
	con.query(sql, function(err, results) {
		if (err) throw err;
		res.send(results);
	})
})

// Tim kiem don hang
/* Truong hop 1: Nguoi dung chi nhap ma don hang => tim kiem gan dung
* Truong hop 2: Nguoi dung chi nhap ten (nha cung cap hoac sieu thi) => tim kiem gan dung
* Truong hop 3: Nguoi dung nhap ca ma va ten => tim kiem chinh xac
*  Truong hop 4: Con lai => Hien thi het don hang
*/ 
app.post('/searchOrder', jsonParser, function(req, res) {
	var sql;
	// Truong hop 1: Chi nhap ma don hang
	if (req.body.code.trim() != "" && req.body.name.trim() == "") {
		// Neu la don nhap hang
		if (req.body.order_type == "nhaphang") {
			sql = `select orders.id, orders.code, name, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date,  
				date_format(import_date, '%d-%m-%Y') as import_date, reason,
				date_format(orders.update_date, '%d-%m-%Y') as update_date from orders, user 
				where orders.user_id = user.id and acount_type = ? and orders.code like ?`;
			sql = mysql.format(sql, ["Nhà cung cấp", "%" + req.body.code.trim() + "%"]);
			con.query(sql, function(err, results) {
				if (err) throw err;
				res.send(results);
			})
		}
		// Neu la don dat hang
		if (req.body.order_type == "dathang") {
			sql = `select orders.id, orders.code, name, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date,  
				date_format(export_date, '%d-%m-%Y') as export_date, orders.status, reason,
				date_format(orders.update_date, '%d-%m-%Y') as update_date from orders, user 
				where orders.user_id = user.id and acount_type = ? and orders.code like ?`;
			sql = mysql.format(sql, ["Siêu thị", "%" + req.body.code.trim() + "%"]);
			con.query(sql, function(err, results) {
				if (err) throw err;
				res.send(results);
			})
		}
	}

	// Truong hop 2: Chi nhap ten 
	else if (req.body.code.trim() == "" && req.body.name.trim() != "") {
		 // Neu la don nhap hang
		if (req.body.order_type == "nhaphang") {
			sql = `select orders.id, orders.code, name, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date,  
				date_format(import_date, '%d-%m-%Y') as import_date, reason,
				date_format(orders.update_date, '%d-%m-%Y') as update_date from orders, user 
				where orders.user_id = user.id and acount_type = ? and name like ?`;
			sql = mysql.format(sql, ["Nhà cung cấp", "%" + req.body.name.trim() + "%"]);
			con.query(sql, function(err, results) {
				if (err) throw err;
				res.send(results);
			})
		}
		// Neu la don dat hang
		if (req.body.order_type == "dathang") {
			sql = `select orders.id, orders.code, name, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date,  
				date_format(export_date, '%d-%m-%Y') as export_date, orders.status, reason,
				date_format(orders.update_date, '%d-%m-%Y') as update_date from orders, user 
				where orders.user_id = user.id and acount_type = ? and name like ?`;
			sql = mysql.format(sql, ["Siêu thị", "%" + req.body.name.trim() + "%"]);
			con.query(sql, function(err, results) {
				if (err) throw err;
				res.send(results);
			})
		}
	}

	// Truong hop 3 : Nhap ca code va name
	else if (req.body.code.trim() != "" && req.body.name.trim() != "") {
		// Neu la don nhap hang
		if (req.body.order_type == "nhaphang") {
			sql = `select orders.id, orders.code, name, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date,  
				date_format(import_date, '%d-%m-%Y') as import_date, reason,
				date_format(orders.update_date, '%d-%m-%Y') as update_date from orders, user 
				where orders.user_id = user.id and acount_type = ? and name = ? and orders.code = ?`;
			sql = mysql.format(sql, ["Nhà cung cấp", req.body.name.trim(), req.body.code.trim()]);
			con.query(sql, function(err, results) {
				if (err) throw err;
				res.send(results);
			})
		}
		// Neu la don dat hang
		if (req.body.order_type == "dathang") {
			sql = `select orders.id, orders.code, name, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date,  
				date_format(export_date, '%d-%m-%Y') as export_date, orders.status, reason,
				date_format(orders.update_date, '%d-%m-%Y') as update_date from orders, user 
				where orders.user_id = user.id and acount_type = ? and name = ? and orders.code = ?`;
			sql = mysql.format(sql, ["Siêu thị", req.body.name.trim(), req.body.code.trim()]);
			con.query(sql, function(err, results) {
				if (err) throw err;
				res.send(results);
			})
		}
	}

	// Truong hop 4: khong nhap gi ca
	else {
		// Neu la don nhap hang
		if (req.body.order_type == "nhaphang") {
			sql = `select orders.id, orders.code, name, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date,  
				date_format(import_date, '%d-%m-%Y') as import_date, reason,
				date_format(orders.update_date, '%d-%m-%Y') as update_date from orders, user 
				where orders.user_id = user.id and acount_type = ? `;
			sql = mysql.format(sql, ["Nhà cung cấp"]);
			con.query(sql, function(err, results) {
				if (err) throw err;
				res.send(results);
			})
		}
		// Neu la don dat hang
		if (req.body.order_type == "dathang") {
			sql = `select orders.id, orders.code, name, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date,  
				date_format(export_date, '%d-%m-%Y') as export_date, orders.status, reason,
				date_format(orders.update_date, '%d-%m-%Y') as update_date from orders, user 
				where orders.user_id = user.id and acount_type = ? `;
			sql = mysql.format(sql, ["Siêu thị"]); 
			con.query(sql, function(err, results) {
				if (err) throw err;
				res.send(results);
			})
		}
	}
	 
})

// Xac nhan don hang
app.post('/confirmOrderId', jsonParser, function(req, res) {
	// ngay hien tai => tuong duong voi ngay cap nhat thong tin
	var update_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
	var sql = "update orders set status = ?, update_date = ? where id = ?";
	sql = mysql.format(sql, ["Chờ thanh toán", update_date, req.body.id]);
	con.query(sql, function(err, results) {
		if (err) {
			res.send('0');
			throw err;
		} 
		if (results.changedRows == 1) {
			res.send('1');
		} 
		else {
			res.send('0');
		}
	})
})

// Huy don hang
app.post('/cancelOrderId', jsonParser, function(req, res) {
	// ngay hien tai => tuong duong voi ngay cap nhat thong tin
	var update_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
	var sql = "update orders set status = ?, update_date = ?, reason =? where id = ?";
	sql = mysql.format(sql, ["Bị hủy", update_date, req.body.reason, req.body.id]);
	con.query(sql, function(err, results) {
		if (err) {
			res.send('0');
			throw err;
		} 
		if (results.changedRows == 1) {
			res.send('1');
		} 
		else {
			res.send('0');
		}
	})
})

// Xuat don hang 
app.post('/exportOrderId', jsonParser, async function(req, res) {
	array_object_container_products = new Array();
	containers = await queryPromise("select id, name from container") ;
	var k = 0;
	for (i = 0; i < containers.length; i++) {
		container_products = new Object();  
		var sql = `select container_id, product.code, product.name, order_detail.amount as soluongnhap, 
			sum(container_product_detail.amount) as soluongconhan from orders, order_detail, product, 
			container_product_detail where orders.id = ? and orders.id = order_detail.order_id and 
			product.id = order_detail.product_id and order_detail.product_id = container_product_detail.product_id 
			and container_product_detail.expiry_date > date(date_add(curdate(), interval 7 day)) 
			and container_product_detail.container_id = ?
			group by container_product_detail.product_id, container_product_detail.container_id`;
		sql = mysql.format(sql, [req.body.id, containers[i].id]); 
		order_products = await queryPromise(sql); 
		if (order_products.length > 0) { 
			container_products.container = containers[i];
			container_products.products = order_products;
			array_object_container_products[k] = container_products; 
			k++;
		}
		  
	}   
	res.send(array_object_container_products);
})

// Chon kho hang de xuat hang
app.post('/chooseContainerExport', jsonParser, function(req, res) {
	// ngay hien tai => tuong duong voi ngay cap nhat thong tin
	var update_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
	// Lay danh sach san pham cua don hang trong container_product_detail
	// sap xep theo chieu tang dan ngay het han de lua chon hang hoa xuat
	var sql = ` select container_product_detail.id, container_product_detail.product_id, 
	container_product_detail.amount, container_product_detail.expiry_date 
	from container_product_detail, orders, order_detail 
	where orders.id = order_detail.order_id and 
	order_detail.product_id = container_product_detail.product_id and 
	orders.id = ? and 
	container_product_detail.expiry_date > date(date_add(curdate(), interval 7 day)) and 
	container_id = ? order by container_product_detail.product_id asc, container_product_detail.expiry_date asc`;
	sql = mysql.format(sql, [req.body.order_id, req.body.container_id]);
	con.query(sql, async function(err, results) {
		if (err) {
			res.send('0');
			throw err;
		}
		var i = 0, j = 0;
		for (i = 0; i < req.body.order_products.length; i++) { 
			var amount_order = parseInt(req.body.order_products[i].amount); 
			for (j = 0; j < results.length; j++) {  
				if ((req.body.order_products[i].id == results[j].product_id) && (amount_order <= parseInt(results[j].amount))) { 
					sql = `update container_product_detail set amount = ?, update_date = ? where 
						container_product_detail.id = ?`
					sql = mysql.format(sql, [parseInt(results[j].amount) - parseInt(amount_order), 
						update_date, results[j].id]);
					resu = await queryPromise(sql);
					sql = `update orders set status = ? where 
						orders.id = ?`
					sql = mysql.format(sql, ['Đã giao', req.body.order_id]);
					resu_orders = await queryPromise(sql);
					break;
				}
				else if ((req.body.order_products[i].id == results[j].product_id) && (amount_order > parseInt(results[j].amount))) { 
					sql = `update container_product_detail set amount = ?, update_date = ? where 
						container_product_detail.id = ?`
					sql = mysql.format(sql, [0, update_date, results[j].id]);
					resu = await queryPromise(sql); 
					amount_order = parseInt(amount_order) - parseInt(results[j].amount)
				}
			}
		}
		if (i == req.body.order_products.length) {
			res.send('1');
		}
		else {
			res.send('0');
		}
	})
})

// 4. Quan ly nguoi dung

// Lay danh sach tat ca nguoi dung (phuc vu qua trinh them nhan vien cua nha phan phoi => khong trung username)
app.get('/getAllUserInfo', function(req, res) {
	var sql = "select * from user";
	con.query(sql, function(err, results) {
		if (err) throw err;
		res.send(results);
	})
})
// Lay danh sach nguoi dung cua tung tab
app.post('/getUserInfo', jsonParser, (req, res) => {
	// Kiem tra xem acount_type la gi
	var acount_type = req.body.acount_type;
	var sql = "select username, code, name, address, email, mobile, image from user where acount_type = ?";
	sql = mysql.format(sql, acount_type);
	con.query(sql, function(err, results) {
		if (err) throw err;
		res.send(results);
	})
})

// Tim kiem thong tin nguoi dung
app.post('/searchUserInfo', jsonParser, (req, res) => { 
	var sql;

	// Tim kiem theo ten
	if (req.body.name != "" && req.body.code == "") {
		sql = "select code, name, address, email, mobile, image from user where acount_type = ? and name like ?"; 
		sql = mysql.format(sql, [req.body.acount_type, "%" + req.body.name + "%"]);
	}
	// Tim kiem theo ma
	else if (req.body.name == "" && req.body.code != "") {
		sql = "select code, name, address, email, mobile, image from user where acount_type = ? and code like ?"; 
		sql = mysql.format(sql, [req.body.acount_type, "%" + req.body.code + "%"]);
	}
	// Tim kiem theo ca ten va ma
	else if (req.body.name != "" && req.body.code != "") {
		sql = "select code, name, address, email, mobile, image from user where acount_type = ? and code = ? and name = ?"; 
		sql = mysql.format(sql, [req.body.acount_type, req.body.code, req.body.name]);
	}
	// De trong ca name va code
	else {
		sql = "select code, name, address, email, mobile, image from user where acount_type = ?";
		sql = mysql.format(sql, req.body.acount_type);
	} 
	con.query(sql, function(err, results) {
		if (err) throw err;
		res.send(results);
	})
})

// Them nhan vien nha phan phoi
app.post('/addDistributor', jsonParser, async(req, res) => { 
	// Tim id cua nguoi da them nhan vien
	var sql = "select id from user where username= ?";
	sql = mysql.format(sql, req.body.user_id); 
	results = await queryPromise(sql); 
	user_id = results[0].id; 
	var create_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
	var rdmCode = "";
	for( ; rdmCode.length < 6; rdmCode  += Math.random().toString(36).substr(2));
	var code = rdmCode.substr(0, 6);
	sql = `insert into user(username, password, name, address, email, mobile, code, image, status, acount_type, dele, create_date, user_id) 
	values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
	sql = mysql.format(sql, [req.body.username, req.body.password, req.body.name, req.body.address, req.body.email,
		req.body.mobile, code, req.body.image, 0, "Nhà phân phối", 0, create_date, user_id]); // user_id: nguoi da them nhan vien
 
	con.query(sql, function(err, results) {
		if (err) throw err;
		sql = "select code, name, address, email, mobile, image from user where acount_type = ?";
		sql = mysql.format(sql, "Nhà phân phối");
		con.query(sql, function(err, results) {
			if (err) throw err;
			res.send(results);
		})
	})
})


// II. Nha cung cap
// 1. Danh sach hang hoa hien co cua nha cung cap
app.post('/getProviderProducts-NCC', jsonParser, function(req, res) { 
	var sql = `select provider_product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.id = provider_product.product_id and
		product.product_category_id = product_category.id and provider_product.dele = 0 and 
		user.username = ?`;
	sql = mysql.format(sql, req.body.username);  
	con.query(sql, function(err, results) {
		if (err) throw err;
		res.send(results);
	})
})

// 1.1. Tim kiem hang hoa cua nha cung cap 
app.post('/searchProduct-NCC', jsonParser, (req, res) => {
	var sql;
	// tim kiem chi theo ten san pham
	if (req.body.name !="" && req.body.code == "" && req.body.product_category_name == "") {
		sql = `select provider_product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.id = provider_product.product_id and
		product.product_category_id = product_category.id and provider_product.dele = 0 and 
		user.username = ? and product.name like ?`;
		sql = mysql.format(sql, [req.body.username, "%" + req.body.name + "%"]);
	}
	else if (req.body.name =="" && req.body.code != "" && req.body.product_category_name == "") {
		sql = `select provider_product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.id = provider_product.product_id and
		product.product_category_id = product_category.id and provider_product.dele = 0 and 
		user.username = ? and product.code like ?`;
		sql = mysql.format(sql, [req.body.username, "%" + req.body.code + "%"]);
	}
	else if (req.body.name =="" && req.body.code == "" && req.body.product_category_name != "") {
		sql = `select provider_product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.id = provider_product.product_id and
		product.product_category_id = product_category.id and provider_product.dele = 0 and 
		user.username = ? and product_category.name like ?`;
		sql = mysql.format(sql, [req.body.username, req.body.product_category_name]);
	}
	// tim kiem theo 2 thu
	else if (req.body.name !="" && req.body.code != "" && req.body.product_category_name == "") {
		sql = `select provider_product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.id = provider_product.product_id and
		product.product_category_id = product_category.id and provider_product.dele = 0 and 
		user.username = ? and product.name = ? and product.code = ?`;
		sql = mysql.format(sql, [req.body.username, req.body.name, req.body.code]); 
	}
	else if (req.body.name !="" && req.body.code == "" && req.body.product_category_name != "") {
		sql = `select provider_product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.id = provider_product.product_id and
		product.product_category_id = product_category.id and provider_product.dele = 0 and 
		user.username = ? and product.name like ? and product_category.name = ?`;
		sql = mysql.format(sql, [req.body.username, "%" + req.body.name + "%", req.body.product_category_name]);
	}
	else if (req.body.name =="" && req.body.code != "" && req.body.product_category_name != "") {
		sql = `select provider_product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.id = provider_product.product_id and
		product.product_category_id = product_category.id and provider_product.dele = 0 and 
		user.username = ? and product.code like ? and product_category.name = ?`;
		sql = mysql.format(sql, [req.body.username, "%" + req.body.code + "%", req.body.product_category_name]);
	}
	// ca 3 thu deu rong => hien thi tat ca danh sach
	else if (req.body.name =="" && req.body.code == "" && req.body.product_category_name == ""){
		sql = `select provider_product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.id = provider_product.product_id and
		product.product_category_id = product_category.id and provider_product.dele = 0 and 
		user.username = ?`;
		sql = mysql.format(sql, req.body.username);  
	}
	// tim kiem theo ca 3 thu
	else {
		sql = `select provider_product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.id = provider_product.product_id and
		product.product_category_id = product_category.id and provider_product.dele = 0 and 
		user.username = ? and product.name = ? and product.code = ? and product_category.name = ?`;
		sql = mysql.format(sql, [req.body.username, req.body.name, req.body.code, req.body.product_category_name]);
	}
	// console.log(sql);
	con.query(sql, function(err, results) {
		//console.log("r: " + results);
		if (err) throw err;
		res.send(results);
	}) 
})

// 1.2 Xoa hang hoa cua nha cung cap
app.post('/deleteProducts-NCC', jsonParser, async function(req, res) {
	// ngay hien tai => tuong duong voi ngay cap nhat thong tin
	var update_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
	var sql, i;
	for (i = 0; i < req.body.deleteProducts.length; i++) {
		sql = "update provider_product set dele = 1, update_date = ? where id = ?";
		sql = mysql.format(sql, [update_date, req.body.deleteProducts[i].id]);
		results = await queryPromise(sql);
		console.log(i + 1);
	}
	sql = `select provider_product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.id = provider_product.product_id and
		product.product_category_id = product_category.id and provider_product.dele = 0 and 
		user.username = ?`;
	sql = mysql.format(sql, req.body.username); 
	con.query(sql, function(err, results) {
		if (err) throw err;
		res.send(results);
	})
})
app.post('/getProductsNotProvider-NCC', jsonParser, function(req, res) {
	var sql = `select distinct product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.product_category_id = product_category.id and product.id not in (select product_id 
		from provider_product, user where user.id = provider_product.user_id and provider_product.dele = 0 and
		user.username = ?) and user.username = ? order by name_category`;
	sql = mysql.format(sql, [req.body.username, req.body.username]);  
	con.query(sql, function(err, results) {
		if (err) throw err;
		res.send(results);
	})
})

// 1.3. Tim kiem hang hoa ma nha cung cap chua co
app.post('/searchProductNotProvider-NCC', jsonParser, (req, res) => {
	var sql;
	// tim kiem chi theo ten san pham
	if (req.body.name !="" && req.body.code == "" && req.body.product_category_name == "") {
		sql = `select distinct product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.product_category_id = product_category.id and product.id not in (select product_id 
		from provider_product, user where user.id = provider_product.user_id and provider_product.dele = 0 and
		user.username = ?) and user.username = ? and product.name like ? order by name_category`;
		sql = mysql.format(sql, [req.body.username, req.body.username, "%" + req.body.name + "%"]);
	}
	else if (req.body.name =="" && req.body.code != "" && req.body.product_category_name == "") {
		sql = `select distinct product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.product_category_id = product_category.id and product.id not in (select product_id 
		from provider_product, user where user.id = provider_product.user_id and provider_product.dele = 0 and
		user.username = ?) and user.username = ? and product.code like ? order by name_category`;
		sql = mysql.format(sql, [req.body.username, req.body.username, "%" + req.body.code + "%"]);
	}
	else if (req.body.name =="" && req.body.code == "" && req.body.product_category_name != "") {
		sql = `select distinct product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.product_category_id = product_category.id and product.id not in (select product_id 
		from provider_product, user where user.id = provider_product.user_id and provider_product.dele = 0 and
		user.username = ?) and user.username = ? and product_category.name = ? order by name_category`;
		sql = mysql.format(sql, [req.body.username, req.body.username, req.body.product_category_name]);
	}
	// tim kiem theo 2 thu
	else if (req.body.name !="" && req.body.code != "" && req.body.product_category_name == "") {
		sql = `select distinct product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.product_category_id = product_category.id and product.id not in (select product_id 
		from provider_product, user where user.id = provider_product.user_id and provider_product.dele = 0 and
		user.username = ?) and user.username = ? and product.name =? and product.code = ? order by name_category`;
		sql = mysql.format(sql, [req.body.username, req.body.username, req.body.name, req.body.code]); 
	}
	else if (req.body.name !="" && req.body.code == "" && req.body.product_category_name != "") {
		sql = `select distinct product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.product_category_id = product_category.id and product.id not in (select product_id 
		from provider_product, user where user.id = provider_product.user_id and provider_product.dele = 0 and
		user.username = ?) and user.username = ? and product.name like ? and product_category.name = ? order by name_category`;
		sql = mysql.format(sql, [req.body.username, req.body.username, "%" + req.body.name + "%", req.body.product_category_name]);
	}
	else if (req.body.name =="" && req.body.code != "" && req.body.product_category_name != "") {
		sql = `select distinct product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.product_category_id = product_category.id and product.id not in (select product_id 
		from provider_product, user where user.id = provider_product.user_id and provider_product.dele = 0 and
		user.username = ?) and user.username = ? and product.code like ? and product_category.name = ? order by name_category`;
		sql = mysql.format(sql, [req.body.username, req.body.username, "%" + req.body.code + "%", req.body.product_category_name]);
	}
	// ca 3 thu deu rong => hien thi tat ca danh sach
	else if (req.body.name =="" && req.body.code == "" && req.body.product_category_name == ""){
		sql = `select distinct product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.product_category_id = product_category.id and product.id not in (select product_id 
		from provider_product, user where user.id = provider_product.user_id and provider_product.dele = 0 and
		user.username = ?) and user.username = ? order by name_category`;
		sql = mysql.format(sql, [req.body.username, req.body.username]);  
	}
	// tim kiem theo ca 3 thu
	else {
		sql = `select distinct product.id, product.code, product.name, product.image, product.description,
		product_category.name as name_category from user, product, provider_product, product_category 
		where user.id = provider_product.user_id and product.product_category_id = product_category.id and product.id not in (select product_id 
		from provider_product, user where user.id = provider_product.user_id and provider_product.dele = 0 and
		user.username = ?) and user.username = ? and product.name = ? and product.code = ? and product_category.name = ? order by name_category`;
		sql = mysql.format(sql, [req.body.username, req.body.username, req.body.name, req.body.code, req.body.product_category_name]);
	} 
	con.query(sql, function(err, results) {
		//console.log("r: " + results);
		if (err) throw err;
		res.send(results);
	}) 
})

// 1.4. Them san pham cho nha cung cap
app.post('/addProviderProducts-NCC', jsonParser, async function(req, res) {
	// ngay hien tai => tuong duong voi ngay cap nhat thong tin
	var update_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();

	var sql, i, j;
	// Lay cac san pham da co trong nha cung cap nhung bi xoa
	sql = `select provider_product.id, product_id from user, provider_product where user.id = provider_product.user_id 
	and user.username = ? and provider_product.dele = 1`;
	sql = mysql.format(sql, req.body.username);
	try {
		product_id = await queryPromise(sql);
	} catch(SQLException) {
 		res.send('0');
	} 

	// tim user_id
	sql = `select user.id from user where user.username = ?`;
	sql = mysql.format(sql, req.body.username);
	try {
		user_id = await queryPromise(sql); 
	} catch(SQLException) {
 		res.send('0');
	} 
	for (i = 0; i < req.body.array_products.length; i++) {
		if (req.body.array_products[i].checked == true) {
			for (j = 0; j < product_id.length; j++) {
				if (product_id[j].product_id == req.body.array_products[i].id) {
					sql = `update provider_product set dele = 0 where id = ?`;
					sql = mysql.format(sql, product_id[j].id);
					try {
						results = await queryPromise(sql);
					} catch(SQLException) {
				 		res.send('0');
					}  
					break;
				}
			} 
			if (j == product_id.length) {
				sql = `insert into provider_product(user_id, product_id, dele, update_date) 
				values (?, ?, ?, ?)`;
				sql = mysql.format(sql, [user_id[0].id, req.body.array_products[i].id, 0, update_date]); 
				try {
					results = await queryPromise(sql);
				} catch(SQLException) { 
			 		res.send('0');
				}  
			} 
		}
	}
	res.send('1');
})

// 2. Quan ly don hang
// 2.1 Lay danh sach don hang
app.post('/getOrders-NCC', jsonParser, function(req, res) {
	var sql = `select orders.id, orders.code, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date, 
	date_format(import_date, '%d-%m-%Y') as import_date, orders.status 
	from orders, user where user.id = orders.user_id and user.username = ?`;
	sql = mysql.format(sql, req.body.username);
	con.query(sql, function(err, results) {
		if (err) {
			res.send('0');
		}
		res.send(results);
	})
})

// 2.2. Tim kiem don hang
app.post('/searchOrders-NCC', jsonParser, function(req, res) {
	var sql;
	// Truong hop 1: Chi nhap trang thai don hang
	if (req.body.status != "" && req.body.code.trim() == "") { 
		sql = `select orders.id, orders.code, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date, 
				date_format(import_date, '%d-%m-%Y') as import_date, orders.status 
				from orders, user where user.id = orders.user_id and user.username = ? and orders.status = ?`;
		sql = mysql.format(sql, [req.body.username, req.body.status]);
 
	}

	// Truong hop 2: Chi nhap ma don hang 
	else if (req.body.status == "" && req.body.code.trim() != "") { 
		sql = `select orders.id, orders.code, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date, 
			date_format(import_date, '%d-%m-%Y') as import_date, orders.status 
			from orders, user where user.id = orders.user_id and user.username = ? and orders.code like ?`;
		sql = mysql.format(sql, [req.body.username, "%" + req.body.code.trim() + "%"]);  
	}

	// Truong hop 3 : Nhap ca trang thai va ma don hang
	else if (req.body.status != "" && req.body.name.trim() != "") { 
		sql = `select orders.id, orders.code, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date, 
			date_format(import_date, '%d-%m-%Y') as import_date, orders.status 
			from orders, user where user.id = orders.user_id and user.username = ? and orders.code = ? and orders.status = ?`;
		sql = mysql.format(sql, [req.body.username, req.body.code.trim(), req.body.status]); 
	}

	// Truong hop 4: khong nhap gi ca
	else { 
		sql = `select orders.id, orders.code, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date, 
			date_format(import_date, '%d-%m-%Y') as import_date, orders.status 
			from orders, user where user.id = orders.user_id and user.username = ?`;
		sql = mysql.format(sql, [req.body.username]);  
	}
	con.query(sql, function(err, results) {
		if (err) {
			res.send('0');
		}
		res.send(results);
	})
})

// III. Sieu Thi
// 1. Dat hang
app.post('/createOrder-SieuThi', jsonParser, async function(req, res) {
	// Buoc1: Tim user_id
	var sql = "select id from user where user.username = ?";
	sql = mysql.format(sql, req.body.username);
	try {
		user_id = await queryPromise(sql);
	} catch(SQLException) {
		res.send('0');
	}

	// ngay hien tai => tuong duong voi ngay tao don hang
	var order_date = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + ((new Date()).getDate()) + 
	" " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
 
	// Buoc2: Them thong tin tong quat vao bang order
	// Tao ma code cho don hang
	var rdmCode = "";
	for( ; rdmCode.length < 6; rdmCode  += Math.random().toString(36).substr(2));
	var code = "ORDER_" + rdmCode.substr(0, 6);
	sql = "insert into orders(code, user_id, price_total, amount_total, order_date, status) values (?,?,?,?,?,?)";
	sql = mysql.format(sql, [code, user_id[0].id, req.body.price_total, req.body.amount_total, order_date, "Chờ xác nhận"]);
	
	try {
		results = await queryPromise(sql);
	} catch(SQLException) {
		res.send('0');
	}

	try {
		max_id = await queryPromise("select Max(id) as order_id from orders");
	} catch(SQLException) {
		res.send('0');
	}
	 

	// Buoc 3: Them chi tiet cac san pham vao bang order_detail  
	for (var i = 0; i < req.body.products.length; i++) { 
		sql = `insert into order_detail(order_id, product_id, amount, price)
		value (?, ?, ?, ?)`;
		sql = mysql.format(sql, [max_id[0].order_id, req.body.products[i].id,
			req.body.products[i].amount, req.body.products[i].prices]);  
		try {
			results = await queryPromise(sql);
		} catch(SQLException) {
			res.send('0');
		}
	}
	res.send("1"); 
})

// 2. Quan ly don hang
// 2.1 Lay danh sach don hang
app.post('/getOrders-SieuThi', jsonParser, function(req, res) {
	var sql = `select orders.id, orders.code, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date, 
	date_format(export_date, '%d-%m-%Y') as export_date, orders.status 
	from orders, user where user.id = orders.user_id and user.username = ?`;
	sql = mysql.format(sql, req.body.username);
	con.query(sql, function(err, results) {
		if (err) {
			res.send('0');
		}
		res.send(results);
	})
})

// 2.2. Tim kiem don hang
app.post('/searchOrders-SieuThi', jsonParser, function(req, res) {
	var sql;
	// Truong hop 1: Chi nhap trang thai don hang
	if (req.body.status != "" && req.body.code.trim() == "") { 
		sql = `select orders.id, orders.code, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date, 
			date_format(export_date, '%d-%m-%Y') as export_date, orders.status 
			from orders, user where user.id = orders.user_id and user.username = ? and orders.status = ?`;
		sql = mysql.format(sql, [req.body.username, req.body.status]);
 
	}

	// Truong hop 2: Chi nhap ma don hang
	else if (req.body.status == "" && req.body.code.trim() != "") { 
		sql = `select orders.id, orders.code, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date, 
			date_format(export_date, '%d-%m-%Y') as export_date, orders.status 
			from orders, user where user.id = orders.user_id and user.username = ? and orders.code like ?`;
		sql = mysql.format(sql, [req.body.username, "%" + req.body.code.trim() + "%"]);  
	}

	// Truong hop 3 : Nhap ca trang thai va ma don hang
	else if (req.body.status!= "" && req.body.code.trim() != "") { 
		sql = `select orders.id, orders.code, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date, 
			date_format(export_date, '%d-%m-%Y') as export_date, orders.status 
			from orders, user where user.id = orders.user_id and user.username = ? and orders.code = ? and orders.status = ?`;
		sql = mysql.format(sql, [req.body.username, req.body.code.trim(), req.body.status]); 
	}

	// Truong hop 4: khong nhap gi ca
	else { 
		sql = `select orders.id, orders.code, amount_total, price_total, date_format(order_date, '%d-%m-%Y') as order_date, 
			date_format(export_date, '%d-%m-%Y') as export_date, orders.status 
			from orders, user where user.id = orders.user_id and user.username = ?`;
		sql = mysql.format(sql, [req.body.username]);  
	}
	con.query(sql, function(err, results) {
		if (err) {
			res.send('0');
		}
		res.send(results);
	})
})