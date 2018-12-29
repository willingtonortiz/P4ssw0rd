import { IEncryptor } from "../../Interfaces/IEncryptor";
import { Enigma } from "../Enigma/Enigma";
import { AES } from "../AES/AES";

import { Storage } from "@ionic/storage";
import { PinDAO } from '../../daos/PinDAO'

export class Encryptor implements IEncryptor {
	private enigma: Enigma = null;
	//private pinDao:PinDAO;
	private pin: string;

	public constructor(
	) {
		if (this.enigma == null) {
			this.enigma = Enigma.getInstancia();
		}
	}

	encrypt(text: string): string {
		console.log(AES.getInstancia());
		console.log(AES.getInstancia().Encripatar(text));
		console.log((AES.getInstancia().Desencriptar(AES.getInstancia().Encripatar(text))));
		console.log(AES.getInstancia());
		console.log(AES.getInstancia().Encripatar(text));
		//console.log((AES.getInstancia().Desencriptar(AES.getInstancia().Encripatar(text))));
		//console.log(this.enigma.encrypt(AES.getInstancia().Encripatar(text)));
		return this.enigma.encrypt(AES.getInstancia().Encripatar(text));

	}

	decrypt(text: string): string {

		console.log(this.enigma.decrypt(text));
		console.log( AES.getInstancia().Desencriptar(this.enigma.decrypt(text)) );
		console.log( AES.getInstancia().Encripatar(this.enigma.encrypt(text)) );
		return AES.getInstancia().Desencriptar(this.enigma.decrypt(text));

	}
}
