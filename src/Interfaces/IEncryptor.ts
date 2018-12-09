export interface IEncryptor {
	encrypt(text: string): string;
	decrypt(text: string): string;
}
