import { DTOCuenta } from "../dtos/DTOCuenta";
import { GenericDAO } from "./GenericDAO";
import { Storage } from "@ionic/storage";
import { Injectable } from "@angular/core";

@Injectable()
export class CuentaDAO implements GenericDAO<DTOCuenta> {
	// variable para asignar id a las cuentas
	private idActual: number;

	constructor(private storage: Storage) {
		// Se obtiene el idActual de las cuentas
		storage.get("idActual").then((data: number) => {
			if (data !== null && data !== undefined) {
				this.idActual = data;
			} else {
				this.idActual = 0;
			}
		});
	}

	private guardarId(idActual: number): void {
		this.storage.set("idActual", idActual);
	}

	public insert(item: DTOCuenta): void {
		this.storage.get("cuentas").then((data: string) => {
			// Si ya existían datos
			if (data) {
				// Se obtienen el arrelgo de datos existen
				let cuentas: Array<DTOCuenta> = JSON.parse(data);

				// Se ingresa el id del nuevo dato
				item.idCuenta = ++this.idActual;

				// Actualiza el idActual del servicio
				this.guardarId(this.idActual);

				// Se ingresa el nuevo dato
				cuentas.push(item);

				// Se guarda el arreglo con el dato ingresado
				this.storage.set("cuentas", JSON.stringify(cuentas));
			} else {
				// Se crea un arreglo que actuará como modelo de datos
				let cuentas = new Array<DTOCuenta>();

				// Se ingresa el id del nuevo dato ( 0 )
				item.idCuenta = ++this.idActual;

				// Se agregará el primer dato
				this.guardarId(this.idActual);

				cuentas.push(item);
				// Se guardará el arreglo a la base de datos
				this.storage.set("cuentas", JSON.stringify(cuentas));
			}
		});
	}

	public update(item: DTOCuenta): boolean {
		this.storage.get("cuentas").then((data: string) => {
			if (data) {
				// Si existen datos, se buscará la cuenta para actualizarla
				let cuentas: Array<DTOCuenta> = JSON.parse(data);

				// Se busca la cuenta para actualizarla
				for (let i = 0; i < cuentas.length; ++i) {
					if (cuentas[i].idCuenta === item.idCuenta) {
						cuentas[i].email = item.email;
						cuentas[i].password = item.password;
						cuentas[i].description = item.description;
						cuentas[i].type = item.type;

						// Se guarda el nuevo arreglo de cuentas
						this.storage.set("cuentas", JSON.stringify(cuentas));

						// Como se encontró la cuenta, retorna verdadero
						return true;
					}
				}
			} else {
				// Si no hay datos, retorna falso
				return false;
			}
		});
		return false;
	}

	public delete(item: DTOCuenta): boolean {
		this.storage.get("cuentas").then((data: string) => {
			if (data) {
				// Si existen datos, se buscará la cuenta para eliminarla
				let cuentas: Array<DTOCuenta> = JSON.parse(data);

				// Se obtiene el nuevo arreglo (el arreglo original menos le dato a eliminar)
				cuentas = cuentas.filter(
					cuenta => cuenta.idCuenta !== item.idCuenta
				);

				// Se guarda el nuevo arreglo de cuentas
				this.storage.set("cuentas", JSON.stringify(cuentas));

				// Como eliminó la cuenta, retorna verdadero
				return true;
			} else {
				// Si no hay datos, retorna falso
				return false;
			}
		});
		return false;
	}

	public getAll(): Array<DTOCuenta> {
		this.storage.get("cuentas").then((data: string) => {
			if (data) {
				return JSON.parse(data);
			} else {
				return null;
			}
		});
		return null;
	}
}
