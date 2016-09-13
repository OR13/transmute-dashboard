
import {IRootScopeService } from '../../../index.run';
import { GDAXService } from '../../../api/gdax.service';

import { AccountService, ILocalAccount } from '../../../api/account.service';

import { IUser } from '../../../api/user.service';

export class GDAXConfigController {

    public gdaxConfig: any;

    /* @ngInject */
    constructor(
        public $scope: angular.IScope,
        public $mdSidenav: angular.material.ISidenavService,
        public $http: angular.IHttpService,
        public $log: angular.ILogService,
        public $rootScope: IRootScopeService,
        public $timeout: angular.ITimeoutService,
        public toastr: any,
        public $state: any,
        public AccountService: AccountService,
        public GDAXService: GDAXService
    ) {

        this.watchLocalAccount();

    }

    public watchLocalAccount = () => {
        this.$scope.$watch(() => {
            return this.AccountService.Local;
        }, (localAccount: ILocalAccount) => {

            this.$log.debug('localAccount: ', localAccount)

            if (localAccount) {
                if (localAccount.GDAX) {
                    this.gdaxConfig = angular.copy(localAccount.GDAX);
                }
            }

        })
    }

    public saveConfig = () => {
        this.GDAXService.saveConfig(this.gdaxConfig);
    }

}
