import {IRootScopeService} from '../../../index.run';
import {ConversationService, IConversationMessages, IMessage} from '../../../api/conversation.service'

import {UserService } from '../../../api/user.service'

/** @ngInject */
export function appConversationMessage(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {
      message: '='
    },
    templateUrl: 'app/components/conversation/message/message.partial.html',
    controller: MessageController,
    controllerAs: 'messageCtrl',
    bindToController: true
  };

}

/** @ngInject */
export class MessageController {

  public message: IMessage;

  constructor(
    public $window: angular.IWindowService,
    private $scope: angular.IScope,
    private $log: angular.ILogService,
    public $rootScope: IRootScopeService,
    public ConversationService: ConversationService,
    public UserService: UserService
  ) {


  }

  public displayAccountName = (from_id: string) => {
    // if (this.UserService.user.isAnonymous && from_id !== 'Proto') {
    //   return this.$rootScope.App.AccountService.account.Name;
    // }
    return from_id;
  }

}
