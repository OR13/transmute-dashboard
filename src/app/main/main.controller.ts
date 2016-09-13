
import {IRootScopeService } from '../index.run';
import { DirectLineService, IConversation} from '../api/direct-line.service';
import { ConversationService, IConversationMessages, IMessage} from '../api/conversation.service';

import { UserService } from '../api/user.service';
export class MainController {

    public isLoading: boolean;
    public isUserLoggedIn: boolean;
  
    public newMessageText: string;

    /* @ngInject */
    constructor(
        public $scope: angular.IScope,
        public $mdSidenav: angular.material.ISidenavService,
        public $http: angular.IHttpService,
        public $log: angular.ILogService,
        public $rootScope: IRootScopeService,
        public $timeout: angular.ITimeoutService,
        public $interval: angular.IIntervalService,
        public toastr: any,
        public UserService: UserService,
        public DirectLineService: DirectLineService,
        public ConversationService: ConversationService


    ) {
        this.isLoading = true;
        this.isUserLoggedIn = false;
        this.watchUserService();
    }

    public watchUserService = () => {
        this.$scope.$watch(() => {
            return this.$rootScope.App.UserService.user;
        }, (user) => {
            this.isLoading = false;
            if (user) {
                this.isUserLoggedIn = true;
                // this.watchDirectLineSecet();
            }
        })
    }
    
    // public watchDirectLineSecet = () => {
    //     this.$scope.$watch(() => {
    //         return "i6BEvs1ObaU.cwA.XIc.Rw61Y1X4yRp2Pr6qmoGgdWyTfiB9eGbuYBKgzCOWU_4";
    //     }, (secret: string) => {
    //         if (secret) {
    //             this.ConversationService.startAnonymousConversation(secret);
    //         }

    //     })
    // }


    public sendMessage = (messageForm) => {
        // this.$log.debug('sending message...');
        var message = angular.copy(this.newMessageText);
        this.newMessageText = '';
        this.ConversationService.sendMessage(message, this.ConversationService.fromId)
            .then((result) => {
               
                // this.$log.debug('sent message ', result)
            })



    }







}
