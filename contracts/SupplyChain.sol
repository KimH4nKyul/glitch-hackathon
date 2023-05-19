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
  function concat(string memory _a, string memory _b) public returns (string memory){
      bytes memory bytes_a = bytes(_a);
      bytes memory bytes_b = bytes(_b);
      string memory length_ab = new string(bytes_a.length + bytes_b.length);
      bytes memory bytes_c = bytes(length_ab);
      uint k = 0;
      for (uint i = 0; i < bytes_a.length; i++) bytes_c[k++] = bytes_a[i];
      for (uint i = 0; i < bytes_b.length; i++) bytes_c[k++] = bytes_b[i];
      return string(bytes_c);
  }
  function uintToStr(uint256 _value) internal pure returns (string memory) {
      if (_value == 0) {
          return "0";
      }
      uint256 temp = _value;
      uint256 digits;
      while (temp != 0) {
          digits++;
          temp /= 10;
      }
      bytes memory buffer = new bytes(digits);
      while (_value != 0) {
          digits -= 1;
          buffer[digits] = bytes1(uint8(48 + uint256(_value % 10)));
          _value /= 10;
      }
      return string(buffer);
  }
  function generateJson(Record memory _record) internal pure returns (string memory) {
      string memory json = string(abi.encodePacked(
          '{',
          '"message": "', _record.message, '",',
          '"timestamp": ',uintToStr(_record.timestamp), ',',
          '"recordId": ', uintToStr(_record.recordId),
          '}'
      ));
      return json;
  }
  function addRecord(string memory _text) public returns (bool) {
      Record memory newRecord = Record({message: _text, timestamp: block.timestamp,recordId: records});
      allRecords[records]=newRecord;
      records = records+1;
      return true;
  } 
  function getRecords() public returns (string memory){
      string memory output="{data:[";
      for (uint i=0;i<records;i++){
        output=concat(output,generateJson(allRecords[i]));
      }
      output = concat(output, "]}");
      return output;
  } 
}