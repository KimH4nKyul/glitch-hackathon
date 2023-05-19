//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SupplyChain {
  struct Record{
    string message;
    uint256 timestamp;
    uint256 recordId;
  }
  mapping (uint256 => Record) allRecords;
  uint256 records=0;

  function addRecord(string memory _text) public returns (bool) {
      Record memory newRecord = Record({message: _text, timestamp: block.timestamp,recordId: records});
      allRecords[records] = newRecord;
      records = records+1;
      return true;
  } 

  function getRecordCount() public view returns (uint256){
      return records;
  }

  function getRecord(uint256 _id) public view returns (uint256, string memory, uint256){
      Record memory record = allRecords[_id];
      return (record.recordId, record.message, record.timestamp);
  } 
}