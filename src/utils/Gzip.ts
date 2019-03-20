import * as zlib from 'zlib'

export namespace Gzip {    
    export function compress (buffer: Buffer): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            zlib.gzip(buffer, (err, buffer) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(buffer);
            });
        });
    }
    export function decompress (buffer: Buffer): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            zlib.unzip(buffer, (err, buffer) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(buffer);
            });
        });
    }
}