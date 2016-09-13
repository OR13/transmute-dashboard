
import {IRootScopeService } from '../../../index.run';
import { AtlasWearablesService, } from '../../../api/atlaswearables.service';
import { AccountService, ILocalAccount } from '../../../api/account.service';

import { IUser } from '../../../api/user.service';

export class AtlasWearablesConfigController {

    public awConfig: any;

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
        public AtlasWearablesService: AtlasWearablesService
    ) {

        // this.awConfig = this.AtlasWearablesService.initializeConfig();

        // this.$log.debug('this.awConfig: ', this.awConfig)

        this.watchLocalAccount();

    }

    public watchLocalAccount = () => {
        this.$scope.$watch(() => {
            return this.AccountService.Local;
        }, (localAccount: ILocalAccount) => {

            this.$log.debug('localAccount: ', localAccount)

            if (localAccount) {
                if (localAccount.AtlasWearables) {
                    this.awConfig = angular.copy(localAccount.AtlasWearables);
                }
            }

        })
    }

    public saveConfig = () => {
        this.AtlasWearablesService.saveAtlasWearablesConfig(this.awConfig);
    }

}
