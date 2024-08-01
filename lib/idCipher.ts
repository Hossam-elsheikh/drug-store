// idCipher.ts

// This is a secret key. In a real application, this should be stored securely,
// not hardcoded in your source code.


const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY_URL;
if (!SECRET_KEY) {
	throw new Error('NEXT_PUBLIC_SECRET_KEY_URL is not defined in environment variables');
}

export function encodeId(id: string): string {
	let result = '';
	for (let i = 0; i < id.length; i++) {
		const charCode = id.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
		result += String.fromCharCode(charCode);
	}
	return Buffer.from(result).toString('base64');
}

export function decodeId(encodedId: string): string {
	const decoded = Buffer.from(encodedId, 'base64').toString('utf-8');
	let result = '';
	for (let i = 0; i < decoded.length; i++) {
		const charCode = decoded.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
		result += String.fromCharCode(charCode);
	}
	return result;
}