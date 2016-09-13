
import {IRootScopeService} from '../index.run';

declare var Web3: any;

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

export class EthereumService {

    public web3: any;

    /** @ngInject */
    constructor(
        private $timeout: angular.ITimeoutService,
        private $log: angular.ILogService,
        private $http: angular.IHttpService,
        private $window: angular.IWindowService,
        private $q: angular.IQService,
        private $mdToast: angular.material.IToastService,
        private $state: any,
        private $rootScope: IRootScopeService
    ) {

        // this.initEthereum();
    }

    public initEthereum = () => {
        var w: any = window;

        if (typeof w.web3 !== 'undefined') {
            this.web3 = new Web3(w.web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            var provider = new Web3.providers.HttpProvider("http://localhost:8080");
            this.$log.debug('ethereum provider: ', provider);
            if (provider) {
                this.web3 = new Web3(provider);
            }
        }

        try {
            this.$log.debug('web3.eth.accounts: ', this.web3.eth.accounts);

            this.watchAccountByName(this.web3.eth.coinbase, 'coinbase');

            this.$timeout(() => {
                this.watchAccountByName(this.web3.eth.accounts[0], 'account 0 ');
                this.watchAccountByName(this.web3.eth.accounts[1], 'account 1');
            }, 1000)

        } catch (e) {
            this.web3 = undefined;
            this.$log.error('Unable to establish rpc connection.')
        }

        w.web3 = this.web3;
    }

    public toastAccountBalance = (account, balance) => {
        var t = this.$mdToast.simple();
        t.content(`${account}: ${balance}`);
        t.position('top right');
        this.$mdToast.show(t)
    }

    public watchAccountByName = (account: any, name: string) => {

        var originalBalance = this.web3.eth.getBalance(account).toNumber();

        this.$log.debug(`account: ${name} ${account}`);
        this.$log.debug('original balance: ' + originalBalance + '    watching...');

        this.toastAccountBalance(account, originalBalance);

        this.web3.eth.filter('latest').watch(() => {
            var currentBalance = this.web3.eth.getBalance(account).toNumber();
            this.$log.debug('current: ' + currentBalance);
            this.$log.debug('diff:    ' + (currentBalance - originalBalance));

            this.toastAccountBalance(account, currentBalance);

        });




    }


}