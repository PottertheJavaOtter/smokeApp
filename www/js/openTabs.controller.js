angular
  .module('openTabs')
  .controller('OpenTabsController', OpenTabsController);

function OpenTabsController(smokeApi, currentUserService, $ionicPopup, $state) {

  var openTabs = this;
  openTabs.nameFilter = {};
  openTabs.tabList = [];

  smokeApi.getAllTabs().success(function (response) {
    openTabs.tabList = response;
  });

  openTabs.updateTabs = function () {
    smokeApi.getAllTabs().success(function (response) {
      openTabs.tabList = response;
    });

  }

  openTabs.nameFilter.text = currentUserService.getFilter();

  // openTabs.$on('$stateChangeSuccess', function () {
  //   if ($state.current.url == "/opentabs") {
  //     openTabs.updateTabs();
  //   }
  // });

  function editModel() {
    openTabs.nameFilter.text = currentUserService.getFilter();
  }

  openTabs.applyModelSynchronously = function () {
    // No need to digest
    editModel();
  }

  openTabs.changeTabID = function (tab) {
    currentUserService.setCurrentTabID(tab.id);
    currentUserService.setCurrentEmployee(tab.empId);
    currentUserService.setEmpName(tab.name);
    currentUserService.setLocation(tab.location);

  }

  openTabs.askForLocation = function () {

    //cordova.plugins.Keyboard.disableScroll(false);

    var myCardPopup = $ionicPopup.show({


      template: '<input type="text" id="seatEntry" ng-model="seat"  autofocus/>',
      title: 'Scan or Type Seat',
      scope: openTabs,
      cssClass: 'my-custom-popup',
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Ok</b>',
          type: 'button-positive',

          onTap: function (e) {

            var seat = document.getElementById("seatEntry").value;
            console.log("seat " + seat);
            currentUserService.setLocation(seat);
            console.log(currentUserService.getLocation());
            openTabs.askForCard();

          }
        }
      ]
    });
  };

  openTabs.askForCard = function () {


    var myCardPopup = $ionicPopup.show({


      template: '<input type="text" id="cardEntry" ng-model="card"  autofocus/>',
      title: 'Enter Card Description',
      scope: openTabs,
      cssClass: 'my-custom-popup',
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Ok</b>',
          type: 'button-positive',

          onTap: function (e) {

            var card = document.getElementById("cardEntry").value;
            console.log("card " + card);
            currentUserService.setCard(card);
            console.log(currentUserService.getCard());
            console.log("card after " + card);
            //openTabs.askForLocation();
            smokeApi.getAllTabs().success(function (response) {
              openTabs.newTab();
            });

          }
        }
      ]


    });
  };

  openTabs.newTab = function () {
    var currlocation = currentUserService.getLocation();
    // MUST CHANGE THIS FROM BEING HARDCODED
    var pin = currentUserService.getCurrentPW();
    smokeApi.getUserDetails(pin).then(function successCallback(response) {
      //Digging into the response to get the relevant data
      openTabs.user = response;
      try {
        if (openTabs.user.data.firstname.length != 0) {
          var tzOffset = (new Date()).getTimezoneOffset() * 60000;
          var date = (new Date(Date.now() - tzOffset)).toISOString().replace(/z|t/gi, ' ').replace(/\.[^.]*$/, '');
          smokeApi.addTab(openTabs.user.data.employeeid, openTabs.user.data.firstname, currlocation, currentUserService.getCard(), 0, date).
            then(function successCallback(response) {
              smokeApi.getAllTabs().success(function (response) {
                openTabs.tempList = response;
                var latestid = openTabs.tempList.slice(-1)[0].id;
                currentUserService.setFilter(latestid);
                currentUserService.setCurrentEmployee(openTabs.user.data.employeeid);
                currentUserService.setEmpName(openTabs.user.data.firstname);
                currentUserService.setCurrentTabID(latestid);
                //cordova.plugins.Keyboard.disableScroll(true);
                openTabs.go("/tab/opentabs/" + latestid);
              });
            })
        }
      } catch (err) {
        //alert("PIN not found");
        openTabs.askForPIN();
      }

    }, function errorCallback(response) { })
    return pin;
  }

  openTabs.routeToBill = function (tab) {
    $state.go('bill', {tabId: tab.id});
  }

  openTabs.openView = function () {
    $state.go('app.browse');
  };
};

