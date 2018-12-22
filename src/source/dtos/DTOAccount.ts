import { IShowData } from "../Interfaces/IShowData";

export class DTOAccount implements IShowData {
	public idCuenta: number;
	public email: string;
	public password: string;
	public description: string;
	public type: string;
	public categories: Array<string>;

	constructor(
		idCuenta: number = 0,
		email: string = "email",
		password: string = "password",
		description: string = "description",
		type: string = "type",
		categories = Array<string>()
	) {
		this.idCuenta = idCuenta;
		this.email = email;
		this.password = password;
		this.description = description;
		this.type = type;
		this.categories = categories;
	}

	public showData(): void {
		console.log(
			`DTOAccount {Id: ${this.idCuenta}, Email: ${this.email}, Password: ${
				this.password
			}, Descryption: ${this.description}, Type: ${
				this.type
			}, Categories: ${this.categories}}`
		);
	}
}
