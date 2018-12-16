import { IEncryptor } from "../../Interfaces/IEncryptor";
import { Enigma } from "../Enigma/Enigma";

export class Encryptor implements IEncryptor {
	private enigma: Enigma = null;

	public constructor() {
		if (this.enigma == null) {
			this.enigma = Enigma.getInstancia();
		}
	}

	encrypt(text: string): string {
		return this.enigma.encrypt(text);
	}

	decrypt(text: string): string {
		return this.enigma.decrypt(text);
	}
}
