angular
    .module('app')
    .config(router);
        
function router($stateProvider, $urlRouterProvider) {
    $stateProvider
        // .state('tab', {
        //     url: '/tab',
        //     abstract: true,
        //     templateUrl: 'views/tabs.html'
        // })
        // .state('tab.opentabs', {
        //     url: '/opentabs',
        //     views: {
        //         'tab-opentabs': {
        //             templateUrl: 'views/tab-opentabs.html',
        //             controller: 'OpenTabCtrl'
        //         }
        //     }
        // })
        // .state('tab.opentab-bill', {
        //     url: '/opentabs/:tabID',
        //     views: {
        //         'tab-opentabs': {
        //             templateUrl: 'views/opentabs-bill.html',
        //             controller: 'BillCtrl'
        //         }
        //     }
        // })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
    $urlRouterProvider.otherwise('login');
};