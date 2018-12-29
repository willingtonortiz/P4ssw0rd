export class RotorPosicion {
	private static aumento = 1;

	constructor() {}

	public static transformar(pin: string): number {
		let valor: number = 0;
		for (let i = 0; i < pin.length; ++i) {
			valor += pin.charCodeAt(i);
		}
		valor *= RotorPosicion.aumento;
		++RotorPosicion.aumento;
		return valor;
	}

	public static transformarToArray(pin: string): Array<number> {
		return new Array<number>(
			RotorPosicion.transformar(pin),
			RotorPosicion.transformar(pin),
			RotorPosicion.transformar(pin)
		);
	}

	public static setAumento(aumento: number): void {
		RotorPosicion.aumento = aumento;
	}
}
