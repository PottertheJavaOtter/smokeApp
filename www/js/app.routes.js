angular
    .module('app')
    .config(router);

function router($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('opentabs', {
            url: '/opentabs',
            templateUrl: 'views/opentabs.html',
            controller: 'OpenTabsController as openTabs'
        })
        .state('bills', {
            url: '/opentabs/:tabId',
            templateUrl: 'views/opentabs-bill.html',
            controller: 'BillController as bill'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
    $urlRouterProvider.otherwise('login');
};

