export function path_parse (path: string) {
    path = path.replace(/^s3:\/+/, '');
    let i = path.indexOf('/');
    let bucket = path.substring(0, i);
    let key = path.substring(i + 1);
    return {
        bucket, key
    };
}
export function path_serialize ({ key, bucket }) {
    return `s3://${bucket}/${key}`;
}