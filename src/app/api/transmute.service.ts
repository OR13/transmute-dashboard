
import {IRootScopeService} from '../index.run';

export class TransmuteService {

    public welcomeMessages: Array<string>;
    
    /** @ngInject */
    constructor(
        private $log: angular.ILogService
    ) {
        this.welcomeMessages =  [`Hi! I'm TransmuteBot`, `I'm waking up...`];
    }
    
}