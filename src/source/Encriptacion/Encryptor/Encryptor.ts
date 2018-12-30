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

		//console.log((AES.getInstancia().Desencriptar(AES.getInstancia().Encripatar(text))));
		//console.log(this.enigma.encrypt(AES.getInstancia().Encripatar(text)));
		return this.enigma.encrypt(AES.getInstancia().Encripatar(text));

	}

	decrypt(text: string): string {


		return AES.getInstancia().Desencriptar(this.enigma.decrypt(text));

	}
}
