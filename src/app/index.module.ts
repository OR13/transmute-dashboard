/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from '../app/index.config';
import { routerConfig } from '../app/index.route';
import { runBlock } from '../app/index.run';
import { MainController } from '../app/main/main.controller';

import { SecurityService} from '../app/api/security.service';
import { EthereumService} from '../app/api/ethereum.service';


import { FirebaseService} from '../app/api/firebase.service';
import { FirebaseConfigController } from '../app/account/firebase/config/firebase.config.controller';


import { AtlasWearablesService} from '../app/api/atlaswearables.service';
import { AtlasWearablesConfigController } from '../app/account/atlaswearables/config/atlaswearables.config.controller';


import { GDAXService} from '../app/api/gdax.service';
import { GDAXConfigController } from '../app/account/gdax/config/gdax.config.controller';

import { GDAXExchangeController } from '../app/account/gdax/exchange/gdax.exchange.controller';


import { BotframeworkConfigController } from '../app/account/botframework/config/botframework.config.controller';


import { AccountService} from '../app/api/account.service';
import { AccountController } from '../app/account/account.controller';

import { LoginController } from '../app/account/login/login.controller';
import { LogoutController } from '../app/account/logout/logout.controller';


import { DirectLineService} from '../app/api/direct-line.service';
import { UserService} from '../app/api/user.service';
import { ConversationService} from '../app/api/conversation.service';

import { TransmuteService} from '../app/api/transmute.service';


import { malarkeyTags } from '../app/components/malarkey/malarkey.directive';
import { renderedParticles } from '../app/components/particles/particles.directive';

import { appNavbar } from '../app/components/navbar/navbar';
import { appConversation } from '../app/components/conversation/conversation.directive';
import { appConversationMessage } from '../app/components/conversation/message/message.directive';

import { transmuteApp } from '../app/components/app/app.directive'


declare var malarkey: any;
declare var particlesJS: any;
declare var moment: moment.MomentStatic;
declare var Firebase: any;
declare var jQuery: any;


angular.module('TransmuteApp', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ngResource',
    'angularMoment',
    'ui.router',
    'ngMaterial',
    'toastr',
    'LocalStorageModule',
    'chart.js'
])
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('particlesJS', particlesJS)

    .config(config)
    .config(routerConfig)


    .run(runBlock)

    .directive('transmuteApp', transmuteApp)

    .controller('MainController', MainController)

    .service('UserService', UserService)

    .service('ConversationService', ConversationService)
    .service('TransmuteService', TransmuteService)

    .service('EthereumService', EthereumService)
    .service('SecurityService', SecurityService)


    .service('AccountService', AccountService)
    .controller('AccountController', AccountController)
    .controller('BotframeworkConfigController', BotframeworkConfigController)


    .service('FirebaseService', FirebaseService)
    .controller('FirebaseConfigController', FirebaseConfigController)

    .service('AtlasWearablesService', AtlasWearablesService)
    .controller('AtlasWearablesConfigController', AtlasWearablesConfigController)


    .service('GDAXService', GDAXService)
    .controller('GDAXConfigController', GDAXConfigController)
    .controller('GDAXExchangeController', GDAXExchangeController)


    .controller('LoginController', LoginController)
    .controller('LogoutController', LogoutController)

    .service('DirectLineService', DirectLineService)

    .directive('appNavbar', appNavbar)
    .directive('appConversation', appConversation)
    .directive('appConversationMessage', appConversationMessage)
    .directive('malarkeyTags', malarkeyTags)
    .directive('renderedParticles', renderedParticles);


