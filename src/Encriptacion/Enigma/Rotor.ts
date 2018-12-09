import { Par } from "./Par";

export class Rotor {
	private longitud: number;
	private rotaciones: number;
	private indiceRotacion: number;
	private claves: Par[];
	private indice: number;

	constructor(claves: Par[], indiceRotacion: number, rotaciones: number) {
		this.claves = claves;
		this.longitud = claves.length;
		this.indiceRotacion = indiceRotacion;
		this.rotaciones = rotaciones;
		this.indice = rotaciones;
	}

	// Rota el diccionario del rotor
	public rotar(): boolean {
		if (++this.indice === this.longitud) this.indice = 0;

		if (this.indice === this.indiceRotacion) return true;
		return false;
	}

	public posClave(aumento: number): number {
		let pos = (this.indice + aumento) % this.longitud;
		pos = (this.claves[pos].clave.index - this.indice) % this.longitud;
		if (pos < 0) pos += this.longitud;
		return pos;
	}

	public posLetra(aumento: number): number {
		let pos = (this.indice + aumento) % this.longitud;

		pos = (this.claves[pos].origen.index - this.indice) % this.longitud;
		if (pos < 0) pos += this.longitud;
		return pos;
	}

	public reiniciar(): void {
		this.indice = this.rotaciones;
	}

	public mostrarDiccionario(): void {
		for (let i = 0; i < this.longitud; ++i) {
			console.log(this.claves[i]);
		}
	}

	public sigueRotacion(): boolean {
		if ((this.indice + 1) % this.longitud === this.indiceRotacion)
			return true;
		return false;
	}
}
