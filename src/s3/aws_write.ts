import { client_ensure } from './client';
import { path_parse } from './utils/path';
import { GetObjectOutput } from 'aws-sdk/clients/s3';

export function aws_write (path, data: Buffer, encoding?: 'buffer' | 'utf8') {

    let client = client_ensure();
    let params = path_parse(path);

    return new Promise((resolve, reject) => {
        client.putObject({
            Bucket: params.bucket,
            Key: params.key,
            Body: data
        }, (error, buffer: GetObjectOutput) => {
            if (error) {
                reject(error);
                return;
            }            
            resolve();
        });
    }); 
}