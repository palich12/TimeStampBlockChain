import * as CryptoJS from 'crypto-js';

export function getHash(data: string) : string{
    const hash = CryptoJS.algo.SHA256.create();
    hash.update(CryptoJS.enc.Latin1.parse(data));
    return '' + hash.finalize();
}