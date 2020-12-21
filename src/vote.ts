import Community from "community-js";
import arweave from "./utils/client";
import { interactWrite } from "smartweave";

import { contractID } from "./balance";
import { readFileSync } from "fs";
import { join } from "path";

const community: Community = new Community(arweave);
const key = JSON.parse(
  new TextDecoder().decode(
    readFileSync(join(__dirname, "../assets/keyfile.json"))
  )
);

async function getState() {
  await community.setCommunityTx(contractID);
  const state = await community.getState();
  console.log("Fetched contract state");
  return state;
}

async function sortVotes() {
  const votes = (await getState()).votes;
  const activeVotes = [];
  for (let i = 0; i < votes.length; i++) {
    if (votes[i].status === "active") {
      activeVotes.push({
        description: votes[i].note,
        index: i,
      });
    }
  }
  console.log("Found all active votes");
  return activeVotes;
}

async function voteOnProposed() {
  const needVote = await sortVotes();
  console.log(await community.setWallet(key));
  console.log(await community.getVaultBalance());
  const voteTxIDs = [];
  console.log("Voting on proposals");
  for (let i = 0; i < needVote.length; i++) {
    // let vote = await community.vote(needVote[i].index, "yay");
    let vote = await interactWrite(arweave, key, contractID, {
      function: "vote",
      id: needVote[i].index,
      cast: "yay",
    });
    voteTxIDs.push(vote);
    console.log("Successfully voted on proposal: " + needVote[i].index);
  }
  console.log(voteTxIDs);
}

voteOnProposed();

// Ignore this - was looking at formatting
let votes = [
  {
    status: "passed",
    type: "set",
    note: "Adding the application url",
    yays: 1051200000000,
    nays: 0,
    voted: [Array],
    start: 552578,
    totalWeight: 1055217988800,
    key: "communityAppUrl",
    value: "https://verto.exchange",
  },
  {
    status: "quorumFailed",
    type: "set",
    note: "Adding the Discord chat link",
    yays: 0,
    nays: 0,
    voted: [],
    start: 552580,
    totalWeight: 1055217988800,
    key: "communityDiscussionLinks",
    value: [Array],
  },
  {
    status: "quorumFailed",
    type: "set",
    note: "Adding the description",
    yays: 0,
    nays: 0,
    voted: [],
    start: 552580,
    totalWeight: 1055217988800,
    key: "communityDescription",
    value: "🦔 A decentralized PST exchange for Arweave",
  },
  {
    status: "quorumFailed",
    type: "set",
    note: "Adding the Verto logo",
    yays: 0,
    nays: 0,
    voted: [],
    start: 552581,
    totalWeight: 1055217988800,
    key: "communityLogo",
    value: "lD6n95Kf1V8kVSU99MSJeX7wLycpm0JLKnU0IEMWtl8",
  },
  {
    status: "passed",
    type: "mintLocked",
    note: "(#1) Private Investor 12-Month Mint Lock",
    yays: 1051200000000,
    nays: 0,
    voted: [Array],
    start: 578637,
    totalWeight: 1055217988800,
    recipient: "jTA8_iBEM8wkjWRdPIneXa2tJW9mDAV59-ZHIb5KXsU",
    qty: 2083333,
    lockLength: 262800,
  },
  {
    status: "passed",
    type: "mintLocked",
    note: "(#1) Private Investor 18-Month Mint Lock",
    yays: 1051200000000,
    nays: 0,
    voted: [Array],
    start: 578638,
    totalWeight: 1055217988800,
    recipient: "jTA8_iBEM8wkjWRdPIneXa2tJW9mDAV59-ZHIb5KXsU",
    qty: 2083333,
    lockLength: 394200,
  },
  {
    status: "passed",
    type: "mintLocked",
    note: "(#1) Private Investor 24-Month Mint Lock",
    yays: 1051200000000,
    nays: 0,
    voted: [Array],
    start: 578638,
    totalWeight: 1055217988800,
    recipient: "jTA8_iBEM8wkjWRdPIneXa2tJW9mDAV59-ZHIb5KXsU",
    qty: 2083334,
    lockLength: 525600,
  },
  {
    status: "passed",
    type: "set",
    note: "Set the community logo",
    yays: 1051200000000,
    nays: 0,
    voted: [Array],
    start: 578652,
    totalWeight: 1055217988800,
    key: "communityLogo",
    value: "9CYPS85KChE_zQxNLi2y5r2FLG-YE6HiphYYTlgtrtg",
  },
  {
    status: "passed",
    type: "set",
    note: "Set the community Discord link",
    yays: 1051200000000,
    nays: 0,
    voted: [Array],
    start: 578652,
    totalWeight: 1055217988800,
    key: "communityDiscussionLinks",
    value: [Array],
  },
  {
    status: "passed",
    type: "set",
    note: "Set the community description",
    yays: 1051200000000,
    nays: 0,
    voted: [Array],
    start: 578654,
    totalWeight: 1055217988800,
    key: "communityDescription",
    value: "A decentralized token exchange protocol on Arweave.",
  },
  {
    status: "passed",
    type: "mintLocked",
    note: "(#2) Private Investor 12-Month Mint Lock",
    yays: 1051200000000,
    nays: 0,
    voted: [Array],
    start: 579281,
    totalWeight: 1055217988800,
    recipient: "3kN6ZCAWshR2RuSksjHavXJZqh7ZwRamFQlKYSP70ao",
    qty: 625000,
    lockLength: 262800,
  },
  {
    status: "passed",
    type: "mintLocked",
    note: "(#2) Private Investor 18-Month Mint Lock",
    yays: 1051200000000,
    nays: 0,
    voted: [Array],
    start: 579282,
    totalWeight: 1055217988800,
    recipient: "3kN6ZCAWshR2RuSksjHavXJZqh7ZwRamFQlKYSP70ao",
    qty: 625000,
    lockLength: 394200,
  },
  {
    status: "passed",
    type: "mintLocked",
    note: "(#2) Private Investor 24-Month Mint Lock",
    yays: 1051200000000,
    nays: 0,
    voted: [Array],
    start: 579282,
    totalWeight: 1055217988800,
    recipient: "3kN6ZCAWshR2RuSksjHavXJZqh7ZwRamFQlKYSP70ao",
    qty: 625000,
    lockLength: 525600,
  },
  {
    status: "quorumFailed",
    type: "mintLocked",
    note: "(#3) Private Investor 24-Month Mint Lock",
    yays: 1051200000000,
    nays: 0,
    voted: [Array],
    start: 584556,
    totalWeight: 4258093120200,
    recipient: "VOVgJ8yrpsYTHxI4ElnQfja49J_bT4urMufJPcfLvmg",
    qty: 625000,
    lockLength: 525600,
  },
  {
    status: "quorumFailed",
    type: "mintLocked",
    note: "(#3) Private Investor 18-Month Mint Lock",
    yays: 1051200000000,
    nays: 0,
    voted: [Array],
    start: 584556,
    totalWeight: 4258093120200,
    recipient: "VOVgJ8yrpsYTHxI4ElnQfja49J_bT4urMufJPcfLvmg",
    qty: 625000,
    lockLength: 394200,
  },
  {
    status: "quorumFailed",
    type: "mintLocked",
    note: "(#3) Private Investor 12-Month Mint Lock",
    yays: 1051200000000,
    nays: 0,
    voted: [Array],
    start: 584556,
    totalWeight: 4258093120200,
    recipient: "VOVgJ8yrpsYTHxI4ElnQfja49J_bT4urMufJPcfLvmg",
    qty: 625000,
    lockLength: 262800,
  },
  {
    status: "active",
    type: "mintLocked",
    note: "(#3) Private Investor 12-Month Mint Lock",
    yays: 0,
    nays: 0,
    voted: [],
    start: 589786,
    totalWeight: 4258093120200,
    recipient: "VOVgJ8yrpsYTHxI4ElnQfja49J_bT4urMufJPcfLvmg",
    qty: 625000,
    lockLength: 262800,
  },
  {
    status: "active",
    type: "mintLocked",
    note: "(#3) Private Investor 18-Month Mint Lock",
    yays: 0,
    nays: 0,
    voted: [],
    start: 589786,
    totalWeight: 4258093120200,
    recipient: "VOVgJ8yrpsYTHxI4ElnQfja49J_bT4urMufJPcfLvmg",
    qty: 625000,
    lockLength: 394200,
  },
  {
    status: "active",
    type: "mintLocked",
    note: "(#3) Private Investor 24-Month Mint Lock",
    yays: 0,
    nays: 0,
    voted: [],
    start: 589788,
    totalWeight: 4258093120200,
    recipient: "VOVgJ8yrpsYTHxI4ElnQfja49J_bT4urMufJPcfLvmg",
    qty: 625000,
    lockLength: 525600,
  },
  {
    status: "active",
    type: "mintLocked",
    note: "(#4) Private Investor 12-Month Mint Lock",
    yays: 0,
    nays: 0,
    voted: [],
    start: 589789,
    totalWeight: 4258093120200,
    recipient: "Apba2kQp8U1Rq1K-0YaX0M4POgaC8d0jEGRzIx0vMQQ",
    qty: 260416,
    lockLength: 262800,
  },
  {
    status: "active",
    type: "mintLocked",
    note: "(#4) Private Investor 24-Month Mint Lock",
    yays: 0,
    nays: 0,
    voted: [],
    start: 589789,
    totalWeight: 4258093120200,
    recipient: "Apba2kQp8U1Rq1K-0YaX0M4POgaC8d0jEGRzIx0vMQQ",
    qty: 260417,
    lockLength: 525600,
  },
  {
    status: "active",
    type: "mintLocked",
    note: "(#4) Private Investor 18-Month Mint Lock",
    yays: 0,
    nays: 0,
    voted: [],
    start: 589789,
    totalWeight: 4258093120200,
    recipient: "Apba2kQp8U1Rq1K-0YaX0M4POgaC8d0jEGRzIx0vMQQ",
    qty: 260417,
    lockLength: 394200,
  },
];
