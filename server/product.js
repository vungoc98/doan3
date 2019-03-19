module.exports = class Product {
	constructor(id="", code="", name="", price="", description="", image="", product_category_id="", amount="", manufacturing_date="", expiry_date="", provider_id) {
		this.id = id;
		this.code = code;
		this.name = name;
		this.price = price;
		this.description = description;
		this.image = image;
		this.product_category_id = product_category_id;
		this.amount = amount;
		this.manufacturing_date = manufacturing_date;
		this.expiry_date = expiry_date;
		this.provider_id = provider_id;
	}
}