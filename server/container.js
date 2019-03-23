module.exports = class Container {
	constructor(id, code, name, address, dele, mobile, create_date, update_date) {
		this.id = id;
		this.code = code;
		this.name = name;
		this.address = address;
		this.dele = dele;
		this.mobile = mobile;
		this.create_date = create_date;
		this.update_date = update_date;
	}
}