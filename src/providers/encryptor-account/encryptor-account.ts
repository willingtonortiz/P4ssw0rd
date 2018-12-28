import { Injectable } from "@angular/core";
import { Encryptor } from "../../source/Encriptacion/Encryptor/Encryptor";
import { AccountDAO } from "../../source/daos/AccountDAO";
import { DTOAccount } from "../../source/dtos/DTOAccount";
import { RotorPosicion } from "../../source/Encriptacion/Enigma/RotorPosicion";
import { Enigma } from "../../source/Encriptacion/Enigma/Enigma";

@Injectable()
export class EncryptorAccountProvider {
	private encryptor: Encryptor;

	constructor(private accountDAO: AccountDAO) {
		this.encryptor = new Encryptor();
	}

	public encryptAccount(item: DTOAccount): DTOAccount {
		item.email = this.encryptor.encrypt(item.email);
		item.password = this.encryptor.encrypt(item.password);
		return item;
	}

	public decryptAccount(item: DTOAccount): DTOAccount {
		item.email = this.encryptor.decrypt(item.email);
		item.password = this.encryptor.decrypt(item.password);
		return item;
	}

	public insertAccount(item: DTOAccount): void {
		item = this.encryptAccount(item);
		this.accountDAO.insert(item);
	}

	public modifyAccounts(pin: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.accountDAO.getAll().then((data: Array<DTOAccount>) => {
				if (data) {
					let accounts: Array<DTOAccount> = data;

					// Se desencriptan todos los datos
					for (let i = 0; i < accounts.length; ++i) {
						accounts[i] = this.decryptAccount(accounts[i]);
					}

					RotorPosicion.setAumento(1);
					let numero1: number = RotorPosicion.transformar(pin);
					let numero2: number = RotorPosicion.transformar(pin);
					let numero3: number = RotorPosicion.transformar(pin);

					Enigma.getInstancia().setRotations(
						numero1,
						numero2,
						numero3
					);

					// Se reencriptan todos los datos con el nuevo pin
					for (let i = 0; i < accounts.length; ++i) {
						accounts[i] = this.encryptAccount(accounts[i]);
					}

					// Actualizar la base de datos
					this.accountDAO.replaceAccounts(accounts);
				}
				resolve();
			});
		});
	}

	public deleteAccount(item: DTOAccount): void {
		this.accountDAO.delete(item);
	}
}
