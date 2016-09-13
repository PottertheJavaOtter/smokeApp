angular
    .module('app')
    .config(router);

function router($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .state('opentabs', {
            url: '/opentabs',
            templateUrl: 'views/opentabs.html',
            controller: 'OpenTabsController as openTabs'
        })        
        .state('createTab', {
            url: '/createTab',
            templateUrl: 'views/createTab.html',
            controller: 'CreateTabController as createTab'
        })
        .state('bill', {
            url: '/opentabs/:tabId',
            templateUrl: 'views/opentabs-bill.html',
            controller: 'BillController as bill'
        })
    $urlRouterProvider.otherwise('login');
};

