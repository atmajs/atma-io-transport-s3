import * as io from 'atma-io'
import Midd from '../src/exports'
import * as AWSMock from 'mock-aws-s3'

const { File, Directory } = io;
const root = `s3://fixtures`;

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

        Directory.remove('/test/fixtures/temp/');
        File.disableCache();
    },
    async 'read and delete' () {

        let base = `${root}/temp/dir-read`;
        await File.writeAsync(`${base}/a.txt`, `${Math.random()}`);
        await File.writeAsync(`${base}/b.txt`, `${Math.random()}`);
        await File.writeAsync(`${base}/c.js`, `${Math.random()}`);

        let files = await Directory.readFilesAsync('s3://fixtures/temp/dir-read/');
        eq_(files.length, 3);
        eq_(hasFile(files, 'a.txt'), true);
        eq_(hasFile(files, 'c.js'), true);

        files = await Directory.readFilesAsync('s3://fixtures/temp/dir-read/', '*.txt');
        eq_(files.length, 2);

        files = await Directory.readFilesAsync('s3://fixtures/temp/', '*.txt');
        eq_(files.length, 0);

        files = await Directory.readFilesAsync('s3://fixtures/temp/', '**.txt');
        eq_(files.length, 2);

        files = await Directory.readFilesAsync('s3://fixtures/temp/dir-read/', '**.js');
        eq_(files.length, 1);

        await Directory.removeAsync(`${base}/`);
        let exists = await File.existsAsync(`${base}/a.txt`);
        eq_(exists, false);
    }
})

function hasFile(files: (InstanceType<typeof File>)[], path) {
    return files.some(f => f.uri.toString().endsWith(path));
}