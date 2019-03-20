import { client_ensure } from './client';
import { path_parse } from './utils/path';
import { PutObjectOutput } from 'aws-sdk/clients/s3';
import * as mime from 'mime-types'
import { S3 } from 'aws-sdk';
import { obj_extend } from 'atma-utils';
import { Gzip } from '../utils/Gzip' 
import { AwsFileOptions } from '../class/AwsFileOptions';

export async function aws_write (path, data: string | Buffer, options?: Partial<AwsFileOptions>) {

    let client = client_ensure();
    let params = path_parse(path);
    let setts = new AwsFileOptions(options);
    let buffer = typeof data === 'string' 
        ? Buffer.from(data) 
        : data;
    
    if (setts.ContentEncoding === 'gzip') {        
        buffer = await Gzip.compress(buffer);
    }

    return new Promise((resolve, reject) => {
        client.putObject({
            Bucket: params.bucket,
            Key: params.key,
            Body: buffer,
            ACL: setts.ACL || 'public-read',
            CacheControl: setts.CacheControl || 'max-age=3600, public',
            ContentType: setts.ContentType || mime.lookup(path) || 'application/octet-stream',
            ContentEncoding: setts.ContentEncoding
        }, (error, buffer: PutObjectOutput) => {
            if (error) {
                reject(error);
                return;
            }            
            resolve();
        });
    }); 
}

export function aws_writeMeta (path, meta) {

    let client = client_ensure();
    let fromParams = path_parse(path);
    let toParams = path_parse(path);
    let copyRequestParams: S3.CopyObjectRequest = {
        CopySource: `${fromParams.bucket}/${fromParams.key}`,
        Bucket: toParams.bucket,
        Key: toParams.key,
        ACL: 'public-read',
        CacheControl: 'max-age=3600, public',
        ContentType: mime.lookup(path) || 'application/octet-stream',
        MetadataDirective: 'replace'
    };
    if (meta) {
        obj_extend(copyRequestParams, meta);
    }
    return new Promise((resolve, reject) => {
        client.copyObject(copyRequestParams, (error, result: S3.CopyObjectOutput) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    }); 
}