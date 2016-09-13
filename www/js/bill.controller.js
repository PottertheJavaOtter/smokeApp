angular
  .module('bill')
  .controller('BillController', BillController);

function BillController(currentUserService, smokeApi, $state, $ionicListDelegate) {
  var bill = this;
  bill.tabOwner = currentUserService.getEmployeeName();
  bill.tabItemList = [];
  bill.subtotal = 0;

  smokeApi.getTabItems(currentUserService.getCurrentTabId()).success(function (response) {
    bill.tabItemList = response;
    for (var tabItem in bill.tabItemList) {
      bill.subtotal += bill.tabItemList[tabItem].finalamount;
    }
  });

  bill.routeToOpenTabs = function () {
    $state.go('opentabs');
  };

  bill.getCigarName = function (cigarItem) {
    if (null != cigarItem) {
      cigarItem.name = {};
      smokeApi.getCigarDetails(cigarItem.cigarid).then(function successCallback(response) {
        cigarItem.name = response.data.name;
      });
    }
  };

  bill.removeQuantity = function (tabItem) {
    $ionicListDelegate.closeOptionButtons();
    currentUserService.setItem(tabItem);
    var tabitemid = currentUserService.getItem().id;
    smokeApi.removeQuantityTabItem(tabitemid).success(function (response) { });
    $state.reload();
  };

  bill.addQuantityTabItem = function (tabItem) {
    $ionicListDelegate.closeOptionButtons();
    currentUserService.setItem(tabItem);
    var currentCigarId = currentUserService.getItem().id
    smokeApi.addQuantityTabItem(currentCigarId).success(function (response) { })
    $state.reload();
  };

  bill.voidItem = function (tabItem) {
    $ionicListDelegate.closeOptionButtons();
    currentUserService.setItem(tabItem);
    var currentCigarId = currentUserService.getItem().id
    smokeApi.deleteTabItem(currentCigarId).success(function (response) { })
    $state.reload();
  };

  bill.addItemToTab = function (skuNumber) {
    var inputbox;
    if (null != skuNumber) {
      inputbox = skuNumber;
      bill.id = inputbox;
      smokeApi.getCigarDetails(bill.id).then(function successCallback(response) {
        bill.item = response;
        if (!response.data.retailstick > 0) {
          document.getElementById("scaninput").value = "";
          alert("item not found");
        }
        document.getElementById("scaninput").value = "";
        var time = (new Date).toISOString().replace(/z|t/gi, ' ').replace(/\.[^.]*$/, '');
        smokeApi.addTabItem(currentUserService.getCurrentTabId(), response.data.id, response.data.retailstick, 1, 0, response.data.retailstick, time, 0, "test", currentUserService.getCurrentEmployee())
          .then(function successCallback(response) {
            smokeApi.getTabItems(currentUserService.getCurrentTabId()).success(function (response) {
              bill.tabItemList = response;
              bill.subtotal = 0;
              for (var tabItem in bill.tabItemList) {
                bill.subtotal += bill.tabItemList[tabItem].finalamount;
              }

              return;
            });
          })
      }, function errorCallback(response) {

        if (!response.data.retailstick > 0) {
          document.getElementById("scaninput").value = "";
          alert("item not found");
          return bill.id;
        }
      })
      bill.id = '';

    } else {
      inputbox = document.getElementById("scaninput").value;
    }
    bill.id = inputbox;
    smokeApi.getItemDetails(bill.id).then(function successCallback(response) {
      //Digging into the response to get the relevant data
      bill.item = response;
      if (!response.data.retailstick > 0) {
        console.log(bill.id);
        document.getElementById("scaninput").value = "";
        alert("item not found");
      }

      document.getElementById("scaninput").value = "";

      var time = (new Date).toISOString().replace(/z|t/gi, ' ').replace(/\.[^.]*$/, '');

      smokeApi.addTabItem(currentUserService.getCurrentTabId(), response.data.id, response.data.retailstick, 1, 0, response.data.retailstick, time, 0, "test", currentUserService.getCurrentEmployee())
        .then(function successCallback(response) {
          smokeApi.getTabItems(currentUserService.getCurrentTabId()).success(function (response) {
            bill.tabItemList = response;
            bill.subtotal = 0;
            for (var tabI in bill.tabItemList) {
              bill.subtotal += bill.tabItemList[tabI].finalamount;
            }
            return;
          });

        })
    }, function errorCallback(response) {
      if (!response.data.retailstick > 0) {
        document.getElementById("scaninput").value = "";
        alert("item not found");
      }
    })
    return bill.id;
  };
};

