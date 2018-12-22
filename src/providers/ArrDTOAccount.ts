import { Injectable } from "@angular/core";
import { AccountDAO } from "../source/daos/AccountDAO";
import { DTOAccount } from "../source/dtos/DTOAccount";
import { Pair } from "../source/dataEstructure/Pair";

@Injectable()
export class ArrDTOAccount {
	public accounts: Array<Pair<string, Array<DTOAccount>>> = null;
	// Cuenta actualmente seleccionada
	private actual: Pair<string, Array<DTOAccount>> = null;
	//first->tipo:string
	//second->array de cuentas de ese tipo

	constructor(private AccountDAO: AccountDAO) {
		this.accounts = new Array<Pair<string, Array<DTOAccount>>>();
		AccountDAO.getAll().then((data: Array<DTOAccount>) => {
			if (data) {
				data.forEach(account => {
					this.agregarCuenta(account);
				});
			}
		});
	}

	public getActual(): Pair<string, Array<DTOAccount>> {
		return this.actual;
	}

	public setActual(tipo: string): void {
		this.actual = this.buscarTipo(tipo);
	}

	public agregarCuenta(account: DTOAccount): void {
		if (this.buscarTipo(account.type) == null) {
			this.accounts.push(
				new Pair(account.type, new Array<DTOAccount>(account))
			);
		} else {
			this.buscarTipo(account.type).second.push(account);
		}
	}

	private buscarTipo(tipo: string): Pair<string, Array<DTOAccount>> {
		for (let pair of this.accounts) {
			if (pair.first === tipo) return pair;
		}
		return null;
	}

	public buscarCategoria(categoria: string): void {
		let cuentas = new Array<DTOAccount>();
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
}
