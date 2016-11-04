/**
 * Created by Shariar Shaikot on 10/5/16.
 */
const {BrowserWindow} = require('electron');

class AppLoaderCtrl {
  constructor($timeout) {
    $timeout(() => {
      require('./main').resize();
    }, 3000);
  }
}
AppLoaderCtrl.$inject = ['$timeout'];
export default AppLoaderCtrl;
