/** @ngInject */
export function routerConfig($stateProvider: any, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'mainCtrl'
    })

    .state('clone', {
      url: '/clone',
      templateUrl: 'app/clone/clone.partial.html',
      controller: 'CloneController',
      controllerAs: 'cloneCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'app/account/login/login.html',
      controller: 'LoginController',
      controllerAs: 'loginController'
    })

    .state('logout', {
      url: '/logout',
      templateUrl: 'app/account/logout/logout.html',
      controller: 'LogoutController',
      controllerAs: 'logoutController'
    })


    .state('account', {
      url: '/account',
      templateUrl: 'app/account/account.html',
      controller: 'AccountController',
      controllerAs: 'accountController',
      redirectTo: 'account.firebase'
    })

    .state('account.botframework', {
      url: '/botframework',
      templateUrl: 'app/account/botframework/config/botframework.config.html',
      controller: 'BotframeworkConfigController',
      controllerAs: 'botframeworkConfigCtrl'
    })

    .state('account.firebase', {
      url: '/firebase',
      templateUrl: 'app/account/firebase/config/firebase.config.html',
      controller: 'FirebaseConfigController',
      controllerAs: 'firebaseConfigCtrl'
    })

    .state('account.atlaswearables', {
      url: '/atlaswearables',
      templateUrl: 'app/account/atlaswearables/config/atlaswearables.config.html',
      controller: 'AtlasWearablesConfigController',
      controllerAs: 'atlasWearablesConfigCtrl'
    })

    .state('account.gdax', {
      url: '/gdax',
      templateUrl: 'app/account/gdax/config/gdax.config.html',
      controller: 'GDAXConfigController',
      controllerAs: 'gdaxConfigCtrl'
    })

    .state('exchange', {
      url: '/exchange',
      templateUrl: 'app/account/gdax/exchange/gdax.exchange.html',
      controller: 'GDAXExchangeController',
      controllerAs: 'gdaxExchangeCtrl'
    })

  
  $urlRouterProvider.otherwise('/');
}
