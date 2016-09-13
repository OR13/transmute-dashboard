import {IRootScopeService} from '../../index.run';
import {ConversationService, IConversationMessages} from '../../api/conversation.service'

/** @ngInject */
export function appConversation(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {
        conversation: '='
    },
    templateUrl: 'app/components/conversation/conversation.partial.html',
    controller: ConversationController,
    controllerAs: 'conversationCtrl',
    bindToController: true
  };

}

/** @ngInject */
export class ConversationController {
    
  public conversation: IConversationMessages;

  constructor(
    public $window: angular.IWindowService,
    private $scope: angular.IScope,
    private $log: angular.ILogService,
    public $rootScope: IRootScopeService,
    public ConversationService: ConversationService
  ) {

 
  }

 

}
