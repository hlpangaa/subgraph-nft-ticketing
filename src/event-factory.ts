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
  contractDisabled.caller = event.params.caller;
  contractDisabled.nft = event.params.nft;

  contractDisabled.save();
  activeEvent!.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

function getIdFromEventParams(nft: Address): Bytes {
  return Bytes.fromHexString(nft.toHexString());
}
