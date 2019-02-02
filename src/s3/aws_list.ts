import { client_ensure } from './client';
import { path_parse } from './utils/path';

export function aws_list (path) {
    return doListObjects({ path });
}

export function aws_listExists (path) {
    return doListObjects({ path, MaxKeys: 1 }).then(arr => {
        return arr.length !== 0
    });
}

function doListObjects ({ path, MaxKeys = null}): PromiseLike< string[] > {
    let client = client_ensure();
    let params = path_parse(path);

    return new Promise((resolve, reject) => {
        client.listObjects({
            Bucket: params.bucket,
            MaxKeys: MaxKeys,
            Prefix: params.key
          }, function(err, data) {
            if (err) {
                reject(err);
              
              return;
            }
            let paths = data.Contents.map(x => `s3://${params.bucket}/${x.Key}`)
            resolve(paths);
          });            
    });
}