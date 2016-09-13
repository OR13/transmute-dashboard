
import {IRootScopeService } from '../../index.run';

import {UserService} from '../../api/user.service'

export class LoginController {

    /* @ngInject */
    constructor(
        public $scope: any,
        public $mdSidenav: any,
        public $http: angular.IHttpService,
        public $log: angular.ILogService,
        public $rootScope: IRootScopeService,
        public $timeout: angular.ITimeoutService,
        public $state: angular.ui.IStateService,
        public toastr: any,
        public UserService: UserService) {

        $log.log('LoginController...', UserService)

    }

    public signInWithGithub = () => {
        this.$log.log('LoginController.loginUserForDemo')
        this.UserService.signInWithGithub().then(() => {
            this.$state.go('main');
        });
    }

}
