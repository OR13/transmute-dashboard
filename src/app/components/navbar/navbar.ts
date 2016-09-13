import {IRootScopeService} from '../../index.run';
import {IUser} from '../../api/user.service'

/** @ngInject */
export function appNavbar(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/navbar/navbar.html',
    controller: NavbarController,
    controllerAs: 'vm',
    bindToController: true
  };

}

/** @ngInject */
export class NavbarController {
  public user: IUser;

  constructor(
    public $window: angular.IWindowService,
    private $scope: angular.IScope,
    private $log: angular.ILogService,
    public $rootScope: IRootScopeService,
    private $mdSidenav: angular.material.ISidenavService
   
  ) {

    // this.user = $rootScope.App.UserService.user;

    $scope.$watch(() => {
      return this.$rootScope.App.UserService.user;
    }, (user: IUser) => {
      this.user = user;
    })

  }

  public close = function () {
    this.$mdSidenav('bb-navbar-sidenav-right').close()
      .then(() => {
        this.$log.debug("close RIGHT is done");
      });
  };

  public isOpenRight = () => {
    return this.$mdSidenav('right').isOpen();
  };

  public toggleSidenav = () => {
    this.$mdSidenav('right')
      .toggle()
      .then(() => {
        this.$log.debug("right is done");
       
      });
  }



}
