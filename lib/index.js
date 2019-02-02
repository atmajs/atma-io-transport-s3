
				// source ./templates/RootModule.js
				(function(){
					
					var _src_S3Directory = {};
var _src_S3File = {};
var _src_S3Transport = {};
var _src_dependencies = {};
var _src_s3_aws_copy = {};
var _src_s3_aws_delete = {};
var _src_s3_aws_exists = {};
var _src_s3_aws_list = {};
var _src_s3_aws_read = {};
var _src_s3_aws_rename = {};
var _src_s3_aws_write = {};
var _src_s3_client = {};
var _src_s3_utils_path = {};

				// source ./templates/ModuleSimplified.js
				var _src_dependencies;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var utils = require("atma-utils");
exports.utils = utils;
var io = require("atma-io");
var globalIo = global.io;
exports.io = globalIo;
if (globalIo == null || globalIo.File == null) {
    exports.io = globalIo = io;
}
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_dependencies) && isObject(module.exports)) {
						Object.assign(_src_dependencies, module.exports);
						return;
					}
					_src_dependencies = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_s3_utils_path;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
function path_parse(path) {
    path = path.replace(/^s3:\/+/, '');
    var i = path.indexOf('/');
    var bucket = path.substring(0, i);
    var key = path.substring(i + 1);
    return {
        bucket: bucket, key: key
    };
}
exports.path_parse = path_parse;
function path_serialize(_a) {
    var key = _a.key, bucket = _a.bucket;
    return "s3://" + bucket + "/" + key;
}
exports.path_serialize = path_serialize;
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_s3_utils_path) && isObject(module.exports)) {
						Object.assign(_src_s3_utils_path, module.exports);
						return;
					}
					_src_s3_utils_path = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_s3_client;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var aws_sdk_1 = require("aws-sdk");
var path_1 = _src_s3_utils_path;
;
var singleton = null;
var CLIENTS = {};
var OPTIONS = {
    accessKeyId: null,
    secretAccessKey: null,
    region: null,
    endpoint: null,
    sslEnabled: false
};
function client_set($client) {
    singleton = $client;
}
exports.client_set = client_set;
function client_getUrl(path) {
    var params = path_1.path_parse(path);
    var client = new aws_sdk_1.S3(OPTIONS);
    var req = new aws_sdk_1.Request(client, 'getObject', { Key: params.key, Bucket: params.bucket });
    return req.httpRequest.endpoint.protocol + "//" + req.httpRequest.endpoint.host + '/' + path;
}
exports.client_getUrl = client_getUrl;
function client_ensure(options) {
    if (options != null && 'accessKeyId' in options) {
        var key = options.accessKeyId;
        var client = CLIENTS[key];
        if (client != null) {
            return client;
        }
        client = CLIENTS[key] = create(options);
        if (singleton == null) {
            singleton = client;
        }
        return client;
    }
    if (singleton) {
        return singleton;
    }
    var accessKeyId = process.env.AWS_KEY;
    var secretAccessKey = process.env.AWS_SECRET;
    var region = process.env.AWS_REGION;
    var endpoint = process.env.AWS_ENDPOINT;
    var sslEnabled = 'AWS_SSL' in process.env;
    if (accessKeyId) {
        return client_ensure({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: region,
            endpoint: endpoint,
            sslEnabled: sslEnabled
        });
    }
    throw new Error('No AWS Configuration found');
}
exports.client_ensure = client_ensure;
function client_settings(opts) {
    if (opts == null || opts.accessKeyId) {
        return;
    }
    client_ensure(opts);
}
exports.client_settings = client_settings;
function create(options) {
    var opts = Object.create(OPTIONS);
    for (var key in OPTIONS)
        if (key in options) {
            opts[key] = options[key];
        }
    return new aws_sdk_1.S3(opts);
}
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_s3_client) && isObject(module.exports)) {
						Object.assign(_src_s3_client, module.exports);
						return;
					}
					_src_s3_client = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_s3_aws_read;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var client_1 = _src_s3_client;
var path_1 = _src_s3_utils_path;
function aws_read(path, encoding) {
    var client = client_1.client_ensure();
    var params = path_1.path_parse(path);
    return new Promise(function (resolve, reject) {
        client.getObject({
            Bucket: params.bucket,
            Key: params.key
        }, function (error, buffer) {
            if (error) {
                reject(error);
                return;
            }
            var data = encoding === 'utf8' ? buffer.Body.toString() : buffer.Body;
            resolve(data);
        });
    });
}
exports.aws_read = aws_read;
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_s3_aws_read) && isObject(module.exports)) {
						Object.assign(_src_s3_aws_read, module.exports);
						return;
					}
					_src_s3_aws_read = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_s3_aws_exists;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var client_1 = _src_s3_client;
var path_1 = _src_s3_utils_path;
function aws_exists(path) {
    var client = client_1.client_ensure();
    var params = path_1.path_parse(path);
    return new Promise(function (resolve, reject) {
        client.headObject({
            Bucket: params.bucket,
            Key: params.key
        }, function (err, data) {
            if (err) {
                if (err.statusCode === 404) {
                    resolve(false);
                    return;
                }
                reject(err);
                return;
            }
            resolve(true);
        });
    });
}
exports.aws_exists = aws_exists;
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_s3_aws_exists) && isObject(module.exports)) {
						Object.assign(_src_s3_aws_exists, module.exports);
						return;
					}
					_src_s3_aws_exists = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_s3_aws_write;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var client_1 = _src_s3_client;
var path_1 = _src_s3_utils_path;
function aws_write(path, data, encoding) {
    var client = client_1.client_ensure();
    var params = path_1.path_parse(path);
    return new Promise(function (resolve, reject) {
        client.putObject({
            Bucket: params.bucket,
            Key: params.key,
            Body: data
        }, function (error, buffer) {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}
exports.aws_write = aws_write;
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_s3_aws_write) && isObject(module.exports)) {
						Object.assign(_src_s3_aws_write, module.exports);
						return;
					}
					_src_s3_aws_write = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_s3_aws_copy;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var client_1 = _src_s3_client;
var path_1 = _src_s3_utils_path;
function aws_copy(from, to) {
    var client = client_1.client_ensure();
    var fromParams = path_1.path_parse(from);
    var toParams = path_1.path_parse(to);
    return new Promise(function (resolve, reject) {
        client.copyObject({
            CopySource: fromParams.bucket + "/" + fromParams.key,
            Bucket: toParams.bucket,
            Key: toParams.key
        }, function (error, result) {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}
exports.aws_copy = aws_copy;
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_s3_aws_copy) && isObject(module.exports)) {
						Object.assign(_src_s3_aws_copy, module.exports);
						return;
					}
					_src_s3_aws_copy = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_s3_aws_delete;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var client_1 = _src_s3_client;
var path_1 = _src_s3_utils_path;
function aws_delete(path) {
    var client = client_1.client_ensure();
    var params = path_1.path_parse(path);
    return new Promise(function (resolve, reject) {
        client.deleteObject({
            Bucket: params.bucket,
            Key: params.key
        }, function (error) {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}
exports.aws_delete = aws_delete;
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_s3_aws_delete) && isObject(module.exports)) {
						Object.assign(_src_s3_aws_delete, module.exports);
						return;
					}
					_src_s3_aws_delete = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_s3_aws_rename;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var aws_copy_1 = _src_s3_aws_copy;
var aws_delete_1 = _src_s3_aws_delete;
function aws_rename(path, filename) {
    var targetPath = path.replace(/[^/]+$/, filename);
    return aws_copy_1.aws_copy(path, targetPath).then(function () {
        return aws_delete_1.aws_delete(path);
    });
}
exports.aws_rename = aws_rename;
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_s3_aws_rename) && isObject(module.exports)) {
						Object.assign(_src_s3_aws_rename, module.exports);
						return;
					}
					_src_s3_aws_rename = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_S3File;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var aws_read_1 = _src_s3_aws_read;
var aws_exists_1 = _src_s3_aws_exists;
var aws_write_1 = _src_s3_aws_write;
var aws_copy_1 = _src_s3_aws_copy;
var aws_rename_1 = _src_s3_aws_rename;
var aws_delete_1 = _src_s3_aws_delete;
var S3File = /** @class */ (function () {
    function S3File() {
    }
    S3File.prototype.saveAsync = function (path, content, options, cb) {
        pipeCallback(aws_write_1.aws_write(path, content), cb);
    };
    S3File.prototype.copyAsync = function (from, to, cb) {
        pipeCallback(aws_copy_1.aws_copy(from, to), cb);
    };
    S3File.prototype.existsAsync = function (path, cb) {
        pipeCallback(aws_exists_1.aws_exists(path), cb);
    };
    S3File.prototype.readAsync = function (path, encoding, cb) {
        pipeCallback(aws_read_1.aws_read(path, encoding), cb);
    };
    S3File.prototype.removeAsync = function (path, cb) {
        pipeCallback(aws_delete_1.aws_delete(path), cb);
    };
    S3File.prototype.renameAsync = function (path, filename, cb) {
        pipeCallback(aws_rename_1.aws_rename(path, filename), cb);
    };
    S3File.prototype.exists = function (path) {
        throw new Error('Sync exists is not supported for s3 storage');
    };
    S3File.prototype.copy = function (from, to) {
        throw new Error('Sync copy is not supported for s3 storage');
    };
    S3File.prototype.read = function (path, encoding) {
        throw new Error('Sync read is not supported for s3 storage');
    };
    S3File.prototype.remove = function (path) {
        throw new Error('Sync remove is not supported for s3 storage');
    };
    S3File.prototype.rename = function (path, filename) {
        throw new Error('Sync rename is not supported for s3 storage');
    };
    S3File.prototype.save = function (path, content, options) {
        throw new Error('Sync save is not supported for s3 storage');
    };
    return S3File;
}());
exports.S3File = S3File;
function pipeCallback(promise, cb) {
    promise.then(function (x) { return cb(null, x); }, function (err) { return cb(err); });
}
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_S3File) && isObject(module.exports)) {
						Object.assign(_src_S3File, module.exports);
						return;
					}
					_src_S3File = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_s3_aws_list;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var client_1 = _src_s3_client;
var path_1 = _src_s3_utils_path;
function aws_list(path) {
    return doListObjects({ path: path });
}
exports.aws_list = aws_list;
function aws_listExists(path) {
    return doListObjects({ path: path, MaxKeys: 1 }).then(function (arr) {
        return arr.length !== 0;
    });
}
exports.aws_listExists = aws_listExists;
function doListObjects(_a) {
    var path = _a.path, _b = _a.MaxKeys, MaxKeys = _b === void 0 ? null : _b;
    var client = client_1.client_ensure();
    var params = path_1.path_parse(path);
    return new Promise(function (resolve, reject) {
        client.listObjects({
            Bucket: params.bucket,
            MaxKeys: MaxKeys,
            Prefix: params.key
        }, function (err, data) {
            if (err) {
                reject(err);
                return;
            }
            var paths = data.Contents.map(function (x) { return "s3://" + params.bucket + "/" + x.Key; });
            resolve(paths);
        });
    });
}
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_s3_aws_list) && isObject(module.exports)) {
						Object.assign(_src_s3_aws_list, module.exports);
						return;
					}
					_src_s3_aws_list = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_S3Directory;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var aws_list_1 = _src_s3_aws_list;
var dependencies_1 = _src_dependencies;
var atma_utils_1 = require("atma-utils");
var aws_delete_1 = _src_s3_aws_delete;
var S3Directory = /** @class */ (function () {
    function S3Directory() {
    }
    S3Directory.prototype.ensure = function (path) {
        return null;
    };
    S3Directory.prototype.ensureAsync = function (path, cb) {
        // Directory existance in S3 is not important
        cb();
    };
    S3Directory.prototype.ceateSymlink = function (source, target) {
        throw new Error(source + " to " + target + ". S3 does not support the symlinks");
    };
    S3Directory.prototype.exists = function (path) {
        throw new Error('S3 does not support SYNC method: exists');
    };
    S3Directory.prototype.existsAsync = function (path, cb) {
        aws_list_1.aws_listExists(path).then(function (exists) { return cb(null, exists); }, function (error) { return cb(error); });
    };
    S3Directory.prototype.readFiles = function (path, patterns, excludes, data) {
        throw new Error('Method not implemented.');
    };
    S3Directory.prototype.readFilesAsync = function (path, patternsOrCb, excludesOrCb, dataOrCb, Cb) {
        Cb = Cb || dataOrCb || excludesOrCb || patternsOrCb;
        if (Cb === dataOrCb)
            dataOrCb = null;
        if (Cb === excludesOrCb)
            excludesOrCb = null;
        if (Cb === patternsOrCb)
            patternsOrCb = null;
        aws_list_1.aws_list(path).then(function (paths) {
            var base = new dependencies_1.io.Uri(path);
            var patterns = patternsOrCb;
            if (patterns != null) {
                paths = paths.filter(function (path) {
                    return patterns.some(function (pattern) {
                        var pathUri = new dependencies_1.io.Uri(path);
                        var rel = pathUri.toRelativeString(base);
                        return pattern.test(rel);
                    });
                });
            }
            Cb(null, paths);
        }, function (error) { return Cb(error); });
    };
    S3Directory.prototype.remove = function (path) {
        throw new Error('Method not implemented.');
    };
    S3Directory.prototype.removeAsync = function (path, cb) {
        aws_list_1.aws_list(path).then(function (paths) {
            parallel(paths, function (path) {
                return aws_delete_1.aws_delete(path);
            }).then(function (_) { return cb(); }, function (err) { return cb(err); });
        }, function (err) { return cb(err); });
    };
    S3Directory.prototype.rename = function (oldPath, newPath) {
        throw new Error('Method not implemented.');
    };
    S3Directory.prototype.renameAsync = function (oldPath, newPath, cb) {
        throw new Error('Method not implemented.');
    };
    return S3Directory;
}());
exports.S3Directory = S3Directory;
function parallel(arr, worker) {
    var dfr = new atma_utils_1.class_Dfr;
    var error = null;
    function next(err) {
        if (error)
            return;
        if (err) {
            dfr.reject(error = err);
            return;
        }
        if (arr.length === 0) {
            dfr.resolve();
            return;
        }
        var x = arr.shift();
        worker(x).then(function () { return next(); }, function (err) { return next(err); });
    }
    next();
    return dfr;
}
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_S3Directory) && isObject(module.exports)) {
						Object.assign(_src_S3Directory, module.exports);
						return;
					}
					_src_S3Directory = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_S3Transport;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var S3File_1 = _src_S3File;
var S3Directory_1 = _src_S3Directory;
var client_1 = _src_s3_client;
var S3Transport = /** @class */ (function () {
    function S3Transport() {
        this.File = new S3File_1.S3File();
        this.Directory = new S3Directory_1.S3Directory();
    }
    S3Transport.prototype.setDriver = function ($client) {
        client_1.client_set($client);
    };
    S3Transport.prototype.setOptions = function (options) {
        client_1.client_settings(options);
    };
    S3Transport.prototype.getUrl = function (path) {
        return client_1.client_getUrl(path);
    };
    return S3Transport;
}());
exports.S3Transport = S3Transport;
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_S3Transport) && isObject(module.exports)) {
						Object.assign(_src_S3Transport, module.exports);
						return;
					}
					_src_S3Transport = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				
"use strict";
exports.__esModule = true;
var dependencies_1 = _src_dependencies;
var S3Transport_1 = _src_S3Transport;
var $currentIo = null;
var $transport = new S3Transport_1.S3Transport;
var Middleware = /** @class */ (function () {
    function Middleware() {
    }
    Middleware.prototype.init = function (mix, options) {
        if (options) {
            $transport.setOptions(options);
        }
        if (mix.registerTransport) {
            mix.registerTransport('s3', $transport);
            return;
        }
        register($currentIo = mix, options);
    };
    Middleware.prototype.setClient = function ($client) {
        $transport.setDriver($client);
    };
    Middleware.prototype.setOptions = function (options) {
        $transport.setOptions(options);
    };
    Middleware.prototype.getUrl = function (path) {
        return $transport.getUrl(path);
    };
    Middleware.prototype.clearTemp = function () {
    };
    /** Atma-Server */
    Middleware.prototype.attach = function (app) {
        $transport.setOptions(app.config.get('settings.atma-io-middleware-s3'));
    };
    /** Atma.Plugin */
    Middleware.prototype.register = function (appcfg) {
        $transport.setOptions(appcfg.get('settings.atma-io-middleware-s3'));
    };
    return Middleware;
}());
;
register(dependencies_1.io);
function register($io, options) {
    if ($io == null || $io.File == null || $io.File.registerTransport == null) {
        return;
    }
    $io.File.registerTransport('s3', $transport);
}
exports["default"] = new Middleware;

				
				}());
				// end:source ./templates/RootModule.js
				