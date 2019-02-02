import { client_ensure } from './client';
import { path_parse } from './utils/path';

export function aws_delete (path: string) {

    let client = client_ensure();
    let params = path_parse(path);

    return new Promise((resolve, reject) => {
        client.deleteObject({
            Bucket: params.bucket,
            Key: params.key,
        }, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    }); 
}