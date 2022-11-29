const chai = require('chai');
const { assert } = require('console');
const { it } = require('node:test');

chai.use(require("chai-as-promised"))

const expect = chai.expect;

const MultiSigWallet = artifacts.require("MultiSigWallet")

contract("MultiSigWallet", accounts=>{
    const owners = [accounts[0], accounts[1], accounts[2]]
    const NUM_CONFIRMATIONS_REQUIRED =2

    let wallet

    beforeEach(async ()=>{
       wallet = await MultiSigWallet.new(owners, NUM_CONFIRMATIONS_REQUIRED)

    })

    describe("contractor",()=>{
        it("should deloy", async()=>{
            const wallet = await MultiSigWallet.new(
                owners, 
                NUM_CONFIRMATIONS_REQUIRED)

                for( let i = 0; i< owners; i++){
                    assert.equal(await wallet.owners[i],owners[i])
                }

                assert.equal(
                    await wallet.numConfirmationsRequired(),
                    NUM_CONFIRMATIONS_REQUIRED
                )

        })
    })


})