export class Product {
	public id;
	public code;
	public name;
	public price;
	public description;
	public image;
	public product_category_id;
	public create_date;
	public update_date;
	constructor(id, code, name, price, description, image, product_category_id, create_date, update_date) {
		this.id = id;
		this.code = code;
		this.name = name;
		this.price = price;
		this.description = description;
		this.image = image;
		this.product_category_id = product_category_id;
		this.create_date = create_date;
		this.update_date = update_date;
	}
}