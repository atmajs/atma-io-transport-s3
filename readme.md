## AWS S3 and AWS S3 compatible transport for [`atma-io`](https://github.com/atmajs/atma-io).

[![Build Status](https://travis-ci.org/atmajs/atma-io-transport-s3.svg?branch=master)](https://travis-ci.org/atmajs/atma-io-transport-s3)
[![NPM version](https://badge.fury.io/js/atma-io-transport-s3.svg)](http://badge.fury.io/js/atma-io-transport-s3)


The plugin adds `s3://` protocol support to [`atma-io`](https://github.com/atmajs/atma-io) library.


#### `'s3://BUCKET/PATH'`

> Only `ASYNC` api is supported


```typescript
await io.File.writeAsync('s3://mybucket/foo/bar.txt', 'Lorem ipsum');

let content = await io.File.readAsync('s3://mybucket/foo/bar.txt');

await io.File.copyTo('./localfile.txt', 's3://mybucket/remotefile.txt');
```

See the `atma-io` API for `File` and `Directory`. `Sync` methods are not supported, and exceptions will be thrown.

### Get started

1. When `atma` toolkit, `atma` server, `app-bundler` are used, you just have to enable and configurate the plugin in `package.json`:

```js
{
    // package.json options
    "atma": {
        "plugins": [
            "atma-io-transport-s3"
        ],
        "options": {
            "atma-io-transport-s3": {
                // OPTIONALY HERE the settings but better via ENV 
                "accessKeyId": "",
                "secretAccessKey": "",
                "region": "",
                "endpoint": "",
                "sslEnabled": "",
            }
        }
    }
}
```
*`ENV:`*

```js
process.env.AWS_KEY;
process.env.AWS_SECRET;
process.env.AWS_REGION;
process.env.AWS_ENDPOINT;
'AWS_SSL' in process.env;
```

No further configuration or registration is required. Just use the `s3` protocol.


2. Configurate and register manually

```js
import { File } from 'atma-io'
import Transport from 'atma-io-transport-s3'

Transport.init(File, { /* aws options or ENV will be read */ });

```

After that you can use `s3` protocol in the application.

----
(c) MIT - Atma.js Project
