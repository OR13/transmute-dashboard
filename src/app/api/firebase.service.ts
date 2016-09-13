
import {IRootScopeService} from '../index.run';


import {SecurityService} from './security.service';
import {AccountService} from './account.service';

declare var sjcl: any;

export interface IFirebaseConfig {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    storageBucket: string;
};

export class FirebaseService {

    /** @ngInject */
    constructor(
        private $timeout: angular.ITimeoutService,
        private $log: angular.ILogService,
        private $http: angular.IHttpService,
        private $window: angular.IWindowService,
        private $q: angular.IQService,
        private $mdToast: angular.material.IToastService,
        private $state: any,
        private $rootScope: IRootScopeService,
        private localStorageService: any,
        private SecurityService: SecurityService,
        private AccountService: AccountService
    ) {

    }

}