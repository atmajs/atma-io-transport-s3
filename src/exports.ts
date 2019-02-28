import { io, packageIo } from './dependencies'
import { S3Transport } from './S3Transport';

declare type File = InstanceType<typeof io.File>

let $currentIo: typeof io = null;
let $transport = new S3Transport;

class Middleware {
	
	init(mix: typeof io | any, options?) {
        if (options) {
            $transport.setOptions(options);
        }
        if (mix.registerTransport) {
            mix.registerTransport('s3', $transport);
            return;
        }
        register($currentIo = mix, options);
    }

    setClient ($client) {
        $transport.setDriver($client);
    }
    setOptions (options) {
        $transport.setOptions(options);
    }
    getUrl (path: string) {
        return $transport.getUrl(path);
    }

	clearTemp () {
		
	}


	/** Atma-Server */
	attach(app) {
        let options = app.config.$get('settings.atma-io-transport-s3');
		$transport.setOptions(options);
	}
	/** Atma.Plugin */
	register(appcfg) {
        let options = appcfg.$get('settings.atma-io-transport-s3');
		$transport.setOptions(options);
    }
};

register(io);
register(packageIo);

function register ($io: typeof io, options?) {
    if ($io == null || $io.File == null || $io.File.registerTransport == null) {
        return;
    }
    $io.File.registerTransport('s3', $transport);
}


export default new Middleware;