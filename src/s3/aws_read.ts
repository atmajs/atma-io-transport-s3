import { client_ensure } from './client';
import { path_parse } from './utils/path';
import { GetObjectOutput } from 'aws-sdk/clients/s3';

export function aws_read (path, encoding?: 'buffer' | 'utf8') {

    let client = client_ensure();
    let params = path_parse(path);

    return new Promise((resolve, reject) => {
        client.getObject({
            Bucket: params.bucket,
            Key: params.key,
        }, (error, buffer: GetObjectOutput) => {
            if (error) {
                reject(error);
                return;
            }
            let data = encoding === 'utf8' ? buffer.Body.toString() : buffer.Body;
            resolve(data);
        });
    }); 
}