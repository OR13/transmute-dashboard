
import {UserService} from './api/user.service'
import {TransmuteService} from './api/transmute.service'
import {EthereumService} from './api/ethereum.service'

import {DirectLineService} from './api/direct-line.service'
import {AccountService} from './api/account.service'

import {IFirebaseConfig} from './api/firebase.service'

export interface IRegisteredBusyBot {
    Name: string;
}

export interface ITransmuteIndustriesConfig {
    Version: string;
    firebase: any;
    firebaseConfig: IFirebaseConfig;
    TransmuteService: TransmuteService;
    UserService: UserService;
    AccountService: AccountService;
    DirectLineService: DirectLineService;
    EthereumService: EthereumService;
}

export interface IRootScopeService extends angular.IRootScopeService {
    App: ITransmuteIndustriesConfig

}

/** @ngInject */
export function runBlock(
    $location: any,
    $timeout: angular.ITimeoutService,
    $log: angular.ILogService,
    $rootScope: IRootScopeService,
    $state: any,
    UserService: UserService,
    AccountService: AccountService,
    DirectLineService: DirectLineService,
    TransmuteService: TransmuteService,
    EthereumService: EthereumService
) {

    if (window.location.host === 'gordias.transmute.industries' && window.location.protocol != "https:") {
        window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
    }

    

    var w = <any>window;

    $rootScope.App = <ITransmuteIndustriesConfig>{};
    $rootScope.App.firebaseConfig = {
        apiKey: "AIzaSyBmqo71zTPpZ9aF-RNCtv4XuQl86rL9Qw0",
        authDomain: "project-6582009982322667069.firebaseapp.com",
        databaseURL: "https://project-6582009982322667069.firebaseio.com",
        storageBucket: "project-6582009982322667069.appspot.com",
    };
    $rootScope.App.firebase = w.firebase.initializeApp($rootScope.App.firebaseConfig);
    $rootScope.App.Version = '0.0.0';
    $rootScope.App.UserService = UserService;
    $rootScope.App.TransmuteService = TransmuteService;
    $rootScope.App.DirectLineService = DirectLineService;
    $rootScope.App.AccountService = AccountService;
    $rootScope.App.EthereumService = EthereumService;

    UserService.loadSessionUser()

    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params, {location: 'replace'})
      }
    });

    // $log.debug('App', $rootScope.App);

}
