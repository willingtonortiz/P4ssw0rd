import { Component } from "@angular/core";
import {
	NavController,
	AlertController,
	LoadingController,
	Alert
} from "ionic-angular";

// pages
import { EditAccountPage } from "../edit-account/edit-account";

// Daos
import { CuentaDAO } from "../../source/daos/CuentaDAO";
import { PinDAO } from "../../source/daos/PinDAO";

// Dtos
import { DTOCuenta } from "../../source/dtos/DTOCuenta";
import { ArrDTOAccount } from "../../providers/ArrDTOAccount";
import { Pair } from "../../source/dataEstructure/Pair";
import { EncryptorAccountProvider } from "../../providers/encryptor-account/encryptor-account";

@Component({
	selector: "page-mostrar-cuentas",
	templateUrl: "mostrar-cuentas.html"
})
export class MostrarCuentasPage {
	private tiposCuentas: Pair;

	constructor(
		public navCtrl: NavController,
		private alertController: AlertController,
		private loadingController: LoadingController,
		private cuentaDao: CuentaDAO,
		private pinDao: PinDAO,
		private encryptor: EncryptorAccountProvider,
		private arrDtoAccount: ArrDTOAccount
	) {
		this.tiposCuentas = arrDtoAccount.getActual().second;
	}

	private revealAccount(item: DTOCuenta): void {
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
								this.pinDao
									.verifyPin(data.pin)
									.then((data: boolean) => {
										if (data) {
											item = this.encryptor.decryptAccount(
												item
											);
										} else {
											let alert: Alert = this.alertController.create(
												{
													message:
														"El pin es incorrecto"
												}
											);
											alert.present();
											setTimeout(() => {
												alert.dismiss();
												alert = null;
											}, 1000);
										}
									});
							}
						},
						{
							text: "Cancelar",
							handler: (data: string) => {}
						}
					]
				})
				.present();
		});
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
							handler: (data: string) => {}
						}
					]
				})
				.present();
		});
	}

	private deleteAccount(item: DTOCuenta) {

		let promise = new Promise((resolve, reject) => {
			this.alertController
				.create({
					title: "Ingrese su pin",
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
								this.pinDao
									.verifyPin(data.pin)
									.then((data: boolean) => {
										if (data) {
											this.arrDtoAccount.borrarCuenta(item);
											this.cuentaDao.delete(item);
											this.loadingController
												.create({
													content:
														"Eliminando cuenta",
													duration: 2000
												})
												.present();
										}
									});
							}
						},
						{
							text: "Cancelar",
							handler: (data: any) => {}
						}
					]
				})
				.present();
		});
	}

	private goBack(): void {
		this.navCtrl.pop();
	}
}
