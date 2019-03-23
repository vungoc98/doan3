module.exports = class ProductCategory {
	constructor(id, name, description, create_date, update_date) {
		this.id = id; 
		this.name = name; 
		this.description = description; 
		this.create_date = create_date;
		this.update_date = update_date;
	}
}