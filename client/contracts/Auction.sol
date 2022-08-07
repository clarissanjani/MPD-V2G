pragma solidity ^0.8.0;

contract Auction {
    // Properties
    address private owner;
    uint256 public startTime;
    uint256 public endTime;
    mapping(address => uint256) public bids;

    struct ElectricVehicle { // Electric Vehicle
        address id;
        string model;
        uint256 totalCapacity;
        uint256 committedCapacity;  // get from app
    }

    struct TradedPoolCapacity {
        uint256 bidAmount;
        uint256 sellingPrice;
        address bidders; // traded pol capacity needs to be bid
    }

    ElectricVehicle public newElectricVehicle;
    TradedPoolCapacity public tradedPoolCapacity;

    // modifiers
    // Modifiers
    modifier isOngoing() {
        require(block.timestamp < endTime, 'This auction is closed.');
        _;
    }
    modifier notOngoing() {
        require(block.timestamp >= endTime, 'This auction is still open.');
        _;
    }
    modifier isOwner() {
        require(msg.sender == owner, 'Only owner can perform task.');
        _;
    }
    modifier notOwner() {
        require(msg.sender != owner, 'Owner is not allowed to commit capacity');
        _;
    }
    // Events
    event LogBid(address indexed _bestBiddedCapacity, uint256 _tradedPoolCapacity);
    event LogWithdrawal(address indexed _withdrawer, uint256 amount);

    // Assign values to some properties during deployment
    constructor () {
        owner = msg.sender;
        startTime = block.timestamp;
        endTime = block.timestamp + 1; // 12 hours based on finished time of charging
        newElectricVehicle.model = 'Nissan Leaf';
        newElectricVehicle.totalCapacity = 40;
    }

    // make bid based on the traded pool capacity
    function makeBid() public payable isOngoing() notOwner() returns (bool) {
        uint256 bidAmount = bids[msg.sender] + msg.value;
        require(bidAmount > tradedPoolCapacity.bidAmount, 'Bid error: Pool more capacity');

        tradedPoolCapacity.bidders = msg.sender;
        tradedPoolCapacity.bidAmount = bidAmount;
        bids[msg.sender] = bidAmount;
        emit LogBid(msg.sender, bidAmount);
        return true;
    }

    function withdraw() public notOngoing() isOwner() returns (bool) {
        uint256 amount = tradedPoolCapacity.bidAmount;
        bids[tradedPoolCapacity.bidders] = 0;
        tradedPoolCapacity.bidders = address(0);
        tradedPoolCapacity.bidAmount = 0;

        (bool success, ) = payable(owner).call{ value: amount }("");
        require(success, 'Withdrawal failed.');
        emit LogWithdrawal(msg.sender, amount);
        return true;
    }

    function fetchBestBid() public view returns (TradedPoolCapacity memory) {
        TradedPoolCapacity memory _tradedPoolCapacity = tradedPoolCapacity;
        return _tradedPoolCapacity;
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}
