
import {IRootScopeService} from '../index.run';
import {IUser} from './user.service'
import {AccountService} from './account.service'
import {DirectLineService, IConversation} from './direct-line.service'


export interface IMessage {
    conversationId: string;
    attachments: Array<any>;
    created: string;
    eTag: string;
    from: string;
    id: string;
    images: Array<string>;
    text: string;
}

export interface IConversationMessages {
    messages: Array<IMessage>;
    watermark: string;
}

export class ConversationService {

    public conversationId: string;
    public conversationToken: string;
    public conversation: IConversationMessages;

    public pollingForMessages: any;

    public hasMessages: boolean;
    public hasSentMessages: boolean;
    public hasLastMessage: boolean;

    public lastMessage: string;

    public fromId: string;


    /** @ngInject */
    constructor(
        private $log: angular.ILogService,
        private $http: angular.IHttpService,
        private $interval: angular.IIntervalService,
        private $timeout: angular.ITimeoutService,
        private $window: angular.IWindowService,
        private $q: angular.IQService,
        private $mdToast: angular.material.IToastService,
        private $state: angular.ui.IStateService,
        private $rootScope: IRootScopeService,
        private DirectLineService: DirectLineService,
        private AccountService: AccountService
    ) {



    }


    public watchConversationToken = () => {
        this.$rootScope.$watch(() => {
            return this.conversationToken;
        }, (conversationToken: string) => {
            if (conversationToken) {
                this.$log.debug('ConversationService WATCH conversationToken: ', conversationToken);
            }

        });
    }

    public watchConversationId = () => {
        this.$rootScope.$watch(() => {
            return this.conversationId;
        }, (conversationId: string) => {
            if (conversationId) {
                this.$log.debug('ConversationService WATCH conversationId: ', conversationId);
            }

        });
    }

    public startAnonymousConversation = (secret: string) => {

        this.hasMessages = false;
        this.hasSentMessages = false;
        this.hasLastMessage = false;


        this.DirectLineService.postTokensConversation(secret)
            .then((token) => {
                //    this.$log.debug(' what daatz', token)
                this.conversationToken = token;

                this.DirectLineService.postConversatons(this.conversationToken)
                    .then((conversation: IConversation) => {

                        if (conversation) {
                            this.$log.warn('STARTED ', conversation)
                            this.conversationId = conversation.conversationId;
                            // this.conversationToken = conversation.token;
                            this.hasSentMessages = true;
                            this.hasLastMessage = false;
                            this.lastMessage = 'wake';

                            this.DirectLineService.postMessage(this.conversationToken, this.conversationId, this.lastMessage, 'system')
                                .then((data: any) => {
                                    // this.$log.debug('got respo message...', data);
                                    this.pollForMessages();

                                })

                        }

                    });
            })
    }

    public getMessages = () => {
        this.DirectLineService.getConversationMessages(this.conversationToken, this.conversationId)
            .then((data: any) => {
                // this.$log.debug('got messages...', data);
                this.conversation = data;


                if (!this.hasLastMessage) {
                  
                    this.conversation.messages.forEach((message: IMessage) => {

                        // this.$log.debug('message is last? ', this.lastMessage, message.text)
                        if (message.text === this.lastMessage) {
                            this.hasLastMessage = true;
                            this.hasMessages = true;
                            this.fromId = message.from;
                            this.$timeout(() => {
                                $("md-content").scrollTop($("body").height());
                            }, 500)
                            

                        }

                    })
                }



            })
    }


    public pollForMessages = () => {

        if (!this.pollingForMessages) {
            this.pollingForMessages = this.$interval(() => {
                this.getMessages();
            }, 10 * 1000);
        }

        this.getMessages();

        this.$timeout(() => {
            this.$interval.cancel(this.pollingForMessages);
        }, 2 * 60 * 1000)

        // this.$scope.$on('$destroy', () => {
        //     this.$interval.cancel(this.pollingForMessages);
        // });
    }

    public sendMessage = (message: string, from_id: string) => {
        // this.$log.debug('sending message...');

        this.hasSentMessages = true;
        this.hasLastMessage = false;
        this.lastMessage = angular.copy(message);

        return this.DirectLineService.postMessage(this.conversationToken, this.conversationId, message, from_id)
            .then((data: any) => {
                // this.$log.debug('got postMessage response...', data);
                // this.pollForMessages();

            })
    }




}