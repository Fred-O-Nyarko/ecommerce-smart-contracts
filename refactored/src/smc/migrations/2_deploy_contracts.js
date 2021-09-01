/* eslint-disable no-undef */
var Store = artifacts.require("../contracts/Store.sol");

module.exports = function (deployer) {
  deployer.deploy(Store);
};
