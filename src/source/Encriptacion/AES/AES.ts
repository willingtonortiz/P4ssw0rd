import { renderTextFormat } from "ionic-angular/umd/util/datetime-util";

export class AES {
	private bloques: Array<Array<Array<number>>>;
	private llave: Array<Array<Array<number>>>;
	private textoModificado: string;
	private static instancia: AES = null;

	public static getInstancia(
		pin: string = ""
	): AES {
		if (this.instancia === null)
			this.instancia = new AES(pin);

		return this.instancia;
	}


	constructor(pin: string) {
		//texto no debe usar el caracter alfabeto[172]
		this.inicializar();
		this.llave = new Array<any>();
		while (pin.length % 16 != 0)
			pin += " ";
		this.convertir(pin, 0, true);
		this.generarSubLlaves();
		//this.textoModificado = this.imprimirTexto();
	}
	private constanteIV = [
		[8, 7, 9, 6],
		[5, 2, 6, 9],
		[14, 9, 18, 18],
		[23, 7, 0, 26]
	];
	private RCON = [
		1, 2, 4, 8, 10, 20, 40, 80, 18, 36
	];
	private alfabeto = [
		'\\', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',//27
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',//54
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ', '@', '#', '*', '.', '+', '×', '÷', '=', '%', '/', '€', '£', '$', '!', ':', ';',//81
		'&', '_', '(', ')', '-', '\'', '"', ',', '?', '￦', '¥', '°', '¿', '¡', '^', '[', ']', '<', '>', '~', '`', '§', 'μ', '¬', 'Г', '´', '·',//108
		'{', '}', '©', '|', '¤', 'Ω', 'θ', 'ฯ', 'ê', 'ë', 'é', 'è', 'û', 'ù', 'ü', 'ú', 'î', 'ì', 'ï', 'í', 'œ', 'ø', 'õ', 'ô', 'ö', 'ò', 'ó',//135
		'ã', 'å', 'æ', 'à', 'ä', 'â', 'á', 'ß', 'ç', 'Ê', 'Ë', 'É', 'È', 'Û', 'Ù', 'Ü', 'Ú', 'Î', 'Ì', 'Ï', 'Í', 'Œ', 'Ø', 'Õ', 'Ô', 'Ö', 'Ò',//162
		'Ó', 'Ã', 'Å', 'Æ', 'À', 'Ä', 'Â', 'Á', 'Ç', 'A', '♥'//172 Æ
	];
	private diccionario = [
		0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
		0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
		0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
		0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
		0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
		0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
		0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
		0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
		0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
		0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
		0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
		0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
		0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
		0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
		0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
		0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];

	private inicializar(): void {
		this.bloques = new Array<Array<Array<number>>>();
		//this.llave = new Array<any>();
	}

	public Encripatar(texto: string): string {
		this.inicializar();
		while (texto.length % 16 != 0)
			texto += " ";
		for (let i = 0; i < texto.length; i += 16) {
			this.convertir(texto, i);
			if (i == 0)
				this.Encripatacion(this.bloques[i / 16], this.constanteIV);
			else
				this.Encripatacion(this.bloques[i / 16], this.bloques[(i / 16) - 1]);
			//this.imprimir(this.bloques[i / 16]);
		}
		return this.imprimirTexto();
	}
	public Desencriptar(texto: string): string {
		this.inicializar();
		let temporal: Array<Array<number>> = new Array(4);
		let temporal2: Array<Array<number>> = new Array(4);
		let cont = 0;

		for (let i = 0; i < 4; ++i) {
			temporal[i] = new Array(4);
			temporal2[i] = new Array(4);
		}

		this.copiar(temporal, this.constanteIV);

		for (let i = 0; i < texto.length; i += 16) {
			let add: number = this.convertir(texto, i);
			this.copiar(temporal2, this.bloques[cont]);
			this.Desencriptacion(this.bloques[cont], temporal);
			this.copiar(temporal, temporal2);
			i += add;
			cont++;
		}

		return this.imprimirTexto();
	}
	private Encripatacion(bloque: Array<Array<number>>, bloque2: Array<Array<number>>) {
		let iteracion: number = 0;
		this.CBS(bloque, bloque2);
		this.addRoundKey(bloque, iteracion);

		for (iteracion = 1; iteracion <= 9; ++iteracion) {
			this.subBytes(bloque);
			this.shiftRows(bloque);
			this.mixColumns(bloque);
			this.addRoundKey(bloque, iteracion);
		}
		this.shiftRows(bloque);
		this.addRoundKey(bloque, iteracion);
	}
	private Desencriptacion(bloque: Array<Array<number>>, bloque2: Array<Array<number>>) {
		let iteracion: number = 10;
		this.addRoundKey(bloque, iteracion);
		this.shiftRows(bloque, true);

		for (iteracion = 9; iteracion >= 1; --iteracion) {
			this.addRoundKey(bloque, iteracion);
			this.InvMixColumns(bloque);
			this.shiftRows(bloque, true);
			this.InvSubBytes(bloque);
		}
		this.addRoundKey(bloque, iteracion);
		this.CBS(bloque, bloque2);
	}
	private CBS(bloque: Array<Array<number>>, bloque2: Array<Array<number>>) {
		for (let i = 0; i < 4; ++i) {
			for (let j = 0; j < 4; ++j) {
				bloque[i][j] ^= bloque2[i][j];
			}
		};
	}
	private imprimir(bloque: Array<Array<number>>) {
		let texto: string = "";
		for (let i = 0; i < bloque.length; ++i) {
			texto = "";
			for (let j = 0; j < bloque[i].length; ++j)
				texto += bloque[i][j].toString() + " ";

		}
	}
	private imprimirTexto() {
		let texto: string = "";
		for (let k = 0; k < this.bloques.length; ++k) {
			for (let i = 0; i < this.bloques[k].length; ++i) {
				for (let j = 0; j < this.bloques[k][i].length; ++j) {
					if (this.bloques[k][i][j] >= 172) {
						texto += this.alfabeto[172];
						this.bloques[k][i][j] -= 172;
					}
					texto += this.alfabeto[this.bloques[k][i][j]];

				}
			}
		}
		return texto;
	}
	private convertir(frase: string, posI: number, llave: boolean = false) {
		let temp: Array<Array<number>>;
		temp = new Array<Array<number>>(4);
		for (let i = 0; i < 4; ++i) {
			temp[i] = new Array<number>(4, 0);
		}
		// se guarda la palabra de izquierda a derecha
		//lo contrario a lo del aes
		let add = 0;
		for (let i = 0; i < 4; ++i) {
			for (let j = 0; j < 4; ++j) {
				if (frase[posI + 4 * i + j + add] == this.alfabeto[172]) {
					temp[i][j] = 172;
					add++;
				}
				else
					temp[i][j] = 0;
				for (let k = 0; k < 172; k++) {
					if (frase[posI + 4 * i + j + add] == this.alfabeto[k])
						temp[i][j] += k;
				}
			}
		}
		if (!llave)
			this.bloques.push(temp);
		else
			this.llave.push(temp);
		return add;
	}
	private subBytes(bloque: Array<Array<number>>) {
		for (let i = 0; i < bloque.length; ++i) {
			for (let j = 0; j < bloque[i].length; ++j) {
				let temp: number = bloque[i][j];
				bloque[i][j] = this.diccionario[temp];
			}
		}
	}
	private InvSubBytes(bloque: Array<Array<number>>) {
		for (let i = 0; i < bloque.length; ++i) {
			for (let j = 0; j < bloque[i].length; ++j) {
				for (let k = 0; k < 256; ++k) {
					if (this.diccionario[k] == bloque[i][j]) {
						bloque[i][j] = k;
						break;
					}

				}
			}
		}
	}

	private shiftRows(bloque: Array<Array<number>>, inverso: boolean = false) {

		for (let i = 1; i < 4; ++i) {
			let temp = bloque[i][0], k = 0, pasar = false, cont = 4;
			while (cont--) {
				let temp2;
				if (!inverso) {
					if (k - i < 0) {
						temp2 = bloque[i][4 + k - i];
						bloque[i][4 + k - i] = temp;
						k = 4 + k - i;
					}
					else {
						temp2 = bloque[i][k - i];
						bloque[i][k - i] = temp;
						k = k - i;
					}
					temp = temp2;
					if (k == 0 && i == 2 && !pasar) {
						temp = bloque[i][++k];
						pasar = true;
					}
				}
				else {
					if (k + i > 3) {
						temp2 = bloque[i][k + i - 4];
						bloque[i][k + i - 4] = temp;
						k = k + i - 4;
					}
					else {
						temp2 = bloque[i][k + i];
						bloque[i][k + i] = temp;
						k = k + i;
					}
					temp = temp2;
					if (k == 0 && i == 2 && !pasar) {
						temp = bloque[i][++k];
						pasar = true;
					}
				}
			}
		}
	}

	private mixColumns(bloque: Array<Array<number>>) {
		for (let j = 0; j < 4; ++j) {
			let n = new Array(4);
			let n2 = new Array(4);
			var condicion;
			for (let i = 0; i < 4; i++) {
				n[i] = bloque[i][j];
				condicion = bloque[i][j] >> 7;
				n2[i] = bloque[i][j] << 1;
				if (condicion) {
					n2[i] = n2[i] ^ 283;
				}
			}
			bloque[0][j] = n2[0] ^ n[3] ^ n[2] ^ n2[1] ^ n[1];
			bloque[1][j] = n2[1] ^ n[0] ^ n[3] ^ n2[2] ^ n[2];
			bloque[2][j] = n2[2] ^ n[1] ^ n[0] ^ n2[3] ^ n[3];
			bloque[3][j] = n2[3] ^ n[2] ^ n[1] ^ n2[0] ^ n[0];
		}
	}
	private InvMixColumns(bloque: Array<Array<number>>) {
		for (let j = 0; j < 4; ++j) {
			let n = new Array(4);
			let n2 = new Array(4);
			let n3 = new Array(4);
			let n4 = new Array(4);
			let condicion;
			for (let i = 0; i < 4; i++) {
				n[i] = bloque[i][j];
				condicion = bloque[i][j] >> 7;
				n2[i] = bloque[i][j] << 1;
				if (condicion)
					n2[i] = n2[i] ^ 283;
				condicion = n2[i] >> 7;
				n3[i] = n2[i] << 1;
				if (condicion)
					n3[i] = n3[i] ^ 283;
				condicion = n3[i] >> 7;
				n4[i] = n3[i] << 1;
				if (condicion)
					n4[i] = n4[i] ^ 283;
			}
			bloque[0][j] = n4[1] ^ n2[1] ^ n[1] ^ n4[2] ^ n3[2] ^ n[2] ^ n4[3] ^ n[3] ^ n4[0] ^ n3[0] ^ n2[0]; / *11  * a0 + 13*a3 + 9*a2 + 3 * 14*a1 * /
			bloque[1][j] = n4[2] ^ n2[2] ^ n[2] ^ n4[3] ^ n3[3] ^ n[3] ^ n4[0] ^ n[0] ^ n4[1] ^ n3[1] ^ n2[1]; / *11  * a0 + 13*a3 + 9*a2 + 3 * 14*a1 * /
			bloque[2][j] = n4[3] ^ n2[3] ^ n[3] ^ n4[0] ^ n3[0] ^ n[0] ^ n4[1] ^ n[1] ^ n4[2] ^ n3[2] ^ n2[2]; / *11  * a0 + 13*a3 + 9*a2 + 3 * 14*a1 * /
			bloque[3][j] = n4[0] ^ n2[0] ^ n[0] ^ n4[1] ^ n3[1] ^ n[1] ^ n4[2] ^ n[2] ^ n4[3] ^ n3[3] ^ n2[3]; / *11  * a0 + 13*a3 + 9*a2 + 3 * 14*a1 * /
		}
	}
	private addRoundKey(bloque: Array<Array<number>>, subLlave: number) {
		for (let i = 0; i < 4; ++i)
			for (let j = 0; j < 4; ++j)
				bloque[i][j] ^= this.llave[subLlave][i][j];
	}
	private generarSubLlaves() {
		for (let i = 0; i < 10; ++i)
			this.subLLaves(i);
	}
	private subLLaves(iteracion: number) {
		let temp: Array<Array<number>>;
		temp = new Array<Array<number>>(4);
		for (let i = 0; i < 4; ++i) {
			temp[i] = new Array<number>(1);
			if (i < 3)
				temp[i][0] = this.llave[iteracion][i + 1][0];
			else
				temp[i][0] = this.llave[iteracion][0][0];
		}
		this.subBytes(temp);
		for (let i = 0; i < 4; ++i) {
			temp[i][0] ^= this.llave[iteracion][i][0];
			if (i == 0)
				temp[i][0] ^= this.RCON[iteracion];
		}
		for (let j = 0; j < 3; ++j)
			for (let i = 0; i < 4; ++i)
				temp[i].push(temp[i][j] ^ this.llave[iteracion][i][j + 1]);
		this.llave.push(temp);
	}

	copiar(bloque: Array<Array<number>>, bloque2: Array<Array<number>>) {
		for (let i = 0; i < 4; i++)
			for (let j = 0; j < 4; j++)
				bloque[i][j] = bloque2[i][j];
	}
}

