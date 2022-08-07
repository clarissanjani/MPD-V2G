const Auction = artifacts.require("Auction");

contract("Auction", async accounts => {

 let auction;
 const ownerAccount = accounts[0];
 const userAccountOne = accounts[1];
 const userAccountTwo = accounts[2];
 const userAccountThree = accounts[3];
 const amount = 50000000000000000; // 5 ETH
 const smallAmount = 3000000000000000000; // 3 ETH

 beforeEach(async () => {
   auction = await Auction.new({from: ownerAccount});
 })

 it("should make commit capacity to make bid", async () => {
   await auction.makeBid({value: amount, from: userAccountOne});
   const bidAmount = await auction.bids(userAccountOne);
   assert.equal(bidAmount, amount)
 });

 it("should reject owner's committed capacity", async () => {
   try {
     await auction.makeBid({value: amount, from: ownerAccount});
   } catch (e) {
     assert.include(e.message, "Owner is not allowed to commit capacity")
   }
 });

 it("should require higher committed capacity amount amount.", async () => {
   try {
     await auction.makeBid({value: amount, from: userAccountOne});
     await auction.makeBid({value: smallAmount, from: userAccountTwo});
   } catch (e) {
     assert.include(e.message, "Bid error: Commit higher pooled capacity")
   }
 });


 it("should fetch capacity.", async () => {
   await auction.makeBid({value: amount, from: userAccountOne});
   const tradedPoolCapacity = await auction.fetchBestBid();
   assert.equal(TradedPoolCapacity.bidAmount, amount)
   assert.equal(TradedPoolCapacity.bidder, userAccountOne)
 });

 it("should fetch owner.", async () => {
   const owner = await auction.getOwner();
   assert.equal(owner, ownerAccount)
 });

})