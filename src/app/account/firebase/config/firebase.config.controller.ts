
import {IRootScopeService } from '../../../index.run';
import { FirebaseService, } from '../../../api/firebase.service';
import { AccountService, } from '../../../api/account.service';
import { IUser } from '../../../api/user.service';

export class FirebaseConfigController {

    public showPlainText: boolean;
    public accountSecret: string;

    public firebaseConfig: any;


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
        public FirebaseService: FirebaseService,
        public AccountService: AccountService
    ) {


        this.firebaseConfig = $rootScope.App.firebaseConfig;

        this.$log.debug('this.firebaseConfig: ', this.firebaseConfig)

        this.showPlainText = false;

        this.watchAccountSecret();

    }

    public watchAccountSecret = () => {
        this.$scope.$watch(() => {
            return this.AccountService.accountSecret;
        }, (accountSecret) => {
            this.accountSecret = accountSecret;
        })
    }

    public toggleShowPlainText = () => {
        this.showPlainText = !this.showPlainText;

        if (this.showPlainText) {
            $('#input_0').attr('type', 'text')
            // console.log();
        } else {
            $('#input_0').attr('type', 'password')
            // console.log($('#input_0'));
        }
    }


    public saveAccountSecret = () => {
        this.AccountService.saveAccountSecret(this.accountSecret);
    }

}
