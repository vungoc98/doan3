export class ProductCategory {
	public id;
	public name;
	public description;
	public create_date;
	public update_date;
	constructor(id, name, description, create_date, update_date) {
		this.id = id; 
		this.name = name; 
		this.description = description; 
		this.create_date = create_date;
		this.update_date = update_date;
	}
}