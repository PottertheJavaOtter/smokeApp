angular
    .module('createTab')
    .controller("CreateTabController", CreateTabController);

function CreateTabController(smokeApi, currentUserService, $state) {

    var createTab = this;
    createTab.seatLocation = "";
    createTab.paymentType = "";

    createTab.cancelNewTab = function () {
        $state.go('opentabs');
    };


    createTab.openNewTab = function () {
        currentUserService.getCurrentPassword
        var pin = currentUserService.getCurrentPassword();
        smokeApi.getUserDetails(pin).then(function successCallback(response) {
            //Digging into the response to get the relevant data
            createTab.user = response;
            try {
                if (createTab.user.data.firstname.length != 0) {
                    var tzOffset = (new Date()).getTimezoneOffset() * 60000;
                    var date = (new Date(Date.now() - tzOffset)).toISOString().replace(/z|t/gi, ' ').replace(/\.[^.]*$/, '');
                    smokeApi.addTab(createTab.user.data.employeeid, createTab.user.data.firstname, createTab.seatLocation, createTab.paymentType, 0, date).
                        then(function successCallback(response) {

                            smokeApi.getAllTabs().success(function (response) {

                                createTab.tempList = response;
                                var newTabId = createTab.tempList.slice(-1)[0].id;
                                currentUserService.setFilter(newTabId);

                                currentUserService.setCurrentEmployee(createTab.user.data.employeeid);
                                currentUserService.setEmployeeName(createTab.user.data.firstname);
                                currentUserService.setCurrentTabId(newTabId);

                                //cordova.plugins.Keyboard.disableScroll(true);

                                $state.go('bill', { tabId: newTabId });

                            });

                        })


                }
            } catch (err) {
                console.log(err);
            }

        }, function errorCallback(response) { })
        return pin;
    }
};