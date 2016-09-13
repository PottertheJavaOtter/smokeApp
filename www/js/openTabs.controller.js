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

  openTabs.changeTabId = function (tab) {
    currentUserService.setCurrentTabId(tab.id);
    currentUserService.setCurrentEmployee(tab.empId);
    currentUserService.setEmployeeName(tab.name);
    currentUserService.setLocation(tab.location);

  }

  openTabs.openNewTab = function () {
   $state.go('createTab');
  }

  openTabs.routeToBill = function (tab) {
    currentUserService.setCurrentTabId(tab.id);
    $state.go('bill', {tabId: tab.id});
  }

  openTabs.logout = function () {
    $state.go('login');
  };
};

