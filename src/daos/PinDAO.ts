import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable()
export class PinDAO {
	public constructor(private storage: Storage) {}

	public verifyPin(pin: string): Promise<{}> {
		return new Promise((resolve, reject) => {
			this.storage.get("pin").then((data: string) => {
				if (data) {
					if (data === pin) {
						resolve(true);
						console.log("El pin es correcto");
					} else {
						resolve(false);
						console.log("El pin es incorrecto");
					}
				} else {
					resolve(false);
				}
			});
		});
	}

	public getPin(): Promise<{}> {
		return this.storage.get("pin");
	}

	public setPin(pin: string): void {
		this.storage.set("pin", pin);

		// Código para actualizar las cuentas y su respectiva encriptación
	}
}
