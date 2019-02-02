import { client_ensure } from './client';
import { path_parse } from './utils/path';
import { CopyObjectOutput } from 'aws-sdk/clients/s3';

export function aws_copy (from: string, to: string) {

    let client = client_ensure();
    let fromParams = path_parse(from);
    let toParams = path_parse(to);

    return new Promise((resolve, reject) => {
        client.copyObject({
            CopySource: `${fromParams.bucket}/${fromParams.key}`,
            Bucket: toParams.bucket,
            Key: toParams.key,
        }, (error, result: CopyObjectOutput) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    }); 
}