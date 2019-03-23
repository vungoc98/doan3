module.exports = class Provider {
	constructor(amount_from, amount_order, amount_to, amount_rest, products) {
		this.amount_from = amount_from;
		this.amount_order = amount_order;
		this.amount_to = amount_to;
		this.amount_rest = amount_rest;
		this.products = products; // mang chua danh sach hang hoa 
	}
 
	setAmount_from(amount_from) {
		this.amount_from = amount_from;
	}

	setAmount_order(amount_order) {
		this.amount_order = amount_order;
	}

	setAmount_to(amount_to) {
		this.amount_to = amount_to;
	}

	setAmount_rest(amount_rest) {
		this.amount_rest = amount_rest;
	}
}