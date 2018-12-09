import { Par } from "./Par";

export class Reflector {
	private claves: Par[];

	constructor(claves: Par[]) {
		this.claves = claves;
	}

	// Devuelve la posicion en el alfabeto de la letra transformada
	public transformar(posicion: number): number {
		return this.claves[posicion].clave.index;
	}
}
