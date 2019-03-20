
				// source ./templates/RootModule.js
				(function(){
					
					var _src_S3Directory = {};
var _src_S3File = {};
var _src_S3Transport = {};
var _src_class_AwsFileOptions = {};
var _src_class_Serializable = {};
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
var _src_utils_Gzip = {};

				// source ./templates/ModuleSimplified.js
				var _src_dependencies;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var utils = require("atma-utils");
exports.utils = utils;
var packageIo = require("atma-io");
exports.packageIo = packageIo;
var globalIo = global.io;
exports.io = globalIo;
if (globalIo == null || globalIo.File == null) {
    exports.io = globalIo = packageIo;
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
    if (options === void 0) { options = {}; }
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
    if (opts == null || opts.accessKeyId == null) {
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
				var _src_utils_Gzip;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var zlib = require("zlib");
var Gzip;
(function (Gzip) {
    function compress(buffer) {
        return new Promise(function (resolve, reject) {
            zlib.deflate(buffer, function (err, buffer) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(buffer);
            });
        });
    }
    Gzip.compress = compress;
    function decompress(buffer) {
        return new Promise(function (resolve, reject) {
            zlib.unzip(buffer, function (err, buffer) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(buffer);
            });
        });
    }
    Gzip.decompress = decompress;
})(Gzip = exports.Gzip || (exports.Gzip = {}));
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_utils_Gzip) && isObject(module.exports)) {
						Object.assign(_src_utils_Gzip, module.exports);
						return;
					}
					_src_utils_Gzip = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_s3_aws_read;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = _src_s3_client;
var path_1 = _src_s3_utils_path;
var Gzip_1 = _src_utils_Gzip;
function aws_read(path, encoding) {
    var _this = this;
    var client = client_1.client_ensure();
    var params = path_1.path_parse(path);
    return new Promise(function (resolve, reject) {
        client.getObject({
            Bucket: params.bucket,
            Key: params.key
        }, function (error, output) { return __awaiter(_this, void 0, void 0, function () {
            var body, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (error) {
                            reject(error);
                            return [2 /*return*/];
                        }
                        body = output.Body;
                        if (!(output.ContentEncoding === 'gzip')) return [3 /*break*/, 2];
                        return [4 /*yield*/, Gzip_1.Gzip.decompress(body)];
                    case 1:
                        body = _a.sent();
                        _a.label = 2;
                    case 2:
                        data = encoding === 'utf8' ? body.toString('utf8') : body;
                        resolve(data);
                        return [2 /*return*/];
                }
            });
        }); });
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
				var _src_class_Serializable;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
exports.__esModule = true;
var Serializable = /** @class */ (function () {
    function Serializable(model) {
        if (model)
            Object.assign(this, model);
    }
    return Serializable;
}());
exports.Serializable = Serializable;
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_class_Serializable) && isObject(module.exports)) {
						Object.assign(_src_class_Serializable, module.exports);
						return;
					}
					_src_class_Serializable = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_class_AwsFileOptions;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Serializable_1 = _src_class_Serializable;
var AwsFileOptions = /** @class */ (function (_super) {
    __extends(AwsFileOptions, _super);
    function AwsFileOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AwsFileOptions;
}(Serializable_1.Serializable));
exports.AwsFileOptions = AwsFileOptions;
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_class_AwsFileOptions) && isObject(module.exports)) {
						Object.assign(_src_class_AwsFileOptions, module.exports);
						return;
					}
					_src_class_AwsFileOptions = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_s3_aws_write;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = _src_s3_client;
var path_1 = _src_s3_utils_path;
var mime = require("mime-types");
var atma_utils_1 = require("atma-utils");
var Gzip_1 = _src_utils_Gzip;
var AwsFileOptions_1 = _src_class_AwsFileOptions;
function aws_write(path, data, options) {
    return __awaiter(this, void 0, void 0, function () {
        var client, params, setts, buffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = client_1.client_ensure();
                    params = path_1.path_parse(path);
                    setts = new AwsFileOptions_1.AwsFileOptions(options);
                    buffer = typeof data === 'string'
                        ? Buffer.from(data)
                        : data;
                    if (!(setts.ContentEncoding === 'gzip')) return [3 /*break*/, 2];
                    return [4 /*yield*/, Gzip_1.Gzip.compress(buffer)];
                case 1:
                    buffer = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                        client.putObject({
                            Bucket: params.bucket,
                            Key: params.key,
                            Body: buffer,
                            ACL: setts.ACL || 'public-read',
                            CacheControl: setts.CacheControl || 'max-age=3600, public',
                            ContentType: setts.ContentType || mime.lookup(path) || 'application/octet-stream',
                            ContentEncoding: setts.ContentEncoding
                        }, function (error, buffer) {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve();
                        });
                    })];
            }
        });
    });
}
exports.aws_write = aws_write;
function aws_writeMeta(path, meta) {
    var client = client_1.client_ensure();
    var fromParams = path_1.path_parse(path);
    var toParams = path_1.path_parse(path);
    var copyRequestParams = {
        CopySource: fromParams.bucket + "/" + fromParams.key,
        Bucket: toParams.bucket,
        Key: toParams.key,
        ACL: 'public-read',
        CacheControl: 'max-age=3600, public',
        ContentType: mime.lookup(path) || 'application/octet-stream',
        MetadataDirective: 'replace'
    };
    if (meta) {
        atma_utils_1.obj_extend(copyRequestParams, meta);
    }
    return new Promise(function (resolve, reject) {
        client.copyObject(copyRequestParams, function (error, result) {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}
exports.aws_writeMeta = aws_writeMeta;
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
var mime = require("mime-types");
var AwsFileOptions_1 = _src_class_AwsFileOptions;
function aws_copy(from, to, options) {
    var client = client_1.client_ensure();
    var fromParams = path_1.path_parse(from);
    var toParams = path_1.path_parse(to);
    var setts = new AwsFileOptions_1.AwsFileOptions(options);
    return new Promise(function (resolve, reject) {
        client.copyObject({
            CopySource: fromParams.bucket + "/" + fromParams.key,
            Bucket: toParams.bucket,
            Key: toParams.key,
            ACL: setts.ACL || 'public-read',
            CacheControl: setts.CacheControl || 'max-age=3600, public',
            ContentType: setts.ContentType || mime.lookup(to) || 'application/octet-stream',
            ContentEncoding: setts.ContentEncoding,
            MetadataDirective: 'replace'
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
        pipeCallback(aws_write_1.aws_write(path, content, options && options.s3), cb);
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
        var opts = {
            Bucket: params.bucket,
            MaxKeys: MaxKeys,
            Prefix: params.key
        };
        doPagination(client, opts, [], function (err, paths) {
            if (err) {
                reject(err);
                return;
            }
            resolve(paths);
        });
    });
}
function doPagination(client, params, paths, onComplete) {
    client.listObjects(params, function (err, data) {
        if (err) {
            onComplete(err);
            return;
        }
        var count = data.Contents.length;
        if (count !== 0) {
            var arr = data.Contents.map(function (x) { return "s3://" + params.Bucket + "/" + x.Key; });
            paths = paths.concat(arr);
            if (data.IsTruncated) {
                params.Marker = data.NextMarker || data.Contents[data.Contents.length - 1].Key;
                if (params.MaxKeys != null && !isNaN(params.MaxKeys) && isFinite(params.MaxKeys)) {
                    params.MaxKeys -= count;
                    if (params.MaxKeys < 1) {
                        onComplete(null, paths);
                    }
                }
                doPagination(client, params, paths, onComplete);
                return;
            }
        }
        onComplete(null, paths);
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
var aws_write_1 = _src_s3_aws_write;
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
        var options = app.config.$get('settings.atma-io-transport-s3');
        $transport.setOptions(options);
    };
    /** Atma.Plugin */
    Middleware.prototype.register = function (appcfg) {
        var options = appcfg.$get('settings.atma-io-transport-s3');
        $transport.setOptions(options);
    };
    /** Utils **/
    Middleware.prototype.writeFileMetaAsync = function (path, meta) {
        return aws_write_1.aws_writeMeta(path, meta);
    };
    return Middleware;
}());
;
register(dependencies_1.io);
register(dependencies_1.packageIo);
function register($io, options) {
    if ($io == null || $io.File == null || $io.File.registerTransport == null) {
        return;
    }
    $io.File.registerTransport('s3', $transport);
}
exports["default"] = new Middleware;

				
				}());
				// end:source ./templates/RootModule.js
				