import { client_ensure } from './client';
import { path_parse } from './utils/path';

export function aws_exists (path) {

    let client = client_ensure();
    let params = path_parse(path);

    return new Promise((resolve, reject) => {
        client.headObject({
            Bucket: params.bucket,
            Key: params.key
          }, function(err, data) {
            if (err) {                
                if (err.statusCode === 404) {
                    resolve(false);
                    return;
                }
                reject(err);
              
              return;
            }
            resolve(true);
          });            
    });
}