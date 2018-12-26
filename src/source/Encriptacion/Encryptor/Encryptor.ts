import { IEncryptor } from "../../Interfaces/IEncryptor";
import { Enigma } from "../Enigma/Enigma";
import { AES } from "../AES/AES";

import { PinDAO } from '../../daos/PinDAO'

export class Encryptor implements IEncryptor {
	private enigma: Enigma = null;
	private pin:string;

	public constructor() {
		if (this.enigma == null) {
			this.enigma = Enigma.getInstancia();
		}
	}

	encrypt(text: string): string {
		let pinDao:PinDAO;
		pinDao.getPin().then((data: string) => {
			this.pin=data;
		});
		let Aes=new AES(text, this.pin ,true);
		return this.enigma.encrypt(Aes.textoModificado);
	}

	decrypt(text: string): string {
		let pinDao:PinDAO;
		pinDao.getPin().then((data: string) => {
			this.pin=data;
		});
		let Aes=new AES(text, this.pin ,false);
		return this.enigma.decrypt(Aes.textoModificado);
	}
}
