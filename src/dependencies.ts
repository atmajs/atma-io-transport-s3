import * as utils from 'atma-utils'
import * as packageIo from 'atma-io';

let globalIo: typeof packageIo = (<any>global).io;
if (globalIo == null || globalIo.File == null) {
    globalIo = packageIo;
}

export { globalIo as io, packageIo, utils }

