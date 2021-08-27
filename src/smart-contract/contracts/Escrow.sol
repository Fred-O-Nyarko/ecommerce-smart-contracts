// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Store.sol";

 contract Escrow {
    address owner;
    address payable public buyer;
    address payable public seller;
    bytes32 productId;
    uint256 createdAt = block.timestamp;
    uint256 public buyerOk;
    uint256 public sellerOk;

    modifier onlyParticipant() {
        require(msg.sender == buyer || msg.sender == seller);
        _;
    }

    constructor(
        address payable _buyer,
        address payable _seller,
        bytes32 _productId
    )  payable public {
        require(msg.value > 0);
        owner = msg.sender;
        buyer = _buyer;
        seller = _seller;
        productId = _productId;
    }

    function accept() public onlyParticipant {
        Store store = Store(owner);

        if (msg.sender == seller && sellerOk == 0) {
            sellerOk = block.timestamp;
            store.updateProductStatus(productId, Store.ProductStatus.Shipping);
        } else if (msg.sender == buyer && buyerOk == 0) {
            buyerOk = block.timestamp;
            store.updateProductStatus(productId, Store.ProductStatus.Sold);
        }

        if (buyerOk != 0 && sellerOk != 0) {
            seller.transfer(address(this).balance);
        }
    }

    function reject() public onlyParticipant {
        Store store = Store(owner);
        store.updateProductStatus(productId, Store.ProductStatus.Available);
        buyer.transfer(address(this).balance);
    }
}
