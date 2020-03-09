import { S3, Request } from 'aws-sdk'
import { path_parse } from './utils/path';

interface IOptions {
    accessKeyId: string
    secretAccessKey: string
    region: string
    endpoint: string
    sslEnabled: boolean
};

let singleton: S3 = null;

const CLIENTS: { [accessKey: string]: S3 } = {};
const OPTIONS:IOptions = {
    accessKeyId: null,
    secretAccessKey: null,
    region: null,
    endpoint: null,
    sslEnabled: false
};

export function client_set ($client) {
    singleton = <any> $client;
}
export function client_getUrl (path) {
    let aws = require('aws-sdk');
    let { S3, Request } = aws;
    let params = path_parse(path);
    let client = new S3(OPTIONS);
    let req = new Request(client, 'getObject', {Key: params.key, Bucket: params.bucket});
    
    return req.httpRequest.endpoint.protocol + "//" + req.httpRequest.endpoint.host + '/' + path;
}

export function client_ensure (options: IOptions = <any> {}): S3 {
    if (options != null && 'accessKeyId' in options) {
        let key = options.accessKeyId;
        let client = CLIENTS[key];
        if (client != null) {
            return client;
        }
        client = CLIENTS[key] = create(options);
        if (singleton == null) {
            singleton = client;
        }
        return client;
    }

    if (singleton) {
        return singleton;
    }
    let accessKeyId = process.env.AWS_KEY;
    let secretAccessKey = process.env.AWS_SECRET;
    let region = process.env.AWS_REGION;
    let endpoint = process.env.AWS_ENDPOINT;
    let sslEnabled = 'AWS_SSL' in process.env;
    if (accessKeyId) {
        return client_ensure({
            accessKeyId,
            secretAccessKey,
            region,
            endpoint,
            sslEnabled
        })
    }
    
    throw new Error('No AWS Configuration found');
}

export function client_settings (opts) {
    if (opts == null || opts.accessKeyId == null) {
        return;
    }
    client_ensure(opts);
}

function create (options: any & IOptions) {
    let aws = require('aws-sdk');
    let { S3 } = aws;
    let opts = Object.create(OPTIONS);
    for (let key in OPTIONS) if (key in options) {
        opts[key] = options[key];
    }
    return new S3(opts);
}