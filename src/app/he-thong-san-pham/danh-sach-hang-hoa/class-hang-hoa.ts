export class Product {
	public id;
	public code;
	public name;
	public price;
	public description;
	public image;
	public product_category_id;
	constructor(id, code, name, price, description, image, product_category_id) {
		this.id = id;
		this.code = code;
		this.name = name;
		this.price = price;
		this.description = description;
		this.image = image;
		this.product_category_id = product_category_id;
	}
}