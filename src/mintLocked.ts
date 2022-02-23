import Arweave from "arweave";
import { readFileSync } from "fs";
import { join } from "path";
import { interactWrite } from "smartweave";

const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const key = JSON.parse(
  new TextDecoder().decode(
    readFileSync(join(__dirname, "../assets/keyfile.json"))
  )
);

const blockMiliseconds = 2 * 60_000; // blocktime in miliseconds (1 block ~ 2 mins)
const vestingStart = new Date("2021.09.09."); // start date of the vesting
const totalTokens = 50_000; // total tokens to send each recipient
const cliffs = 3; // amount of unlocks to devide tokens for
const recipients: string[] = ["9EQhuhXch2fcyVDDJTU4XtNrG-YB0KXqcTgc4cjFtpQ"]; // recipient addresses

const cliffDelayMonths = 6;
const cliffInitialDelay = 12;

const votes: {
  recipient: string;
  qty: number;
  lockLength: number;
}[] = [
  // 12 months      ~ 262800
  // 18 months      ~ 394200
  // 24 months      ~ 525600
];

// loop through lock recipients
for (const recipient of recipients) {
  // the amount of tokens per unlock
  const oneUnlockAmount = totalTokens / cliffs;

  for (let i = 0; i < cliffs; i++) {
    // calculate the current lock length in the loop in months
    const lockLengthMonths = cliffInitialDelay + (i !== 0 ? cliffDelayMonths * i : 0);

    // setup the unlock date
    const unlockDate = new Date(vestingStart);

    // vesting start date + length of the lock
    unlockDate.setMonth(unlockDate.getMonth() + lockLengthMonths);

    // calculate milliseconds & blocks till the unlock
    const millisecondsTillUnlock = unlockDate.getTime() - new Date().getTime();
    const blocksTillUnlock = millisecondsTillUnlock / blockMiliseconds;

    // Math floor of the amount of tokens per unlock
    const roundedQty = Math.floor(oneUnlockAmount);
    // qty of tokens that the user is actually receiving in his unlock
    // if this is the last unlock, the holder receives all the tokens
    // that were "rounded to floor" in other unlocks
    const qty = i === (cliffs - 1) ? totalTokens - (roundedQty * i) : roundedQty;

    votes.push({
      recipient,
      qty,
      lockLength: Math.ceil(blocksTillUnlock)
    });
  }
}

async function mintLocked() {
  for (const vote of votes) {
    const txID = await interactWrite(
      client,
      key,
      "usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A",
      {
        function: "transferLocked",
        target: vote.recipient,
        qty: vote.qty,
        lockLength: vote.lockLength,
      }
    );
    console.log(
      JSON.stringify({
        voteID: txID,
        recipient: vote.recipient,
        lockLength: vote.lockLength,
      })
    );
  }
}

mintLocked();
