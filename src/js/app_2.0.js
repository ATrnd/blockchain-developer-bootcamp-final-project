// :: {wallet test handles} :: {{{
// ===========================
// => button handle, test if window.ethereum is available,
// => notification handle, update if window.ethereum is available,
// => flag handle, update if window.ethereum is available,
const walletTestBtnSelector      = document.querySelector(".wallet-test-btn");
const walletTestPSelector        = document.querySelector(".wallet-test-p");
const walleDetectedFlagPSelector = document.querySelector(".wallet-detected-flag");

// }}}

// :: {connection test handles} :: {{{
// ===============================
// => button handle, trigger metamask connection
// => notification handle, update if metamask connection is enabled/disabled
// => address handle, update if metamask connection is enabled/disabled
const walletConnectBtnSelector = document.querySelector(".wallet-connect-btn");
const walletConnectPSelector = document.querySelector(".wallet-connect-p");
const walletAddressPSelector = document.querySelector(".wallet-address-p");
const walletConnectionFlagPSelector = document.querySelector(".wallet-connection-flag");

// }}}

// :: {contract handles} :: {{{
// ========================
const contractTriggerContainerSelector = document.querySelector(".contract-trigger-container");
const contractBtnSelector = document.querySelector(".contract-trigger-btn");
const contractPSelector = document.querySelector(".contract-trigger-p");
const contractResultPSelector = document.querySelector(".contract-result-p");
const contractFlagPSelector = document.querySelector(".contract-access-flag");
const contractUISelector = document.querySelector(".contract-UI-container");
const contractUIPSelector = document.querySelector(".contract-UI-p");

// }}}

// :: {contract util} :: {{{
// =====================
const contractAddr = '0xD1BCe17a9f807fca5bCAbD6F28F577fa7F3E3008';
const contractABI  =
	[
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_addressToDelete",
					"type": "address"
				}
			],
			"name": "deleteFromWhitelist",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "renounceOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_addressFrom",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_addressTo",
					"type": "address"
				}
			],
			"name": "updateWhitelist",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "whiteListAddress",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getWhitelistLength",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "returnAccountIndex",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "accountIndex",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "returnWhiteList",
			"outputs": [
				{
					"internalType": "address[]",
					"name": "",
					"type": "address[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "verifyCustomAddress",
			"outputs": [
				{
					"internalType": "bool",
					"name": "verifiedAddress",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "whitelistedAccounts",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "whitelistedFlags",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "whitelistedIndexes",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];
// }}}

// :: {utility functions} :: {{{
// =========================
// => eventLog, log divider line between logs & display triggered event :: innerText
// => addressLog, return address if defined, or return notification
// => errorLog, log error message
const eventLog = (e) => {
    console.log('========================================');
    console.log(`event triggered :: ${e.target.innerText}`);
}

const addressLog = (_addr, result = 'wallet address :: unknown') => {
    if(_addr) {
        result = `wallet address :: ${_addr}`;
    }
    return result;
}

const errorLog = (_error) => {
    console.log(`error triggered :: ${_error.message}`);
}

const genAdminFunc = (inputClass,inputPlaceholder,buttonClass,buttonText,inputFlag = true,xtraInputFlag = false,xtraInputClass = [],xtraPlaceHolder = '') => {

    const containerDiv = document.createElement("div");
	const containerInput = document.createElement("input");
	const xtraInput = document.createElement("input");

	inputClass.forEach(classEl => containerInput.classList.add(classEl));
	containerInput.placeholder = inputPlaceholder;

	if(xtraInputFlag) {
		xtraInputClass.forEach(classEl => xtraInput.classList.add(classEl));
		xtraInput.placeholder = xtraPlaceHolder;
	}

    const containerButton = document.createElement("button");
    const containerButtonText = document.createTextNode(buttonText);
    containerButton.appendChild(containerButtonText);
	buttonClass.forEach(classEl => containerButton.classList.add(classEl));

	if(inputFlag) {
		containerDiv.appendChild(containerInput);
	}
	if(xtraInputFlag) {
		containerDiv.appendChild(xtraInput);
	}
    containerDiv.appendChild(containerButton);
    return containerDiv;

}

const conLogNotice = (eventName, eventState) => {
	console.log(`${eventName} :: ${eventState}`);
}

const createNoticeEl = (elType,elData,elClass) => {
	const noticeEl = document.createElement(elType);
	const noticeElData = document.createTextNode(elData);
	elClass.forEach(classEl => noticeEl.classList.add(classEl));
	noticeEl.appendChild(noticeElData);
	return noticeEl;
}

const genListItem = (acc,targetAcc,accDisplayUl) => {
	acc = acc.toLowerCase();
	targetAcc = targetAcc.toLowerCase();
	accDisplayLi = document.createElement("li");
	accDisplayLi.appendChild(document.createTextNode(acc));
	accDisplayLi.setAttribute("id", acc);
	if(acc === targetAcc) {
		accDisplayLi.classList.add("hl-class");
	}
	accDisplayUl.appendChild(accDisplayLi);
}

// }}}

// :: {utility elements} :: {{{
// ========================
let hrEl = document.createElement("hr");
let errorNotice;
let successNotice;
let liLogA;
let ulLogA;
let liUpdated;
let updatedParam;
let accDisplayUl;
let accDisplayLi;
let whitelistAccs;
let deleteAddressValue;
let whiteListAddressValue;

// }}}

// :: {sys flags && notifications} :: {{{
// ==================================
// :: {sys flags} ::
// =================
// sysFlags[0] => window.ethereum is available,
// sysFlags[1] => metamask connection enabled
// sysFlags[2] => contract access admin
let sysFlags = [false, false, false];

// :: {sys notifications => flags} ::
// ==================================
// UI notifications
const positiveFlag = '+';
const negativeFlag = '-';

// :: {sys notifications => wallet test} ::
// ========================================
// UI notifications
const windowEthereumFound    = 'window.ethereum :: found';
const windowEthereumNotFound = 'window.ethereum :: not found';

// :: {sys notifications => connection test} ::
// ============================================
// UI notifications
const walletConnectionEnabled  = 'wallet connection :: enabled';
const walletConnectionDisabled = 'wallet connection :: disabled';

// :: {sys notifications => contract trigger} ::
// =============================================
// UI notifications
const contractAccessAdmin        = 'contract access :: admin';
const contractAccessUser         = 'contract access :: user';
const contractTransactionSuccess = 'contract transaction :: success';
const contractUIPheader          = 'whitelisted accounts';
const contractAccessUserNoitce   = 'admin functionality :: disabled';
const contractAccessAdminNoitce  = 'admin functionality :: enabled';

// :: {sys notifications => functions & events} ::
// ===============================================
const regEventName    = 'registration';
const delEventName    = 'deletion';
const updateEventName = 'update';
const eventSuccess    = 'successful';
const eventFailed     = 'failed';

// }}}

// :: {wallet detector} :: {{{
// ===========================
walletTestBtnSelector.addEventListener("click", (e) => {

    eventLog(e);

    // if window.ethereum found ::
    // => display console notification,
    // => update the DOM, inject UI notification
    // => update the DOM, modify wallat detection state flag
    // => update sysFlags, if (sysFlags[0]) => window.ethereum is available
    if (window.ethereum) {

        console.log(windowEthereumFound);
        walletTestPSelector.innerText = windowEthereumFound;
        walleDetectedFlagPSelector.innerText = positiveFlag;
        sysFlags[0] = true

        // if window.ethereum not found ::
        // => display console notification,
        // => update the DOM, inject UI notification
        // => note the wallat detection state flag is negative by default
        // => note the sysFlags[0] is false by default, if (!sysFlags[0]) => window.ethereum is not available
    } else {
        console.log(windowEthereumNotFound);
        walletTestPSelector.innerText = windowEthereumNotFound;
    }

});

// }}}

// :: {connection detector} :: {{{
// ===========================
walletConnectBtnSelector.addEventListener("click", async (e) => {

    eventLog(e);

    // if wallet connection is enabled ::
    // => display console notification,
    // => log wallet address
    // => update the DOM, inject UI notification
    // => update the DOM, inject wallet address
    // => update the DOM, modify connection state flag
    // => update sysFlags, if (sysFlags[1]) => metamask connection enabled
    try {

        await ethereum.request({
            method: "eth_requestAccounts",
        });
        console.log(walletConnectionEnabled);
        console.log(addressLog(ethereum.selectedAddress));
        walletConnectPSelector.innerText = walletConnectionEnabled;
        walletAddressPSelector.innerText = addressLog(ethereum.selectedAddress);
        walletConnectionFlagPSelector.innerText = positiveFlag;
        sysFlags[1] = true

        // if wallet connection is disabled ::
        // => log error message
        // => log wallet address fallback (unknwon address)
        // => update the DOM, inject UI notification
        // => update the DOM, inject wallet address (unknwon address)
        // => note the connection detection state flag is negative by default
        // => note the sysFlags[0] is false by default, if (!sysFlags[1]) => metamask connection is disabled
    } catch (error) {

        errorLog(error);
        console.log(walletConnectionDisabled);
        walletConnectPSelector.innerText = walletConnectionDisabled;
        walletAddressPSelector.innerText = addressLog(false);

    }

});

// }}}

// :: {contract detector} ::
// =========================
contractBtnSelector.addEventListener("click", async (e) => {

	eventLog(e);

	// ini web3
	var web3            = new Web3(window.ethereum);
	const whitelistCntr = new web3.eth.Contract(contractABI, contractAddr);

    // get owner
    const contractOwner      = await whitelistCntr.methods.owner().call();
    const contractOwnerLower = contractOwner.toLowerCase();

    // if owner detected display admin UI, else display user UI
	if(ethereum.selectedAddress === contractOwnerLower) {

		// display admin access log / DOM notification
		console.log(contractAccessAdmin);
		console.log(contractAccessAdminNoitce);
		contractPSelector.innerText = contractAccessAdmin;
		contractFlagPSelector.innerText = positiveFlag;

		// generate admin UI DOM
		if(!sysFlags[2]) {
			let whitelistRegSection = genAdminFunc(['admin-ui-input','register-whitelist-input','mt-05em','mb-05em'],'whitelist address',['register-whitelist-address'],'register', true, false,[],'');
			let whitelistReadSection = genAdminFunc(['admin-ui-input','read-whitelist-input','mt-05em','mb-05em'],'read whitelist',['read-whitelist-address'],'read', false, false,[],'');
			let whitelistUpdateSection = genAdminFunc(['admin-ui-input','update-whitelist-input-1','mt-05em','mb-05em'],'update :: from',['update-whitelist-address'],'update', true, true,['admin-ui-input','update-whitelist-input-2','mt-05em','mb-05em'],'update :: to');
			let whitelistDeleteSection = genAdminFunc(['admin-ui-input','delete-whitelist-input','mt-05em','mb-05em'],'delete address',['delete-whitelist-address'],'delete', true, false,[],'');
			contractUISelector.appendChild(whitelistRegSection);
			contractUISelector.appendChild(whitelistReadSection);
			contractUISelector.appendChild(whitelistUpdateSection);
			contractUISelector.appendChild(whitelistDeleteSection);
			sysFlags[2] = true
		}

		// store whitelist trigger selector
		const registerWhitelistBtnSelector = document.querySelector(".register-whitelist-address");
		const readWhitelistBtnSelector = document.querySelector(".read-whitelist-address");
		const updateWhitelistBtnSelector = document.querySelector(".update-whitelist-address");
		const deleteWhitelistBtnSelector = document.querySelector(".delete-whitelist-address");

		// {WHITELIST RECORD :: REFACTORED} {{{
		registerWhitelistBtnSelector.addEventListener("click", async (e) => {

			eventLog(e);
			whiteListAddressValue = document.querySelector(".register-whitelist-input").value;
			console.log('Registering, please wait...');

			try {

				let whitelistParamResult = await whitelistCntr.methods.whiteListAddress(whiteListAddressValue).send({from: ethereum.selectedAddress});
				if(whitelistParamResult.status) {

					conLogNotice(regEventName,eventSuccess);
					successNotice = createNoticeEl("p",`${regEventName} :: ${eventSuccess}`,['hl-class','mt-05em']);
					liLogA = createNoticeEl("li",`registered address :: ${whiteListAddressValue}`,['mt-05em']);
					ulLogA = document.createElement("ul");
					ulLogA.appendChild(liLogA);
					contractTriggerContainerSelector.appendChild(successNotice);
					contractTriggerContainerSelector.appendChild(ulLogA);

					whitelistAccs = await whitelistCntr.methods.returnWhiteList().call();
					console.log(whitelistAccs);

					accDisplayUl = document.querySelector(".acc-display");
					accDisplayUl.innerHTML = '';
					contractUIPSelector.innerHTML = contractUIPheader;
					contractUIPSelector.append(hrEl);
					if(whitelistAccs.length > 0) {
						whitelistAccs.forEach(acc => genListItem(acc,ethereum.selectedAddress,accDisplayUl));
					}
					document.querySelector(".register-whitelist-input").value = "";

				}

			} catch (error) {

				errorLog(error);
				conLogNotice(regEventName,eventFailed);
				errorNotice = createNoticeEl("p",`${regEventName} :: ${eventFailed}`,['hl-class','mt-05em']);
				contractTriggerContainerSelector.appendChild(errorNotice);
				document.querySelector(".register-whitelist-input").value = "";

			}

        });

		// }}}

		// {DELETE RECORDS :: REFACTORED} {{{
		deleteWhitelistBtnSelector.addEventListener("click", async (e) => {

			eventLog(e);
			deleteAddressValue = document.querySelector(".delete-whitelist-input").value;
			console.log('Deleting, please wait...');

			try {

				let deletelistParamResult = await whitelistCntr.methods.deleteFromWhitelist(deleteAddressValue).send({from: ethereum.selectedAddress});
				if(deletelistParamResult.status) {

					conLogNotice(delEventName,eventSuccess);
					successNotice = createNoticeEl("p",`${delEventName} :: ${eventSuccess}`,['hl-class','mt-05em']);
					liLogA = createNoticeEl("li",`deleted address :: ${deleteAddressValue}`,['mt-05em']);
					ulLogA = document.createElement("ul");
					ulLogA.appendChild(liLogA);
					contractTriggerContainerSelector.appendChild(successNotice);
					contractTriggerContainerSelector.appendChild(ulLogA);

					whitelistAccs = await whitelistCntr.methods.returnWhiteList().call();
					accDisplayUl = document.querySelector(".acc-display");
					accDisplayUl.innerHTML = '';
					contractUIPSelector.innerHTML = contractUIPheader;
					contractUIPSelector.append(hrEl);
					if(whitelistAccs.length > 0) {
						whitelistAccs.forEach(acc => genListItem(acc,ethereum.selectedAddress,accDisplayUl));
					} else {
						accDisplayLi = document.createElement("li");
						accDisplayLi.appendChild(document.createTextNode('notice :: no addresses found'));
						accDisplayLi.classList.add("hl-class");
						accDisplayUl.appendChild(accDisplayLi);
					}
					document.querySelector(".delete-whitelist-input").value = "";

				}

			} catch (error) {

				errorLog(error);
				conLogNotice(delEventName,eventFailed);
				errorNotice = createNoticeEl("p",`${delEventName} :: ${eventFailed}`,['hl-class','mt-05em']);
				contractTriggerContainerSelector.appendChild(errorNotice);
				document.querySelector(".delete-whitelist-input").value = "";

			}

		});
		// }}}

		// {UPDATE RECORDS :: REFACTORED} {{{
		updateWhitelistBtnSelector.addEventListener("click", async (e) => {

			eventLog(e);

			const updateAddressValueA = document.querySelector(".update-whitelist-input-1").value;
			const updateAddressValueB = document.querySelector(".update-whitelist-input-2").value;
			console.log('Updating, please wait...');

			try {
				let updateParamResult = await whitelistCntr.methods.updateWhitelist(updateAddressValueA,updateAddressValueB).send({from: ethereum.selectedAddress});
				console.log(updateParamResult);

				if(updateParamResult.status) {

					conLogNotice(updateEventName,eventSuccess);
					successNotice = createNoticeEl("p",`${updateEventName} :: ${eventSuccess}`,['hl-class','mt-05em']);
					liLogA = createNoticeEl("li",`from :: ${updateAddressValueA}`,['mt-05em']);
					liLogB = createNoticeEl("li",`to :: ${updateAddressValueB}`,['mt-05em']);
					ulLogA = document.createElement("ul");
					ulLogA.appendChild(liLogA);
					ulLogA.appendChild(liLogB);
					contractTriggerContainerSelector.appendChild(successNotice);
					contractTriggerContainerSelector.appendChild(ulLogA);
					liUpdated = document.getElementById(updateAddressValueA);
					if(liUpdated) {
						liUpdated.className = "";
						console.log(updateAddressValueB);
						console.log(ethereum.selectedAddress);
						if(updateAddressValueB === ethereum.selectedAddress) {
							liUpdated.classList.add("hl-class");
						}
						liUpdated.innerHTML = updateAddressValueB;
						liUpdated.setAttribute("id", updateAddressValueB);
					}
					document.querySelector(".update-whitelist-input-1").value = "";
					document.querySelector(".update-whitelist-input-2").value = "";

				}

			} catch (error) {

				errorLog(error);
				conLogNotice(updateEventName,eventFailed);
				errorNotice = createNoticeEl("p",`${updateEventName} :: ${eventFailed}`,['hl-class','mt-05em']);
				contractTriggerContainerSelector.appendChild(errorNotice);
				document.querySelector(".update-whitelist-input-1").value = "";
				document.querySelector(".update-whitelist-input-2").value = "";

			}

        });

		// }}}

		// {READ RECORDS} {{{
		readWhitelistBtnSelector.addEventListener("click", async (e) => {

			eventLog(e);

			whitelistAccs = await whitelistCntr.methods.returnWhiteList().call();
			console.log(whitelistAccs);

			accDisplayUl = document.querySelector(".acc-display");
			accDisplayUl.innerHTML = '';
			contractUIPSelector.innerHTML = contractUIPheader;
			contractUIPSelector.append(hrEl);
			if(whitelistAccs.length > 0) {
				whitelistAccs.forEach(acc => genListItem(acc,ethereum.selectedAddress,accDisplayUl));
			} else {
				accDisplayLi = document.createElement("li");
				accDisplayLi.appendChild(document.createTextNode('notice :: no addresses found'));
				accDisplayLi.classList.add("hl-class");
				accDisplayUl.appendChild(accDisplayLi);
			}

        });
		// }}}

	} else {
		console.log(contractAccessUser);
		console.log(contractAccessUserNoitce);
	}

});
