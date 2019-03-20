import { Serializable } from './Serializable';
export class AwsFileOptions extends Serializable<AwsFileOptions> {
    ACL: string;
    ContentType: string;
    CacheControl: string;
    ContentEncoding: string;
}
