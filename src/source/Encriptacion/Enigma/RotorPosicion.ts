export class RotorPosicion {
	private static aumento = 1;

	constructor() {}

	public transformar(pin: string): number {
		let valor: number = 0;
		for (let i = 0; i < pin.length; ++i) {
			valor += pin.charCodeAt(i);
		}
		valor *= RotorPosicion.aumento;
		++RotorPosicion.aumento;
		return valor;
	}

	public transformarToArray(pin: string): Array<number> {
		return new Array<number>(
			this.transformar(pin),
			this.transformar(pin),
			this.transformar(pin)
		);
	}

	public setAumento(aumento: number): void {
		RotorPosicion.aumento = aumento;
	}
}
