/**
 * Created by Shariar Shaikot on 9/30/16.
 */
import config from './config';
import AppLoaderCtrl from './controllers/AppLoaderCtrl';

export default angular.module('vdoDX-app', ['ui.router', 'ngMaterial'])
  .config(config)
  .controller('AppLoaderCtrl', AppLoaderCtrl);