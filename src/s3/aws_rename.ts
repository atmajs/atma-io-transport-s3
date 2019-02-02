import { aws_copy } from './aws_copy';
import { aws_delete } from './aws_delete';

export function aws_rename (path, filename: string) {
    let targetPath = path.replace(/[^/]+$/, filename);    

    return aws_copy(path, targetPath).then(() => {
        return aws_delete(path);
    });
}