import { DTOCuenta } from "./DTOCuenta"
import { CuentaDAO } from "../daos/CuentaDAO";

export class Pair {

	public first: any;
	public second: any;

	constructor(first: any, second: any) {

		this.first = first;
		this.second = second;

	}
}

export class DTOTiposCuentas {

	public accounts: Array<Pair>;
	//first->tipo:string
	//second->array de cuentas de ese tipo

	private static instancia: DTOTiposCuentas = null;
	private actual: Pair;

	public constructor(cuentaDao: CuentaDAO) {
		this.accounts = new Array<Pair>();
		cuentaDao.getAll().then((data: Array<DTOCuenta>) => {
			for (let cuenta of data)
				this.agregarCuenta(cuenta);

		});


	}

	public static getInstancia(cuentaDao: CuentaDAO = null): DTOTiposCuentas {
		if (this.instancia == null && cuentaDao != null)
			this.instancia = new DTOTiposCuentas(cuentaDao);

		return this.instancia;

	}

	public getActual(): Pair {
		return this.actual;
	}

	public setActual(tipo: string): void {
		this.actual = this.buscarTipo(tipo);
	}

	public agregarCuenta(cuenta: DTOCuenta): void {
		if (this.buscarTipo(cuenta.type) == null)
			this.accounts.push(new Pair(cuenta.type, new Array<DTOCuenta>(cuenta)));
		else
			this.buscarTipo(cuenta.type).second.push(cuenta);
		//console.log(cuenta);
	}

	private buscarTipo(tipo: string): Pair {
		for (let type of this.accounts) {
			if (type.first == tipo)
				return type;
		}

		return null;

	}

	public buscarCategoria(categoria: string): void {
		let cuentas = new Array<DTOCuenta>();
		for (let type of this.accounts) {
			for (let account of type.second) {
				for (let category of account.categories)

					if (category.indexOf(categoria) != -1) {
						cuentas.push(account);
						break;
					}

			}

		}
		this.actual = new Pair(categoria, cuentas);
	}



}
