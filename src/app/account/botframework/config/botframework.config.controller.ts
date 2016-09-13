
import {IRootScopeService } from '../../../index.run';
import { AccountService, } from '../../../api/account.service';
import { IUser } from '../../../api/user.service';

export class BotframeworkConfigController {

    public accountSecret: string;

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
        public AccountService: AccountService
    ) {

        this.$rootScope.$watch(() => {
            return this.$rootScope.App.UserService.user;
        }, (user: IUser) => {

            // this.$log.debug('user: ', user);

            if (user == null) {
                this.$log.debug('Account requires login.');
                this.$state.go('main');
            };

        });

    }

    public saveAccountSecret = () => {
        this.AccountService.saveAccountSecret(this.accountSecret);
    }

    public saveAccount = () => {
        this.AccountService.saveAccount();
    }

}
