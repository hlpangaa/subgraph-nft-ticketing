import { gql } from "@apollo/client";

// See more example queries on https://thegraph.com/explorer/subgraph/protofire/maker-protocol
const GET_ACTIVE_ITEMS = gql`
  {
    activeItems(first: 5, where: { buyer: "0x00000000" }) {
      id
      buyer
      seller
      nftAddress
      tokenId
      price
    }
  }
`;

const GET_ACTIVE_EVENTS = gql`
  {
    activeEvents(first: 5) {
      id
      creator
      nft
    }
  }
`;

const GET_BOUGHT_ITEMS = gql`
  {
    itemBoughts(first: 5) {
      id
      buyer
      nftAddress
      tokenId
      price
    }
  }
`;

const GET_CANCELED_ITEMS = gql`
  {
    itemCanceleds(first: 5) {
      id
      seller
      nftAddress
      tokenId
    }
  }
`;

const GET_LISTED_ITEMS = gql`
  {
    itemListeds(first: 5) {
      id
      seller
      nftAddress
      tokenId
      price
    }
  }
`;

const GET_ROYALITY_PAID = gql`
  {
    royalityPaid(first: 5) {
      buyer
      receiver
      nftAddress
      tokenId
      royaltyAmount
    }
  }
`;

const GET_CREATED_EVENTS = gql`
  {
    contractCreateds(first: 5) {
      id
      creator
      nft
    }
  }
`;
const GET_DISABLED_EVENTS = gql`
  {
    contractDisableds(first: 5) {
      id
      caller
      nft
    }
  }
`;
const GET_OWNERSHIP_TRANSFERRED_ITEMS = gql`
  {
    ownershipTransferreds(first: 5) {
      id
      previousOwner
      newOwner
    }
  }
`;

export default {
  GET_ACTIVE_ITEMS,
  GET_ACTIVE_EVENTS,
  GET_BOUGHT_ITEMS,
  GET_CANCELED_ITEMS,
  GET_LISTED_ITEMS,
  GET_CREATED_EVENTS,
  GET_DISABLED_EVENTS,
  GET_OWNERSHIP_TRANSFERRED_ITEMS,
};
