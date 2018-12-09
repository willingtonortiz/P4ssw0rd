export class DTOCuenta {
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
}
