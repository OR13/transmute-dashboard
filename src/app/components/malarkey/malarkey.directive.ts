
interface IMalarkeyScope extends angular.IScope {
  tags: Array<string>;
}

/** @ngInject */
export function malarkeyTags(malarkey: any): angular.IDirective {

  return {
    restrict: 'E',
    scope: {
      tags: '='
    },
    template: '&nbsp;',
    link: linkFunc,
    controller: MalarkeyController,
    controllerAs: 'vm'
  };

}

function linkFunc(scope: IMalarkeyScope, el: JQuery, attr: any, vm: MalarkeyController) {

  var typist = vm.malarkey(el[0], {
    typeSpeed: 96,
    deleteSpeed: 40,
    pauseDelay: 800,
    loop: true,
    postfix: ' '
  });

  el.addClass('busybots-malarkey');

  angular.forEach(scope.tags, function(value: string) {
    typist.type(value).pause().delete();
  });

}

/** @ngInject */
export class MalarkeyController {

  constructor(
      private $log: angular.ILogService,
      public malarkey: any) {

  }

}
