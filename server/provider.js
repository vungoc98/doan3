module.exports = class Provider {
	constructor(id, product_type, name, code, address, mobile, email) {
		this.id = id;
		this.product_type = product_type;
		this.name = name;
		this.code = code;
		this.address = address;
		this.mobile = mobile;
		this.email = email;
	}

	setProduct_type(product_type) {
		this.product_type = product_type;
	}
}