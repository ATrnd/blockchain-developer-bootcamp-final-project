const Whitelist = artifacts.require("Whitelist");

contract("Whitelist", (accounts) => {

    /**
     * @dev Store the default length of the whitelisted addresses array.
     */
    const defaultWhitelistLength = 0;

    /**
     * @dev Deploy the Whitelist contract.
     */
    before(async () => {
        whitelist = await Whitelist.deployed();
    });

    /**
     * @dev Test if the whitelist is empty.
     *
     * Requirements:
     *
     * - The whitelist array must not be empty.
     */
    describe("testing whitelist contract :: default params", async () => {

        it("the default whitelist array is empty", async () => {
            const whiteListedAccounts = await whitelist.getWhitelistLength();
            assert.equal(whiteListedAccounts, defaultWhitelistLength, "the default whitelist array must be empty");
        });

    });

    /**
     * @dev Test the 'whiteListAddress' function. (Add records to the whitelist)
     *
     * Requirements:
     *
     * - The whitelist array must grow in size after adding a record to it.
     * - The first record of the whitelist must match the record we added to it.
     * - The record added to the whitelist must have a flag with the value of true.
     */
    describe("testing whitelist contract :: basic functionality", async () => {

        before("add an address to our whitelist", async () => {
            await whitelist.whiteListAddress(accounts[1], { from: accounts[0] });
        });

        it("the length of the whitelist has grown by one after we added an address to it", async () => {
            const whiteListedAccountsLength = await whitelist.getWhitelistLength();
            assert.equal(whiteListedAccountsLength, 1, "the length of the whitelist should have grown by one after we added an address to it");
        });

        it("the address in the whitelist array matches the address we added to it", async () => {
            const whiteListedAccount = await whitelist.whitelistedAccounts(0);
            assert.equal(whiteListedAccount, accounts[1], "the address in the whitelist array should match the address we added");
        });

        it("the address in the whitelist array is flagged in order to maintain uniqueness on the list", async () => {
            const whiteListedAccountFlag = await whitelist.whitelistedFlags(accounts[1]);
            assert.equal(whiteListedAccountFlag, true, "the address in the whitelist array should have been flagged in order to maintain uniqueness on the list");
        });

    });

    /**
     * @dev Test the 'whitelistedIndexes' function. (Index records in the whitelist)
     *
     * Requirements:
     *
     * - The second record added to the whitelist must have an index of 1.
     * - The second records index stored in the 'whitelistedIndexes' mapping must point to the index of the same address in the 'whitelistedAccounts' array.
     */
    describe("testing whitelist contract :: index functionality", async () => {

        before("add another address to our whitelist", async () => {
            await whitelist.whiteListAddress(accounts[2], { from: accounts[0] });
        });

        it("the index mapping stores the index of the newly added address", async () => {
            const whiteListedAccountIndex = await whitelist.whitelistedIndexes(accounts[2]);
            assert.equal(whiteListedAccountIndex, 1, "the index mapping should store the index of the newly added address");
        });

        it("the index from our index mapping points to the newly added address", async () => {
            const whiteListedAccountIndex = await whitelist.whitelistedIndexes(accounts[2]);
            const whiteListedAccountTest = await whitelist.whitelistedAccounts(whiteListedAccountIndex);
            assert.equal(whiteListedAccountTest, accounts[2], "using the index from our index mapping should point to the newly added address");
        });

    });

    /**
     * @dev Test the 'updateWhitelist' function. (update records on the whitelist)
     *
     * Requirements:
     *
     * - The update procedure mustn't affect the size of the array.
     * - The updated records index stored in the 'whitelistedIndexes' must be updated.
     * - The updated records flag stored in the 'whitelistedFlags' must be updated.
     * - The old records flag stored in the 'whitelistedFlags' must be restored to its default value.
     * - The old records index stored in the 'whitelistedIndexes' must be restored to its default value.
     */
    describe("testing whitelist contract :: update functionality", async () => {

        before("updating a record from our whitelist", async () => {
            await whitelist.updateWhitelist(accounts[2], accounts[3], { from: accounts[0] });
        });

        it("the updated record hasn't affected the size of the array", async () => {
            const whiteListedAccountsLength = await whitelist.getWhitelistLength();
            assert.equal(whiteListedAccountsLength, 2, "the updated record shouldn't affect the size of the array");
        });

        it("the updated records index is modified in the index mapping", async () => {
            const updatedRecordIndex = await whitelist.returnAccountIndex(accounts[3]);
            assert.equal(updatedRecordIndex, 1, "the updated records index should be updated in the index mapping");
        });

        it("the updated records flag is modified in the flag mapping", async () => {
            const updatedRecordFlag = await whitelist.whitelistedFlags(accounts[3]);
            assert.equal(updatedRecordFlag, true, "the updated records flag should be modified in the flag mapping");
        });

        it("the old records flag is restored to its default value in the flag mapping", async () => {
            const oldRecordFlag = await whitelist.whitelistedFlags(accounts[2]);
            assert.equal(oldRecordFlag, false, "the old records flag should have been restored to its default value in the flag mapping");
        });

        it("the old records index is restored to its default value in the index mapping", async () => {
            const oldRecordIndex = await whitelist.whitelistedIndexes(accounts[2]);
            assert.equal(oldRecordIndex, 0, "the old records index should have been restored to its default value in the index mapping");
        });

    });

    /**
     * @dev Test the 'deleteFromWhitelist' function. (delete records from the whitelist)
     *
     * Requirements:
     *
     * - The delete procedure must affect the size of the array.
     * - The deleted records flag stored in the 'whitelistedFlags' must be restored to its default value.
     * - The deleted records index stored in the 'whitelistedIndexes' must be restored to its default value.
     */
    describe("testing whitelist contract :: delete functionality", async () => {

        before("deleting a record from our whitelist", async () => {
            await whitelist.deleteFromWhitelist(accounts[3], { from: accounts[0] });
        });

        it("the deleted record affected the size of the array", async () => {
            const whiteListedAccountsLength = await whitelist.getWhitelistLength();
            assert.equal(whiteListedAccountsLength, 1, "deleting a record should affect the size of the array");
        });

        it("the deleted records flag is restored to its default value in the flag mapping", async () => {
            const deletedRecordFlag = await whitelist.whitelistedFlags(accounts[2]);
            assert.equal(deletedRecordFlag, false, "the deleted records flag should have been restored to its default value in the flag mapping");
        });

        it("the deleted records index is restored to its default value in the index mapping", async () => {
            const deletedRecordIndex = await whitelist.whitelistedIndexes(accounts[3]);
            assert.equal(deletedRecordIndex, 0, "the deleted records index should have been restored to its default value in the index mapping");
        });

    });

});
