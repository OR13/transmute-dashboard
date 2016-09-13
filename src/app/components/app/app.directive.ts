import {IRootScopeService} from '../../index.run';
import {IUser} from '../../api/user.service'

/** @ngInject */
export function transmuteApp(): angular.IDirective {

    return {
        restrict: 'A',
        controller: BBAppController,
        controllerAs: 'bbAppCtrl'
    };

}

/** @ngInject */
export class BBAppController {
    public bodyClass: string;

    constructor(
        public $state: angular.ui.IStateService,
        public $window: angular.IWindowService,
        private $scope: angular.IScope,
        private $log: angular.ILogService,
        public $rootScope: IRootScopeService,
        private $mdSidenav: angular.material.ISidenavService
    ) {

        this.bodyClass = $state.current.name;
        // this.$log.warn($state.current)

        $rootScope.$watch(() => {
            return $state.current.name;
        }, (stateName: string) => {

            if (stateName) {
                // $log.debug('state: ', stateName)
                this.bodyClass = stateName;
                // this.$log.log($state.current)
            }

        })
    }
}
