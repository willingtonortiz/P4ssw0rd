import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable()
export class PinDAO {
	public constructor(private storage: Storage) {}

	public getPin(): Promise<{}> {
		return this.storage.get("pin");
	}

	public setPin(pin: string): void {
		this.storage.set("pin", pin);

		// Código para actualizar las cuentas y su respectiva encriptación
	}
}
