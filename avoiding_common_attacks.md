# Avoiding common attacks

## A minimalistic whitelist CRUD (Create, read, update and delete) dApp.

### Floating Pragma | SWC-103

- Deployed with the same compiler version and flags that they have been tested with. (pragma solidity 0.8.3)

### Reentrancy | SWC-107

- 'whiteListAddress', 'updateWhitelist', 'deleteFromWhitelist' are protected with a reentrancy lock-in to prevent accidental bugs caused by the owner.
- Reentrancy was implemented to the 'whitelist CRUD dApp' to maintain the uniqueness of the addresses stored in the 'whitelistedAccounts' array, by disabling reentrant calls to functions that are capable of modifying the state of the contract.

### Shadowing State Variables | SWC-119

- 'whitelist CRUD dApp' is free from shadowed state variables.

### Authorization through tx.origin | SWC-115

- 'whitelist CRUD dApp' is not making use of tx.origin for authorization, it uses the OpenZeppelin Ownable.sol smart contract (which is using msg.sender for this purpose).

### Use of Deprecated Solidity Functions | SWC-111

- 'whitelist CRUD dApp' is not using deprecated functions, it uses 'view' instead of 'constant' in the 'getWhitelistLength()', 'returnWhiteList()', 'returnAccountIndex(address _address)', 'verifyCustomAddress(address _address)' functions.
