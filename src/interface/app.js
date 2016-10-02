/**
 * Created by Shariar Shaikot on 9/30/16.
 */
angular.module('vdoDX-app', ['ngMaterial'])
  .config(($mdIconProvider, $mdThemingProvider) => {
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('light-blue');
  });