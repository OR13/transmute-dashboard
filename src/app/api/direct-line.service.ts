
import {IRootScopeService} from '../index.run';
import {IUser} from './user.service'
import {AccountService} from './account.service'

export interface IConversation {
    conversationId: string;
    token: string;
}

export interface IConversationMessages {
    messages: Array<any>;
}

export interface IProtoBot {
    DirectLineSecret: string;
}

export class DirectLineService {

    public TransmuteBot: IProtoBot;
    
    public conversationToken: string;

    /** @ngInject */
    constructor(
        private $log: angular.ILogService,
        private $http: angular.IHttpService,
        private $window: angular.IWindowService,
        private $q: angular.IQService,
        private $mdToast: angular.material.IToastService,
        private $state: angular.ui.IStateService,
        private $rootScope: IRootScopeService
    ) {

        // this.$rootScope.$watch(() => {
        //     return this.$rootScope.App.UserService.user;
        // }, (user: IUser) => {
        //     if (user) {
        //         var creatorBotRef = this.$rootScope.App.fbRef.child(`TransmuteBot`);
        //         this.TransmuteBot = this.$firebaseObject(creatorBotRef);
        //     }
        // })

        // this.$rootScope.$watch(() => {
        //     return this.TransmuteBot;
        // }, (creatorBot: ICreatorBot) => {
        //     if (creatorBot) {

        //         this.$rootScope.$watch(() => {
        //             return this.$rootScope.App.AccountService.account;
        //         }, (account: IUser) => {
        //             if (account) {
        //                 if (!this.$rootScope.App.AccountService.account.Token) {

        //                     this.postTokensConversation(creatorBot.DirectLineSecret)
        //                         .then((token: string) => {
        //                             this.$rootScope.App.AccountService.account.Token = token;
        //                         })
        //                 }

        //             }
        //         })


        //     }
        // })

        // if (!this.account.Token) {
        //             this.DirectLineService.postTokensConversation()
        //                 .then((token: string) => {
        //                     this.$rootScope.App.AccountService.account.Token = token;
        //                 })
        //         }

        // $log.debug('DirectLineService...')

        // this.DirectLineService.getDirectLineSecret()
        //     .then(() => {
        //         this.$log.debug('got secret...', this.DirectLineService.DirectLineSecret);

        //         this.AccountService.getAccountToken(authData.uid)
        //             .then((accountToken: string) => {
        //                 if (accountToken) {
        //                     this.$log.debug('got accountToken ', accountToken);
        //                 } else {
        //                     this.$log.debug('get and save accountToken ', accountToken);

        //                     this.DirectLineService.postTokensConversation(this.DirectLineService.DirectLineSecret)
        //                         .then((token: string) => {
        //                             this.AccountService.setAccountToken(authData.uid, token);
        //                         });
        //                 }
        //             })

        //     });

    }

    // POST /api/tokens/conversation

    public postTokensConversation = (secret): angular.IPromise<string> => {

        var req = {
            method: 'POST',
            url: 'https://directline.botframework.com/api/tokens/conversation',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `BotConnector ${secret}`
            },
            data: {}
        }
        return this.$http(req).then((success) => {
            // this.$log.debug('postTokensConversation: ', success)
            return success.data.toString();
        }, (error) => {
            this.$log.error(error)
        })
    }

    // /api/tokens/{conversationId}/renew

    public renew = (token: string, conversationId: string): angular.IPromise<string> => {

        var req = {
            method: 'GET',
            url: `https://directline.botframework.com/api/tokens/${conversationId}/renew`,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `BotConnector ${token}`
            },
            data: {}
        }
        return this.$http(req).then((success) => {
            return success.data.toString();
        }, (error) => {
            this.$log.error(error)
        })
    }


    // POST /api/conversations
    public postConversatons = (token: string): angular.IPromise<IConversation> => {

        var req = {
            method: 'POST',
            url: 'https://directline.botframework.com/api/conversations',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `BotConnector ${token}`
            },
            data: {
                
            }
        }
        return this.$http(req).then((success) => {
            // this.$log.debug('postConversatons ', token , success.data)
            return success.data;
        }, (error) => {
            this.$log.error(error)
        })
    }

    // GET /api/conversations/{conversationId}/messages

    public getConversationMessages = (token: string, conversationId: string): angular.IPromise<IConversationMessages> => {
        // this.$log.debug('getConversationMessages ', token, conversationId);
        var req = {
            method: 'GET',
            url: `https://directline.botframework.com/api/conversations/${conversationId}/messages`,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `BotConnector ${token}`
            }
        }
        return this.$http(req).then((success) => {
            return success.data;
        }, (error) => {
            this.$log.error(error)
        })
    }

    // POST /api/conversations/{conversationId}/messages

    public postMessage = (token: string, conversationId: string, message: string, message_from: string): angular.IPromise<any> => {
        // this.$log.debug('postMessage ', token, conversationId, message);
        var req = {
            method: 'POST',
            url: `https://directline.botframework.com/api/conversations/${conversationId}/messages`,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `BotConnector ${token}`
            },
            data: {
                conversationId: conversationId,
                text: message,
                from: message_from
            }
        }
        return this.$http(req).then((resolvedPromise) => {
            // this.$log.debug('postMessage response', resolvedPromise)
            return resolvedPromise.data;
        }, (error) => {
            this.$log.error(error)
        })
    }

}