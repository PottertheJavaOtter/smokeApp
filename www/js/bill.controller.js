angular
    .module('bills')
    .controller('BillController', BillController);

function BillController() {

  bill.tabOwner = SharedParametersService.getEmpName();
  bill.tabLocation = SharedParametersService.getLocation();
  bill.tabItemList = [];
  bill.subtotal = 0;

};

