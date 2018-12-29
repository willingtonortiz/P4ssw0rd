import { Rotor } from "./Rotor";
import { Reflector } from "./Reflector";
import { EnigmaAlfabeto } from "./EnigmaAlfabeto";
import { Alfabeto } from "../Alfabeto/Alfabeto";

export class Enigma {
	// Singleton
	private static instancia: Enigma = null;

	private alfabeto: Array<string>;
	private rotorI: Rotor;
	private rotorII: Rotor;
	private rotorIII: Rotor;
	private reflector: Reflector;

	/**
	 * Si no se establecen las rotaciones iniciales, los valores por defecto serán cero
	 * @param rotorI Número de rotaciones del rotorI
	 * @param rotorII Número de rotaciones del rotorII
	 * @param rotorIII Número de rotaciones del rotorIII
	 */
	public static getInstancia(
		rotorI: number = 0,
		rotorII: number = 0,
		rotorIII: number = 0
	): Enigma {
		if (this.instancia === null) {
			Enigma.instancia = new Enigma(rotorIII, rotorII, rotorI);
		}
		return Enigma.instancia;
	}

	private constructor(
		rotacionesIII: number,
		rotacionesII: number,
		rotacionesI: number
	) {
		this.alfabeto = Alfabeto.getInstancia().getAlfabeto();

		let alfabetos: EnigmaAlfabeto = EnigmaAlfabeto.getInstancia();

		this.rotorI = new Rotor(alfabetos.getAlfabetoRotorI(), 17, rotacionesI);

		this.rotorII = new Rotor(
			alfabetos.getAlfabetoRotorII(),
			5,
			rotacionesII
		);

		this.rotorIII = new Rotor(
			alfabetos.getAlfabetoRotorIII(),
			22,
			rotacionesIII
		);

		this.reflector = new Reflector(alfabetos.getAlfabetoReflector());
	}

	// Calcula el aumento de la letra de entrada a partir del alfabeto
	private calcularAumento(letra: string): number {
		for (let i = 0; i < this.alfabeto.length; ++i) {
			if (letra === this.alfabeto[i]) return i;
		}
	}

	private calcularLetra(aumento: number): string {
		return this.alfabeto[aumento];
	}

	// Devuelve la letra cifrada
	private cifrarLetra(letra: string): string {
		// Clave es el valor del aumento
		let clave: any = this.calcularAumento(letra);

		// Proceso de rotarcion
		if (this.rotorIII.rotar()) {
			if (this.rotorII.rotar()) {
				this.rotorIII.rotar();
			}
		} else {
			if (this.rotorII.sigueRotacion()) {
				this.rotorII.rotar();
				this.rotorI.rotar();
			}
		}

		clave = this.rotorIII.posClave(clave);
		clave = this.rotorII.posClave(clave);
		clave = this.rotorI.posClave(clave);
		clave = this.reflector.transformar(clave);
		clave = this.rotorI.posLetra(clave);
		clave = this.rotorII.posLetra(clave);
		clave = this.rotorIII.posLetra(clave);
		clave = this.calcularLetra(clave);

		return clave;
	}

	// Devuelve el texto cifrado
	private cifrarTexto(texto: string): string {
		let cadena: string = "";
		for (let i = 0; i < texto.length; ++i) {
			cadena += this.cifrarLetra(texto[i]);
		}
		this.rotorI.reiniciar();
		this.rotorII.reiniciar();
		this.rotorIII.reiniciar();
		return cadena;
	}

	public setRotations(
		rotacionesI: number,
		rotacionesII: number,
		rotacionesIII: number
	): void {
		this.rotorI.setRotations(rotacionesI);
		this.rotorII.setRotations(rotacionesII);
		this.rotorIII.setRotations(rotacionesIII);
	}

	public encrypt(text: string): string {
		return this.cifrarTexto(text);
	}

	public decrypt(text: string): string {
		return this.cifrarTexto(text);
	}
}
