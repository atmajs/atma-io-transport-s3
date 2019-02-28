import { client_ensure } from './client';
import { path_parse } from './utils/path';
import { S3 } from 'aws-sdk';

export function aws_list (path) {
    return doListObjects({ path });
}

export function aws_listExists (path) {
    return doListObjects({ path, MaxKeys: 1 }).then(arr => {
        return arr.length !== 0
    });
}

function doListObjects ({ path, MaxKeys = null }): PromiseLike< string[] > {
    let client = client_ensure();
    let params = path_parse(path);

    return new Promise((resolve, reject) => {
        let opts = {
            Bucket: params.bucket,
            MaxKeys: MaxKeys,
            Prefix: params.key
        };
        doPagination(client, opts, [], function(err, paths) {
            if (err) {
                reject(err);              
                return;
            }            
            resolve(paths);
        });
    });
}

function doPagination(client: S3, params: S3.ListObjectsRequest, paths, onComplete) {
    client.listObjects(params, function(err, data) {
        if (err) {
            onComplete(err);          
            return;
        }
        let count = data.Contents.length;
        if (count !== 0) {
            let arr = data.Contents.map(x => `s3://${params.Bucket}/${x.Key}`);
            paths = paths.concat(arr);

            if (data.IsTruncated) {
                params.Marker = data.NextMarker || data.Contents[data.Contents.length - 1].Key;

                if (params.MaxKeys != null && !isNaN(params.MaxKeys) && isFinite(params.MaxKeys)) {
                    params.MaxKeys -= count;
                    if (params.MaxKeys < 1) {
                        onComplete(null, paths);
                    }
                }

                doPagination(client, params, paths, onComplete);
                return;
            }    
        }        
        onComplete(null, paths);
    });  
}