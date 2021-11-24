// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title A minimalistic whitelist CRUD (Create, read, update and delete) dApp.
 * @author Attila Tunder
 * @dev Contract that allows the contract owner to create, read, update & delete records from a whitelist.
 */

contract Whitelist is Ownable, ReentrancyGuard {

  /**
   * @dev Store whitelisted addresses in an array.
   */
  address[] public whitelistedAccounts;

  /**
   * @dev Store the index of each address on the whitelist array.
   */
  mapping (address => uint) public whitelistedIndexes;

  /**
   * @dev Store a boolean flag of each address on the whitelist array (prevent record duplication).
   */
  mapping (address => bool) public whitelistedFlags;

  /**
   * @dev Modifier to make a function callable only when an address is not flagged.
   *
   * Requirements:
   *
   * - The address must not have a flag with the value of true.
   */
  modifier uniqueAccount(address _address) {
    require(!whitelistedFlags[_address], "invalid address :: whitelisted accounts must be unique");
    _;
  }

  /**
   * @dev Modifier to make a function callable only when the whitelist array is populated with records.
   *
   * Requirements:
   *
   * - The 'whitelistedAccounts' array must have at least one record.
   */
  modifier whitelistNotEmpty() {
    require(getWhitelistLength() > 0, "invalid request :: whitelisted accounts is empty");
    _;
  }

  /**
   * @dev Modifier to make a function callable only when an address is found on the whitelist.
   *
   * Requirements:
   *
   * - The 'whitelistedAccounts' array must contain the '_addressToLookup' address.
   */
  modifier addressIsFound(address _addressToLookup) {
    require(verifyCustomAddress(_addressToLookup), "invalid request :: address to modify not found");
    _;
  }

  /**
   * @dev Returns the length of the 'whitelistedAccounts' array.
   */
  function getWhitelistLength() public view returns (uint) {
    return whitelistedAccounts.length;
  }

  /**
   * @dev Returns the 'whitelistedAccounts' array.
   */
  function returnWhiteList() public view returns (address[] memory) {
    return whitelistedAccounts;
  }

  /**
   * @dev Add an address to the 'whitelistedAccounts' array.
   * - Sets whitelist flag to true (preventing duplicate records).
   * - Pushes address to the whitelist.
   * - Stores the index of the recently added record. (lookup support).
   *
   * Requirements:
   *
   * - The contract must be called by the owner.
   * - The contract must not have (reentrant) calls.
   * - The contract must not have the input address stored in the 'whitelistedAccounts' array.
   */
  function whiteListAddress(address _address) public onlyOwner nonReentrant uniqueAccount(_address) {
    whitelistedFlags[_address] = true;
    whitelistedAccounts.push(_address);
    whitelistedIndexes[_address] = getWhitelistLength() - 1;
  }

  /**
   * @dev Returns the index of the input address from the 'whitelistedAccounts' array.
   */
  function returnAccountIndex(address _address) public view returns (uint accountIndex) {
    accountIndex = whitelistedIndexes[_address];
  }

  /**
   * @dev Returns true if the input address is found in the 'whitelistedAccounts' array, and false otherwise.
   */
  function verifyCustomAddress(address _address) public view returns (bool verifiedAddress) {
    verifiedAddress = false;
    uint accountIndex = returnAccountIndex(_address);
    address requestedAccountAddress = whitelistedAccounts[accountIndex];
    if(requestedAccountAddress == _address) {
      verifiedAddress = true;
    }
  }

  /**
   * @dev Update an existing address to another one in the 'whitelistedAccounts' array.
   * - Sets whitelist flag of the '_addressTo' to true (preventing duplicate records).
   * - Updates an address to another one in the 'whitelistedAccounts' array.
   * - Swaps the index of the '_addressTo' record with the 'oldAccountIndex'.
   * - Resets the index of the 'oldAccountIndex' back to its default value. (0)
   * - Resets the flag of the 'oldAccountIndex' back to its default value. (false)
   *
   * Requirements:
   *
   * - The contract must be called by the owner.
   * - The contract must not have (reentrant) calls.
   * - The 'whitelistedAccounts' array must have at least one record.
   * - The contract must not have the '_addressTo' update stored in the 'whitelistedAccounts' array.
   * - The 'whitelistedAccounts' array must contain the '_addressFrom' address.
   */
  function updateWhitelist(address _addressFrom, address _addressTo) public onlyOwner nonReentrant whitelistNotEmpty uniqueAccount(_addressTo) addressIsFound(_addressFrom) {
    uint oldAccountIndex = returnAccountIndex(_addressFrom);
    whitelistedFlags[_addressTo] = true;
    whitelistedAccounts[oldAccountIndex] = _addressTo;
    whitelistedIndexes[_addressTo] = oldAccountIndex;
    whitelistedIndexes[_addressFrom] = 0;
    whitelistedFlags[_addressFrom] = false;
  }

  /**
   * @dev Delete an existing address from the 'whitelistedAccounts' array.
   * - Swaps the '_addressToDelete' element with the last element of the 'whitelistedAccounts' array.
   * - Swaps the index of the 'addressToDeleteIndex' record with the 'lastItemAddress'.
   * - Resets the index of the '_addressToDelete' back to its default value. (0)
   * - Resets the flag of the '_addressToDelete' back to its default value. (false)
   *
   * Requirements:
   *
   * - The contract must be called by the owner.
   * - The contract must not have (reentrant) calls.
   * - The 'whitelistedAccounts' array must have at least one record.
   * - The 'whitelistedAccounts' array must contain the '_addressToDelete' address.
   */
  function deleteFromWhitelist(address _addressToDelete) public onlyOwner nonReentrant whitelistNotEmpty addressIsFound(_addressToDelete) {
    uint addressToDeleteIndex = returnAccountIndex(_addressToDelete);
    uint lastItemIndex = (whitelistedAccounts.length - 1);
    address lastItemAddress = whitelistedAccounts[lastItemIndex];
    whitelistedAccounts[addressToDeleteIndex] = lastItemAddress;
    whitelistedAccounts.pop();
    whitelistedIndexes[lastItemAddress] = addressToDeleteIndex;
    whitelistedIndexes[_addressToDelete] = 0;
    whitelistedFlags[_addressToDelete] = false;
  }

}
