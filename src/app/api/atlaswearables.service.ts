
import {IRootScopeService} from '../index.run';


import {SecurityService} from './security.service';
import {AccountService} from './account.service';

declare var sjcl: any;

export interface IAtlasWearablesConfig {
    Username: string;
    Sid: string;
    Secret: string;
};

export class AtlasWearablesService {

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

    public saveAtlasWearablesConfig = (awConfig: IAtlasWearablesConfig) => {
        this.AccountService.Local.AtlasWearables = awConfig;
        this.AccountService.saveAccount();
    }

    // public initializeConfig = (): IAtlasWearablesConfig => {
    //     this.$log.debug('AtlasWearablesService.init()', sjcl)

    //     var config = this.getConfig();

    //     return config;

    // }

    // public setConfig = (config: IAtlasWearablesConfig) => {
    //     var payload = this.SecurityService.encryptObject(this.AccountService.accountSecret, config)
    //     this.localStorageService.set('AtlasWearablesConfig', payload);
    // }

    // public getConfig = (): IAtlasWearablesConfig => {
    //     var payload = this.localStorageService.get('AtlasWearablesConfig');

    //     if (!payload){
    //         return null;
    //     }

    //     return this.SecurityService.decryptObject(this.AccountService.accountSecret, payload)
    // }

}