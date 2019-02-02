import * as io from 'atma-io'
import Midd from '../src/exports'
import * as AWSMock from 'mock-aws-s3'

const { File } = io;

UTest({
    $config: {
        timeout: 5000
    },
    $before () {
        Midd.init(io);

        AWSMock.config.basePath = new File('/test/').uri.toLocalDir();

        Midd.setClient(AWSMock.S3({
            params: { Bucket: 'fixtures' }
        }));

        io.Directory.remove('/test/fixtures/temp/');
        io.File.disableCache();
    },
    async 'exists' () {
        let exists = await File.existsAsync('s3://fixtures/demo/foo.txt');
        eq_(exists, true);

        let not = await File.existsAsync('s3://fixtures/demo/bux-not.txt');
        eq_(not, false);
    },
    async 'read' () {
        let path = 's3://fixtures/demo/foo.txt';
        let x = await File.readAsync(path);
        eq_(x, 'FoO');

        let buffer = await File.readAsync(path, { encoding: 'buffer' });
        is_(buffer, Buffer);
    },
    async 'write' () {
        let path = 's3://fixtures/demo/temp/foo.txt';
        let content = `${ Math.random() }-data}`;
        await File.writeAsync(path, content);
        
        let exists = await File.existsAsync(path)
        eq_(exists, true);

        let data = await File.readAsync(path);
        eq_(data, content);

        let buffer = Buffer.from(`${ Math.random() }-data}`, 'utf8');
        await File.writeAsync(path, buffer);

        data = await File.readAsync(path);
        eq_(data, buffer.toString());
    },
    async 'remove' () {
        let path = 's3://fixtures/demo/temp/foo.txt';
        let content = `${ Math.random() }-data}`;
        await File.writeAsync(path, content);
        
        let data = await File.readAsync(path)
        eq_(data, content);

        let exists = await File.existsAsync(path)
        eq_(exists, true);

        await File.removeAsync(path);
        
        '> not more'
        exists = await File.existsAsync(path)
        eq_(exists, false);
    },
    async 'rename' () {
        let path = 's3://fixtures/demo/temp/foo.txt';
        let content = `${ Math.random() }-data}`;
        await File.writeAsync(path, content);

        await File.renameAsync(path, 'bar.txt');
        
        '> old does not exists'
        let exists = await File.existsAsync(path)
        eq_(exists, false);

        '> new file with same content'
        let target = 's3://fixtures/demo/temp/bar.txt';
        let data = await File.readAsync(target);
        eq_(content, data);
    },
    async 'copy' () {
        let path = 's3://fixtures/demo/temp/copy-a.txt';
        let content = `${ Math.random() }-data}`;
        await File.writeAsync(path, content);

        let target = 's3://fixtures/demo/temp/foo/copy-a.txt';
        await File.copyToAsync(path, target);
        
        '> old exists'
        let exists = await File.existsAsync(path)
        eq_(exists, true);

        '> new exists'
        let data = await File.readAsync(target);
        eq_(content, data);
    }   

})