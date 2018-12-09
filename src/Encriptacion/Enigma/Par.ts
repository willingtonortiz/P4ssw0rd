export class Par {
	public letra: string;
	public index: number;

	public clave: Par;
	public origen: Par;

	constructor(letra: string, index: number) {
		this.letra = letra;
		this.index = index;
		this.clave = this.origen = null;
	}
}
