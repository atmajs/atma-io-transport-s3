const dts = require('dts-bundle');

dts.bundle({
	name: 'atma-io-transport-s3',
	main: './ts-temp/exports.d.ts',
	out: './typings/index.d.ts'
});


let content = io.File.read('./ts-temp/typings/index.d.ts', {skipHooks: true});

content = content.replace(/^\s*import ['"][^\n]+/gm, '');

io.File.write('./lib/index.d.ts', content, { skipHooks: true });