require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../../pages/index/index');
require('../../pages/detail/detail');
require('../../pages/card/card');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
