import { Injectable } from "@angular/core";
import { AccountDAO } from "../source/daos/AccountDAO";
import { DTOAccount } from "../source/dtos/DTOAccount";
import { Pair } from "../source/dataEstructure/Pair";

@Injectable()
export class AccountClassifier {
	// Todas las cuentas clasificadas en grupos
	public accounts: Array<Pair<string, Array<DTOAccount>>> = null;

	// Grupo de cuentas actualmente seleccionadas
	private actual: Pair<string, Array<DTOAccount>> = null;

	constructor(private accountDAO: AccountDAO) {
		this.getAccounts();
	}

	public getAccounts(): void {
		this.accounts = null;
		this.accounts = new Array<Pair<string, Array<DTOAccount>>>();

		// Obtiene todas las cuentas de la base de datos y las clasifica
		this.accountDAO.getAll().then((data: Array<DTOAccount>) => {
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

	// Elimina una cuenta del arreglo
	public deleteAccount(account: DTOAccount): void {
		for (let i: number = 0; i < this.actual.second.length; ++i) {
			if (this.actual.second[i].idCuenta === account.idCuenta) {
				this.actual.second.splice(i, 1);
				if (this.actual.second.length == 0)
				this.accounts.splice(this.accounts.indexOf(this.actual), 1);
				break;
			}
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
