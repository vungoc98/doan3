module.exports = class Product {
	constructor(id="", code="", name="", price="", description="", image="", product_category_id="", create_date, update_date, amount="", manufacturing_date="", expiry_date="", user_id) {
		this.id = id;
		this.code = code;
		this.name = name;
		this.price = price;
		this.description = description;
		this.image = image;
		this.product_category_id = product_category_id;
		this.create_date = create_date;
		this.update_date = update_date;
		this.amount = amount;
		this.manufacturing_date = manufacturing_date;
		this.expiry_date = expiry_date;
		this.user_id = user_id;
	}
}