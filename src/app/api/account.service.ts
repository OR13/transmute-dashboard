
import { IRootScopeService } from '../index.run';
import { IUser } from './user.service';

import { SecurityService } from './security.service';

import { IAtlasWearablesConfig } from './atlaswearables.service';


export interface IGDAXConfig{

}

export interface ILocalAccount {
    AtlasWearables: IAtlasWearablesConfig;
    GDAX: IGDAXConfig;
}

export class AccountService {

    public Local: ILocalAccount;
    public accountSecret: string;

    public isLoading: boolean;

    public hasAccountSecret: boolean;
    public isAccountNew: boolean;

    /** @ngInject */
    constructor(
        private $log: angular.ILogService,
        private $http: angular.IHttpService,
        private $window: angular.IWindowService,
        private $q: angular.IQService,
        private $state: any,
        private $rootScope: IRootScopeService,
        private SecurityService: SecurityService

    ) {

        // SecurityService.init();

        this.isLoading = true;
        this.isAccountNew = true;

        this.accountSecret = this.getAccountSecret();

        this.watchAccountSecret();

        // this.$log.debug('hasAccountSecret: ', this.hasAccountSecret);

        // watches user object and syncs it with account through rootscope
        this.$rootScope.$watch(() => {
            return this.$rootScope.App.UserService.user;
        }, (user: IUser) => {

            if (user) {

                this.getEncryptedAccount()
                    .then((encryptedAccount: any) => {
                        // this.$log.debug('got encryptedAccount: ', encryptedAccount);
                        this.isAccountNew = encryptedAccount === null;
                        // this.$log.debug('isAccountNew: ', this.isAccountNew);
                        // encryptedAccount = JSON.stringify(encryptedAccount);
                        if (!this.isAccountNew) {
                            delete encryptedAccount['__proto__'];
                            this.Local = this.SecurityService.decryptObject(this.accountSecret, encryptedAccount);
                            
                            this.$log.debug('Local: ', this.Local);
                        }
                        this.isLoading = false;
                    }).catch((data)=>{
                        this.$log.debug(' aaasdfdasf ', data)
                    })
            } else {
                this.Local = <any>{};
                this.Local.AtlasWearables = <any>{};
            }
        })
    }

    public watchAccountSecret = () => {

        this.$rootScope.$watch(() => {
            return this.accountSecret;
        }, () => {
            this.hasAccountSecret = this.accountSecret !== undefined && this.accountSecret !== null && this.accountSecret !== '';
            this.$log.debug('hasAccountSecret: ', this.hasAccountSecret);
            this.$log.debug('accountSecret: ', this.accountSecret);
        })

    }

    public getAccountSecret = (): string => {
        return this.SecurityService.getAccountSecret();
    }

    public saveAccount = () => {
        var cipherText = this.SecurityService.encryptObject(this.accountSecret, this.Local);
        this.saveEncryptedAccount(cipherText);
    }

    public deleteAccountAndSecret = () => {

        this.accountSecret = null
        this.saveAccountSecret(this.accountSecret)
        this.saveEncryptedAccount(null);
    }

    public saveAccountSecret = (accountSecret: string) => {
        this.accountSecret = accountSecret;
        this.SecurityService.saveAccountSecret(accountSecret);
    }

    public saveEncryptedAccount = (cipherTextAsJson: any): angular.IPromise<any> => {
        var uid = this.$rootScope.App.UserService.user.uid;
        var defered = this.$q.defer();
        this.$rootScope.App.firebase.database().ref(`Accounts/${uid}`)
            .set(cipherTextAsJson)
        defered.resolve(cipherTextAsJson);
        return defered.promise;
    }

    public getEncryptedAccount = (): angular.IPromise<any> => {
        var uid = this.$rootScope.App.UserService.user.uid;

        var defered = this.$q.defer();
        this.$rootScope.App.firebase.database().ref(`Accounts/${uid}`)
            .on('value', (snapshot) => {
                var encryptedObject = snapshot.val();
                defered.resolve(encryptedObject)
            });

        return defered.promise;

    }



}