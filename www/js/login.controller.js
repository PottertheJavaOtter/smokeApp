angular
    .module('login')
    .controller('LoginController', LoginController);

function LoginController($scope, $state, smokeApi, currentUserService) {
    $scope.errorMsg = "Login failed! Please check your credentials!";
    $scope.showError = false;
    $scope.data = {};
    $scope.attemptLogin = function () {
        smokeApi.getUserDetails($scope.data.password).success(function (response) {
            $scope.user = response;
            try {
                if ($scope.user.firstname == $scope.data.username) {
                    currentUserService.setEmployeeName($scope.data.username);
                    currentUserService.setCurrentEmployee($scope.user.employeeid);
                    currentUserService.setCurrentPassword($scope.data.password);
                    $scope.data.username = "";
                    $scope.data.password = "";
                    $scope.showError = false;
                    $state.go('opentabs');
                }
                else {
                    $scope.showError = true;
                }
            } catch (err) {
                $scope.showError = true;
            }
        })
    }
};    