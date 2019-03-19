module.exports = class ContainerLog {
	constructor(id, container_from, container_to, product_id, amount, manufacturing_date, expiry_date, name, code) {
		this.id = id;
		this.container_from = container_from;
		this.container_to = container_to;
		this.product_id = product_id;
		this.amount = amount;
		this.manufacturing_date = manufacturing_date;
		this.expiry_date = expiry_date;
		this.name = name;
		this.code = code;
	}
}