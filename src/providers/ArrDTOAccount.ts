import { Injectable } from "@angular/core";
import { CuentaDAO } from "../source/daos/CuentaDAO";
import { DTOCuenta } from "../source/dtos/DTOCuenta";
import { Pair } from "../source/dataEstructure/Pair";

@Injectable()
export class ArrDTOAccount {
	public accounts: Array<Pair> = null;
	private actual: Pair = null;
	//first->tipo:string
	//second->array de cuentas de ese tipo

	constructor(private cuentaDao: CuentaDAO) {
		this.accounts = new Array<Pair>();
		cuentaDao.getAll().then((data: Array<DTOCuenta>) => {
			if (data) {
				data.forEach(account => {
					this.agregarCuenta(account);
				});
			}
		});
	}

	public getActual(): Pair {
		return this.actual;
	}

	public setActual(tipo: string): void {
		this.actual = this.buscarTipo(tipo);
	}

	public agregarCuenta(account: DTOCuenta): void {
		if (this.buscarTipo(account.type) == null) {
			this.accounts.push(
				new Pair(account.type, new Array<DTOCuenta>(account))
			);
		} else {
			this.buscarTipo(account.type).second.push(account);
		}
	}

	private buscarTipo(tipo: string): Pair {
		for (let pair of this.accounts) {
			if (pair.first === tipo) return pair;
		}
		return null;
	}

	public buscarCategoria(categoria: string): void {
		let cuentas = new Array<DTOCuenta>();
		for (let type of this.accounts) {
			for (let account of type.second) {
				for (let category of account.categories) {
					if (category.indexOf(categoria) != -1) {
						cuentas.push(account);
						break;
					}
				}
			}
		}
		this.actual = new Pair(categoria, cuentas);
	}

	public borrarCuenta(cuenta: DTOCuenta): void {

		for (let type of this.accounts)
			if (type.first == cuenta.type) {
				type.second.splice(type.second.indexOf(cuenta), 1);

				if (type.second.length == 0)
					this.accounts.splice(this.accounts.indexOf(type), 1);

				break;
			}

	}
}
