import { io } from './dependencies'
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
		$transport.setOptions(app.config.get('settings.atma-io-middleware-s3'));
	}
	/** Atma.Plugin */
	register(appcfg) {
		$transport.setOptions(appcfg.get('settings.atma-io-middleware-s3'));
    }
};

register(io);

function register ($io: typeof io, options?) {
    if ($io == null || $io.File == null || $io.File.registerTransport == null) {
        return;
    }
    $io.File.registerTransport('s3', $transport);
}


export default new Middleware;