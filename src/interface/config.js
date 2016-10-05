/**
 * Created by Shariar Shaikot on 10/3/16.
 */
function config($mdIconProvider, $mdThemingProvider, $stateProvider, $urlRouterProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('purple')
    .accentPalette('deep-purple');

  $urlRouterProvider.otherwise("/");

  $stateProvider.
    state('app', {
      url: '/',
      templateUrl: 'interface/views/loader.html'
    });
}

export default config;