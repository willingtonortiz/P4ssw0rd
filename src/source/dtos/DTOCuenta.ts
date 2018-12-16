import { IShowData } from "../Interfaces/IShowData";

export class DTOCuenta implements IShowData {
	public idCuenta: number;
	public email: string;
	public password: string;
	public description: string;
	public type: string;

	constructor(
		idCuenta: number = 0,
		email: string = "email",
		password: string = "password",
		description: string = "description",
		type: string = "type"
	) {
		this.idCuenta = idCuenta;
		this.email = email;
		this.password = password;
		this.description = description;
		this.type = type;
	}

	public showData(): void {
		console.log(
			`DTOCuenta {Id: ${this.idCuenta}, Email: ${this.email}, Password: ${
				this.password
			}, Descryption: ${this.description}, Type: ${this.type} }`
		);
	}
}
