// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crud {
  
  struct User {
    uint id;
    string name;
  }

  uint private nextId = 1;
  User[] public users;

  function create(string memory _name) external {
    User memory instance = User(nextId, _name);
    users.push(instance);
    nextId++;
  }

  function get(uint _id) external view returns(uint,string memory){
    uint i = find(_id);
    return(users[i].id, users[i].name);    
  }

  function update(uint _id, string memory _name) external {
    uint i = find(_id);
    users[i].name = _name;    
  }

  function delIndex(uint _id) external {
    uint i = find(_id);
    delete users[i];
  }

  function find(uint _id) private view returns(uint){
    for(uint j=0;j<users.length;j++){
      if(users[j].id == _id){
        return j;
      }
    }
    revert('User does not exist');
  }
}
