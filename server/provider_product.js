module.exports = class Provider_product {
	constructor(id, code, name, description, image, price, checked, manufacturing_date, expiry_date, amount=0, prices=0) {
		this.id = id;
		this.name = name;
		this.code = code;
		this.description = description;
		this.image = image;
		this.price = price;
		this.checked = checked; // dung de kiem tra san pham co duoc chon hay khong 
		this.manufacturing_date = manufacturing_date;
		this.expiry_date = expiry_date;
		this.amount = amount; // So luong nhap
		this.prices = prices; // So tien cho moi san pham
	} 
}