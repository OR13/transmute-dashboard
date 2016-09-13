
import {IRootScopeService } from '../index.run';
import { AccountService, } from '../api/account.service';
import { IUser } from '../api/user.service';

export class AccountController {

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

    
        this.$state.go('account.firebase');

    }

 

}
