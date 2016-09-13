
interface IParticlesScope extends angular.IScope {

}

/** @ngInject */
export function renderedParticles(malarkey: any): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        template: `<div id="particles-js" layout-fill></div>
        `,
        link: linkFunc,
        controller: ParticlesController,
        controllerAs: 'vm'
    };

}

function linkFunc(scope: IParticlesScope, el: JQuery, attr: any, vm: ParticlesController) {

}

/** @ngInject */
export class ParticlesController {

    constructor(
        public $log: angular.ILogService,
        public particlesJS: any
    ) {
        // $log.debug('Loaded ParticlesController...');

        particlesJS.load('particles-js', 'assets/json/particles/particles.json', function () {
            // $log.debug('callback - particles.js config loaded');
        });


    }

}
