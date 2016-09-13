
import {IRootScopeService} from '../index.run';
import {DirectLineService} from './direct-line.service';

import {AccountService} from './account.service';

export interface IUser {
    uid: string;
    displayName: string;
    isAnonymous: boolean;
    refreshToken: string;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}


export class UserService {

    public login: ILoginCredentials;
    public user: IUser;

    public onLoginToast: ng.material.ISimpleToastPreset;

    /** @ngInject */
    constructor(
        private $log: angular.ILogService,
        private $http: angular.IHttpService,
        private $window: angular.IWindowService,
        private $q: angular.IQService,
        private $mdToast: angular.material.IToastService,
        private $state: angular.ui.IStateService,
        private $rootScope: IRootScopeService,
        public DirectLineService: DirectLineService,
        public AccountService: AccountService
    ) {

    }

    public toastLogin = () => {
        var t = this.$mdToast.simple();
        t.content(`logged in as ${this.user.uid}`);
        t.position('bottom left');
        this.$mdToast.show(t);
    }

    public loadSessionUser = (): angular.IPromise<IUser> => {

        var deferred = this.$q.defer();

        this.$rootScope.App.firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                this.$log.debug('onAuthStateChanged: ', user);
                this.user = user;

                // user.getToken()
                //     .then((token) => {
                //         this.$log.debug('token: ', token);
                //     })
                // this.$log.debug('user.refreshToken: ', this.user.refreshToken);

                this.toastLogin();
                deferred.resolve(this.user);
            } else {
                this.$log.debug('onAuthStateChanged: ', 'user is logged out.');
                this.user = null;

                this.$state.go('firebase');

                deferred.reject("User is logged out");
            }

        });

        return deferred.promise;

    }

    public signInWithGithub = () => {

        var deferred = this.$q.defer();

        var w: any = window;
        var provider = new w.firebase.auth.GithubAuthProvider();

        this.$log.debug('provider: ', provider)

        this.$rootScope.App.firebase.auth().signInWithPopup(provider)
            .catch((error) => {
                this.$log.error('signInAnonymously failed: ', error);
            });

        return deferred.promise;

    }

    public loginUserForDemo = () => {

        var deferred = this.$q.defer();

        this.$rootScope.App.firebase.auth().signInAnonymously()
            .catch((error) => {
                this.$log.error('signInAnonymously failed: ', error);
            });

        return deferred.promise;

    }

    public logout = (): angular.IPromise<any[]> => {

        var deferred = this.$q.defer();
        this.$rootScope.App.firebase.auth().signOut().then(() => {
            // Sign-out successful.
            deferred.resolve(true);
        }, (error) => {
            // An error happened.
            deferred.reject(error);
        });

        return deferred.promise;;
    }

}