import { Bytes, BigInt, Address } from "@graphprotocol/graph-ts";
import {
  ContractCreated as ContractCreatedEvent,
  ContractDisabled as ContractDisabledEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/EventFactory/EventFactory";
import {
  ContractCreated,
  ContractDisabled,
  OwnershipTransferred,
  ActiveEvent,
} from "../generated/schema";

export function handleContractCreated(event: ContractCreatedEvent): void {
  let contractCreated = ContractCreated.load(
    getIdFromEventParams(event.params.nft)
  );
  let activeEvent = ActiveEvent.load(getIdFromEventParams(event.params.nft));
  if (!contractCreated) {
    contractCreated = new ContractCreated(
      getIdFromEventParams(event.params.nft)
    );
  }
  if (!activeEvent) {
    activeEvent = new ActiveEvent(getIdFromEventParams(event.params.nft));
  }
  //from ethereum
  contractCreated.txHash = event.transaction.hash;
  contractCreated.blockNumber = event.block.number;
  contractCreated.timestamp = event.block.timestamp;
  contractCreated.gasPrice = event.transaction.gasPrice;
  activeEvent.txHash = contractCreated.txHash;
  activeEvent.blockNumber = contractCreated.blockNumber;
  activeEvent.timestamp = contractCreated.timestamp;
  activeEvent.gasPrice = contractCreated.gasPrice;
  //from smart contract event
  contractCreated.creator = event.params.creator;
  activeEvent.creator = event.params.creator;

  contractCreated.nft = event.params.nft;
  activeEvent.nft = event.params.nft;

  contractCreated.save();
  activeEvent.save();
}

export function handleContractDisabled(event: ContractDisabledEvent): void {
  let contractDisabled = ContractDisabled.load(
    getIdFromEventParams(event.params.nft)
  );
  let activeEvent = ActiveEvent.load(getIdFromEventParams(event.params.nft));
  if (!contractDisabled) {
    contractDisabled = new ContractDisabled(
      getIdFromEventParams(event.params.nft)
    );
  }
  //from ethereum
  contractDisabled.txHash = event.transaction.hash;
  contractDisabled.blockNumber = event.block.number;
  contractDisabled.timestamp = event.block.timestamp;
  contractDisabled.gasPrice = event.transaction.gasPrice;
  //from smart contract event
  contractDisabled.caller = event.params.caller;
  contractDisabled.nft = event.params.nft;

  contractDisabled.save();
  activeEvent!.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let ownershipTransferred = new OwnershipTransferred(
    getIdFromEventParams(event.params.previousOwner)
  );
  ownershipTransferred.previousOwner = event.params.previousOwner;
  ownershipTransferred.newOwner = event.params.newOwner;

  ownershipTransferred.save();
}

function getIdFromEventParams(nftAddress: Address): string {
  return nftAddress.toHexString();
}
