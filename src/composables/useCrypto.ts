import CryptoJS from "crypto-js";

export default function useCrypto() {
  const secret = import.meta.env.VITE_CRYPTO_SECRET;

  const encrypt = (payload: string | object) => {
    return CryptoJS.AES.encrypt(JSON.stringify(payload), secret).toString();
  };

  const decrypt = (payload: string) => {
    const bytes = CryptoJS.AES.decrypt(payload, secret);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  };

  return { encrypt, decrypt };
}
