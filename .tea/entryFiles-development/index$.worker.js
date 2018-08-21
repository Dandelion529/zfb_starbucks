require('./config$');

function success() {
require('../..//app');
require('../../component/map/map');
require('../../pages/index/index');
require('../../pages/detail/detail');
require('../../pages/card/card');
require('../../pages/map/map');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
