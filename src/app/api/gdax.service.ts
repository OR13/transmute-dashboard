

import {IRootScopeService} from '../index.run';

import {SecurityService} from './security.service';
import {AccountService} from './account.service';

export interface IGDAXConfig {
    Username: string;
    Sid: string;
    Secret: string;
};

export class GDAXService {

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

    public saveConfig = (config: IGDAXConfig) => {
        this.AccountService.Local.GDAX = config;
        this.AccountService.saveAccount();
    }

}
