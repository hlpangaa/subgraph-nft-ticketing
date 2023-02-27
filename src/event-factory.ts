import {
  ContractCreated as ContractCreatedEvent,
  ContractDisabled as ContractDisabledEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/EventFactory/EventFactory"
import {
  ContractCreated,
  ContractDisabled,
  OwnershipTransferred
} from "../generated/schema"

export function handleContractCreated(event: ContractCreatedEvent): void {
  let entity = new ContractCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.creator = event.params.creator
  entity.nft = event.params.nft

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleContractDisabled(event: ContractDisabledEvent): void {
  let entity = new ContractDisabled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.caller = event.params.caller
  entity.nft = event.params.nft

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
