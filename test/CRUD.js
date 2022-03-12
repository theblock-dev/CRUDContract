const CRUD = artifacts.require('Crud.sol');
const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
  } = require('@openzeppelin/test-helpers');
  
contract('Crud', () => {
    let crudInstance= null;

    beforeEach(async() => {
        crudInstance = await CRUD.deployed();
    });

    it('should create a new user', async()=>{
        await crudInstance.create('Frank');
        await crudInstance.create('Joe');
        const user = await crudInstance.get(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'Frank');
    })

    it('should update an existing user', async() => {
        await crudInstance.update(2,'Allen');
        const user = await crudInstance.get(2);
        assert(user[0].toNumber() === 2);
        assert(user[1] === 'Allen');
    })

    it('should give error if user does not exist', async() => {
        await expectRevert(
            crudInstance.get(3), 'User does not exist'
        );
    });

    it('should delete a user', async()=>{
        await crudInstance.delIndex(2);
        await expectRevert(
            crudInstance.get(2),
            'User does not exist'
        );
    });

});