import { ITransport } from 'atma-io/transport/custom';
import { S3File } from './S3File';
import { S3Directory } from './S3Directory';
import { client_set, client_settings } from './s3/client';


export class S3Transport implements ITransport {
    File = new S3File()
    Directory =new S3Directory()

    setDriver ($client) {
        client_set($client);
    }
    setOptions (options) {
        client_settings(options);
    }
}