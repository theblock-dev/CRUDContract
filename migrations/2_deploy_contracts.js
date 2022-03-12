const CRUD = artifacts.require('Crud.sol');

module.exports = function(deployer){
    deployer.deploy(CRUD);
}