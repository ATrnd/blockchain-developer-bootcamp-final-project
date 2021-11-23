# Design pattern decisions

## A minimalistic whitelist CRUD (Create, read, update and delete) dApp.

### Inter-Contract Execution

The 'whitelist CRUD dApp' makes use of Inter-Contract Execution and takes advantage of two of the OpenZeppelin smart contracts (Ownable.sol & ReentrancyGuard.sol).
Adopting functionality from these contracts made the 'whitelist CRUD dApp' external function calls:

- More reliable and secure.
- More gas efficient.

### Inheritance and Interfaces

The 'whitelist CRUD dApp' makes use of Inheritance and Interfaces using the Ownable.sol & ReentrancyGuard.sol OpenZeppelin smart contracts.
Inheriting from these contracts made the 'whitelist CRUD dApp':

- More reliable and secure.
- More gas efficient.
- Capable of basic access control.
- Easier to develop by reducing the time invested in the development process.

Using the Ownable.sol smart contract in the 'whitelist CRUD dApp' improved its security by restricting admin functionality access to the owner of the contract.

Using the ReentrancyGuard.sol helped prevent bugs that may be caused by reentrant calls to the contracts (create, update & delete) functionality.

### Access Control Design Patterns

The 'whitelist CRUD dApp' makes use of Access Control Design Patterns using the Ownable.sol OpenZeppelin smart contract.
Using functionality provided by the Ownable.sol smart contract made the 'whitelist CRUD dApp' capable of:

- Detecting the owner of the contract.
- Restricting access to key functionality of the dApp.
- Prevent unauthorized users to trigger admin functionality.

### Optimizing Gas

- The 'whitelist CRUD dApp' delete function 'deleteFromWhitelist' is gas optimized to some degree. Using a swapping technique instead of looping over the 'whitelistedAccounts' array.
