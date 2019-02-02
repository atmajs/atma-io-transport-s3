import { IDirectoryTransport } from 'atma-io/transport/custom';
import { aws_listExists, aws_list } from './s3/aws_list';
import { io } from './dependencies';
import { class_Dfr } from 'atma-utils';
import { aws_delete } from './s3/aws_delete';

export class S3Directory implements IDirectoryTransport {
    ensure(path: any): string {
        return null;
    }    
    ensureAsync(path: any, cb: any): void {
        // Directory existance in S3 is not important
        cb();
    }
    ceateSymlink(source: string, target: string) {
        throw new Error(`${source} to ${target}. S3 does not support the symlinks`);
    }
    exists(path: any): boolean {
        throw new Error('S3 does not support SYNC method: exists');
    }
    existsAsync(path: any, cb: (err: Error, x?: boolean) => void) {
        
        aws_listExists(path).then(
            exists => cb(null, exists), 
            error => cb(error)
        );
    }
    readFiles(path: any, patterns?: any, excludes?: any, data?: any): string[] {
        throw new Error('Method not implemented.');
    }
    readFilesAsync(path: any, patternsOrCb?: any, excludesOrCb?: any, dataOrCb?: any, Cb?: any) {
        Cb = Cb || dataOrCb || excludesOrCb || patternsOrCb;
        if (Cb === dataOrCb) dataOrCb = null;
        if (Cb === excludesOrCb) excludesOrCb = null;
        if (Cb === patternsOrCb) patternsOrCb = null;

        aws_list(path).then(
            paths => {
                let base = new io.Uri(path);
                let patterns = patternsOrCb;
                if (patterns != null) {
                    paths = paths.filter(path => {
                        return patterns.some(pattern => {

                            let pathUri = new io.Uri(path);
                            let rel = pathUri.toRelativeString(base);
                            return pattern.test(rel);
                        })
                    })
                }
                Cb(null, paths)
            },
            error => Cb(error)
        );
    }
    remove(path: any): boolean {
        throw new Error('Method not implemented.');
    }
    removeAsync(path: any, cb: (err?: Error) => void) {
        aws_list(path).then(
            paths => {
                parallel(paths, path => {
                    return aws_delete(path)
                }).then(
                    _ => cb(),
                    err => cb(err)
                );
            },
            err => cb(err)
        );
    }
    rename(oldPath: any, newPath: any) {
        throw new Error('Method not implemented.');
    }
    renameAsync(oldPath: any, newPath: any, cb: (err: Error) => void) {
        throw new Error('Method not implemented.');
    }
}


function parallel<T>(arr: T[], worker: (x: T) => PromiseLike<any>) {
    let dfr = new class_Dfr;
    let error = null;

    function next (err?) {
        if (error) return;
        if (err) {
            dfr.reject(error = err);
            return;
        }
        if (arr.length === 0) {
            dfr.resolve();
            return;
        }
        let x = arr.shift();
        worker(x).then(
            () => next(),
            err => next(err)
        );
    }

    next();

    return dfr;
}