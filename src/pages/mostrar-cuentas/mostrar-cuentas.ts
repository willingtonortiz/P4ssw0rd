import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { DTOTiposCuentas, Pair } from "../../dtos/DTOTipoCuenta"
import { CuentaDAO } from "../../daos/CuentaDAO";
import { DTOCuenta } from '../../dtos/DTOCuenta';



import { PinDAO } from "../../daos/PinDAO";
import { EditAccountPage } from "../edit-account/edit-account";
/**
 * Generated class for the MostrarCuentasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-mostrar-cuentas',
	templateUrl: 'mostrar-cuentas.html',
})
export class MostrarCuentasPage {

	private tiposCuentas: Pair;

	constructor(public navCtrl: NavController,
		private cuentaDao: CuentaDAO,
		private alertController: AlertController,
		private pinDao: PinDAO) {
		this.tiposCuentas = DTOTiposCuentas.getInstancia().getActual().second;
		//console.log(this.tiposCuentas);
	}

	ionViewDidLoad() {
		//console.log(this.tiposCuentas);
	}

	private editAccount(item: DTOCuenta): void {
		let promise = new Promise((resolve, reject) => {
			this.alertController
				.create({
					title: "Ingrese el pin",
					inputs: [
						{
							name: "pin",
							placeholder: "Pin"
						}
					],
					buttons: [
						{
							text: "Aceptar",
							handler: (data: any) => {
								console.log("Entré aqui", data);
								this.pinDao
									.verifyPin(data.pin)
									.then((data: boolean) => {
										if (data) {
											this.navCtrl.push(
												EditAccountPage,
												item
											);
										}
									});
							}
						},
						{
							text: "Cancelar",
							handler: (data: string) => { }
						}
					]
				})
				.present();
		});
	}

	private regresar(): void {
		this.navCtrl.pop();
	}
}
