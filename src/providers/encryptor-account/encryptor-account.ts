import { Injectable } from "@angular/core";
import { Encryptor } from "../../source/Encriptacion/Encryptor/Encryptor";
import { CuentaDAO } from "../../source/daos/CuentaDAO";
import { DTOCuenta } from "../../source/dtos/DTOCuenta";
import { RotorPosicion } from "../../source/Encriptacion/Enigma/RotorPosicion";
import { Enigma } from "../../source/Encriptacion/Enigma/Enigma";

import { AES } from '../../source/Encriptacion/AES/AES'

@Injectable()
export class EncryptorAccountProvider {
	private encryptor: Encryptor;

	constructor(private accountDAO: CuentaDAO) {
		this.encryptor = new Encryptor();
	}

	public encryptAccount(item: DTOCuenta): DTOCuenta {
		// return new DTOCuenta(
		// 	item.idCuenta,
		// 	this.encryptor.encrypt(item.email),
		// 	this.encryptor.encrypt(item.password),
		// 	item.description,
		// 	item.type
		// );
		item.email = this.encryptor.encrypt(item.email);
		item.password = this.encryptor.encrypt(item.password);
		return item;
	}

	public decryptAccount(item: DTOCuenta): DTOCuenta {
		// return new DTOCuenta(
		// 	item.idCuenta,
		// 	this.encryptor.decrypt(item.email),
		// 	this.encryptor.decrypt(item.password),
		// 	item.description,
		// 	item.type
		// );
		item.email = this.encryptor.decrypt(item.email);
		item.password = this.encryptor.decrypt(item.password);
		return item;
	}

	public insertAccount(item: DTOCuenta): void {
		item = this.encryptAccount(item);
		this.accountDAO.insert(item);
	}

	public modifyAccounts(pin: string): void {
		this.accountDAO.getAll().then((data: Array<DTOCuenta>) => {
			if (data) {
				let accounts: Array<DTOCuenta> = data;

				// Se desencriptan todos los datos
				for (let i = 0; i < accounts.length; ++i) {
					accounts[i] = this.decryptAccount(accounts[i]);
					accounts[i].showData();
				}

				let rotorPosition = new RotorPosicion();
				rotorPosition.setAumento(1);
				Enigma.getInstancia().setRotations(
					rotorPosition.transformar(pin),
					rotorPosition.transformar(pin),
					rotorPosition.transformar(pin)
				);

				// Se reencriptan todos los datos
				// for (let i = 0; i < accounts.length; ++i) {
				// accounts[i] = this.encryptAccount(accounts[i]);
				// accounts[i].showData();
				// }
			}
		});
	}
}
