import arweave from "./utils/client";
import { readFileSync } from "fs";
import { join } from "path";

const key = JSON.parse(
  new TextDecoder().decode(
    readFileSync(join(__dirname, "../assets/keyfile.json"))
  )
);

async function pstTransfer(pstContractID: string) {
  let pstTransaction = await arweave.createTransaction(
    {
      data: "test",
    },
    key
  );

  pstTransaction.addTag("Content-Type", "text/html");
  pstTransaction.addTag("Exchange", "Verto");
  pstTransaction.addTag(
    "Input",
    `{"function":"transfer","target":"l-x7026roC1dkAmJ5iWhz4vGOxVnKmotGbceFAA-NwE","qty":10000}`
  );
  pstTransaction.addTag("Contract", pstContractID);

  try {
    await arweave.transactions.sign(pstTransaction, key);
  } catch (err) {
    console.log(err);
  }

  try {
    const response = await arweave.transactions.post(pstTransaction);
    console.log(response.status);
  } catch (err) {
    console.log(err);
  }
}

pstTransfer("c25-RdheC6khcACLv23-XXg1W7YuA-VSZ_1_qnNFbhw");
