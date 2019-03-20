import { client_ensure } from './client';
import { path_parse } from './utils/path';
import { CopyObjectOutput } from 'aws-sdk/clients/s3';
import * as mime from 'mime-types'
import { AwsFileOptions } from '../class/AwsFileOptions';

export function aws_copy (from: string, to: string, options?: Partial<AwsFileOptions>) {

    let client = client_ensure();
    let fromParams = path_parse(from);
    let toParams = path_parse(to);
    let setts = new AwsFileOptions(options);

    return new Promise((resolve, reject) => {
        client.copyObject({
            CopySource: `${fromParams.bucket}/${fromParams.key}`,
            Bucket: toParams.bucket,
            Key: toParams.key,
            
            ACL: setts.ACL || 'public-read',
            CacheControl: setts.CacheControl || 'max-age=3600, public',
            ContentType: setts.ContentType || mime.lookup(to) || 'application/octet-stream',
            ContentEncoding: setts.ContentEncoding,

            MetadataDirective: 'replace'
        }, (error, result: CopyObjectOutput) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    }); 
}