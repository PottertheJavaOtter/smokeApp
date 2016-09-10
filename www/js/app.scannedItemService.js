angular
    .module('app')
    .service('scannedItemService', scannedItemService);
    
    
function scannedItemService(){
  this.scannedItem = "";

  this.setScannedItem = function(input){
      this.scannedItem = input;
  };
  this.getScannedItem = function(){
      return this.scannedItem;
  };
};