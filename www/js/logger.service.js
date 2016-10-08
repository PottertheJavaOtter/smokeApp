(function() {
'use strict';

    angular
        .module('logger')
        .factory('LogService', LogService);

    LogService.$inject = ['$http'];
    function LogService($http) {
        var LogService = {
            logMessageToDatabase:logMessageToDatabase
        };
        
        return LogService;

        ////////////////
        function logMessageToDatabase(log) { 
            $http.post(url, log, config)
            .success(function (log, status, headers, config) {
            })
            .error(function (log, status, header, config) {
            });    
        }
    }
})();