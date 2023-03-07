import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  NftMarketplace,
  ItemBought as ItemBoughtEvent,
  ItemCanceled as ItemCanceledEvent,
  ItemListed as ItemListedEvent,
  RoyalityPaid as RoyalityPaidEvent,
  ItemMinted as ItemMintedEvent,
} from "../generated/NftMarketplace/NftMarketplace";
import {
  ItemListed,
  ActiveItem,
  ItemBought,
  ItemCanceled,
  RoyalityPaid,
  ItemMinted,
  ItemOwned,
} from "../generated/schema";

export function handleItemListed(event: ItemListedEvent): void {
  let itemListed = ItemListed.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemListed) {
    itemListed = new ItemListed(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  if (!activeItem) {
    activeItem = new ActiveItem(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  //from ethereum
  itemListed.txHash = event.transaction.hash;
  itemListed.blockNumber = event.block.number;
  itemListed.timestamp = event.block.timestamp;
  itemListed.gasPrice = event.transaction.gasPrice;
  activeItem.txHash = itemListed.txHash;
  activeItem.blockNumber = itemListed.blockNumber;
  activeItem.timestamp = itemListed.timestamp;
  activeItem.gasPrice = itemListed.gasPrice;
  //from smart contract event
  itemListed.seller = event.params.seller;
  activeItem.seller = event.params.seller;

  itemListed.nftAddress = event.params.nftAddress;
  activeItem.nftAddress = event.params.nftAddress;

  itemListed.tokenId = event.params.tokenId;
  activeItem.tokenId = event.params.tokenId;

  itemListed.price = event.params.price;
  activeItem.price = event.params.price;

  activeItem.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );

  itemListed.save();
  activeItem.save();
}

export function handleItemCanceled(event: ItemCanceledEvent): void {
  let itemCanceled = ItemCanceled.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemCanceled) {
    itemCanceled = new ItemCanceled(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  //from ethereum
  itemCanceled.txHash = event.transaction.hash;
  itemCanceled.blockNumber = event.block.number;
  itemCanceled.timestamp = event.block.timestamp;
  itemCanceled.gasPrice = event.transaction.gasPrice;
  //from smart contract event
  itemCanceled.seller = event.params.seller;
  itemCanceled.nftAddress = event.params.nftAddress;
  itemCanceled.tokenId = event.params.tokenId;
  activeItem!.buyer = Address.fromString(
    "0x000000000000000000000000000000000000dEaD"
  );

  itemCanceled.save();
  activeItem!.save();
}

export function handleItemBought(event: ItemBoughtEvent): void {
  let itemBought = ItemBought.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemBought) {
    itemBought = new ItemBought(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  let itemOwned = ItemOwned.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemOwned) {
    itemOwned = new ItemOwned(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  //from ethereum
  itemBought.txHash = event.transaction.hash;
  itemBought.blockNumber = event.block.number;
  itemBought.timestamp = event.block.timestamp;
  itemBought.gasPrice = event.transaction.gasPrice;
  itemOwned.txHash = itemBought.txHash;
  itemOwned.blockNumber = itemBought.blockNumber;
  itemOwned.timestamp = itemBought.timestamp;
  itemOwned.gasPrice = itemBought.gasPrice;
  //from smart contract event
  itemBought.buyer = event.params.buyer;
  itemBought.nftAddress = event.params.nftAddress;
  itemBought.tokenId = event.params.tokenId;
  activeItem!.buyer = event.params.buyer;
  itemOwned.owner = itemBought.buyer;
  itemOwned.nftAddress = itemBought.nftAddress;
  itemOwned.tokenId = itemBought.tokenId;

  itemBought.save();
  itemOwned.save();
  activeItem!.save();
}

export function handleRoyalityPaid(event: RoyalityPaidEvent): void {
  let royalityPaid = RoyalityPaid.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!royalityPaid) {
    royalityPaid = new RoyalityPaid(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  //from ethereum
  royalityPaid.txHash = event.transaction.hash;
  royalityPaid.blockNumber = event.block.number;
  royalityPaid.timestamp = event.block.timestamp;
  royalityPaid.gasPrice = event.transaction.gasPrice;
  //from smart contract event
  royalityPaid.buyer = event.params.buyer;
  royalityPaid.receiver = event.params.receiver;
  royalityPaid.nftAddress = event.params.nftAddress;
  royalityPaid.tokenId = event.params.tokenId;
  royalityPaid.royaltyAmount = event.params.royaltyAmount;

  royalityPaid.save();
}

export function handleItemMinted(event: ItemMintedEvent): void {
  let itemMinted = ItemMinted.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemMinted) {
    itemMinted = new ItemMinted(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  let itemOwned = ItemOwned.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemOwned) {
    itemOwned = new ItemOwned(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  //from ethereum
  itemMinted.txHash = event.transaction.hash;
  itemMinted.blockNumber = event.block.number;
  itemMinted.timestamp = event.block.timestamp;
  itemMinted.gasPrice = event.transaction.gasPrice;
  itemOwned.txHash = itemMinted.txHash;
  itemOwned.blockNumber = itemMinted.blockNumber;
  itemOwned.timestamp = itemMinted.timestamp;
  itemOwned.gasPrice = itemMinted.gasPrice;
  //from smart contract event
  itemMinted.minter = event.params.minter;
  itemMinted.beneficiary = event.params.beneficiary;
  itemMinted.nftAddress = event.params.nftAddress;
  itemMinted.tokenId = event.params.tokenId;
  itemOwned.owner = event.params.beneficiary;
  itemOwned.nftAddress = event.params.nftAddress;
  itemOwned.tokenId = event.params.tokenId;

  itemMinted.save();
  itemOwned.save();
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString();
}
