angular
  .module('app')
  .service('currentUserService', currentUserService);

function currentUserService() {

  var currentTabId = 0;
  var currentEmployee = "";
  var employeeName = "";
  var seat = "";
  var card = "";
  var filter = "";
  var selectedItem = {};
  var currentPassword = "";

  return {
    getCurrentTabId: function () {
      return currentTabId;
    },
    setCurrentTabId: function (value) {
      currentTabId = value;
    },
    getCurrentEmployee: function () {
      return currentEmployee;
    },
    setCurrentEmployee: function (value) {
      currentEmployee = value;
    },
    getEmployeeName: function () {
      return employeeName;
    },
    setEmployeeName: function (value) {
      employeeName = value;
    },
    getLocation: function () {
      return seat;
    },
    setLocation: function (value) {
      seat = value;
    },
    getCard: function () {
      return card;
    },
    setCard: function (value) {
      card = value;
    },
    getFilter: function () {
      return filter;
    },
    setFilter: function (value) {
      filter = value;
    },
    getItem: function () {
      return selectedItem;
    },
    setItem: function (value) {
      selectedItem = value;
    },
    getCurrentPassword: function () {
      return currentPassword;
    },
    setCurrentPassword: function (value) {
      currentPassword = value;
    },
  };
};
