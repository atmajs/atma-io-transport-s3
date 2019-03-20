import { client_ensure } from './client';
import { path_parse } from './utils/path';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import { Gzip } from '../utils/Gzip';

export function aws_read (path, encoding?: 'buffer' | 'utf8'): Promise<string | Buffer> {

    let client = client_ensure();
    let params = path_parse(path);

    return new Promise((resolve, reject) => {
        client.getObject({
            Bucket: params.bucket,
            Key: params.key,
        }, async (error, output: GetObjectOutput) => {
            if (error) {
                reject(error);
                return;
            }
            let body = output.Body as Buffer;
            if (output.ContentEncoding === 'gzip') {
                body = await Gzip.decompress(body);
            }
            let data = encoding === 'utf8' ? body.toString('utf8') : body;
            resolve(data);
        });
    }); 
}