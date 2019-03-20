import { IFileTransport } from 'atma-io/transport/custom'
import { aws_read } from './s3/aws_read';
import { aws_exists } from './s3/aws_exists';
import { aws_write } from './s3/aws_write';
import { aws_copy } from './s3/aws_copy';
import { aws_rename } from './s3/aws_rename';
import { aws_delete } from './s3/aws_delete';
import { AwsFileOptions } from './class/AwsFileOptions';

export class S3File implements IFileTransport {
    
    saveAsync(path: any, content: string | Buffer, options: { s3: AwsFileOptions }, cb: any): void {
        pipeCallback(aws_write(path, content, options && options.s3), cb);
    }
    
    copyAsync(from: string, to: string, cb: (err: Error) => void) {
        pipeCallback(aws_copy(from, to), cb);
    }
    
    existsAsync(path: any, cb: (err: Error, x?: boolean) => void) {
        pipeCallback(aws_exists(path), cb);
    }
    readAsync(path: any, encoding: any, cb: (err: Error, x?: string | Buffer) => void) {
        pipeCallback(aws_read(path, encoding), cb);
    }
    removeAsync(path: any, cb: (err: Error) => void) {
        pipeCallback(aws_delete(path), cb);
    }
    renameAsync(path: any, filename: any, cb: any) {
        pipeCallback(aws_rename(path, filename), cb);
    }

    exists(path: any): boolean {
        throw new Error('Sync exists is not supported for s3 storage');
    }
    copy(from: any, to: any) {
        throw new Error('Sync copy is not supported for s3 storage');
    }
    read(path: any, encoding?: any): string | Buffer {
        throw new Error('Sync read is not supported for s3 storage');
    }
    remove(path: any): boolean {
        throw new Error('Sync remove is not supported for s3 storage');
    }
    rename(path: any, filename: any) {
        throw new Error('Sync rename is not supported for s3 storage');
    }
    save(path: string, content: any, options?: any): void {
        throw new Error('Sync save is not supported for s3 storage');
    } 
}


function pipeCallback(promise: PromiseLike<any>, cb: (err?, data?) => void) {
    promise.then(
        x => cb(null, x),
        err => cb(err)
    );
}