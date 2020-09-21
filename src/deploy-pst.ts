import arweave from "./utils/client";
import { readFileSync } from "fs";
import { join } from "path";

const exchangePST: string = "fE2OcfjlS-sHqG5K8QvxE8wHtcqKxS-YV0bDEgxo-eI",
  key = JSON.parse(
    new TextDecoder().decode(
      readFileSync(join(__dirname, "../assets/keyfile.json"))
    )
  );

async function supportPST(pstContractID: string) {
  let pstTransaction = await arweave.createTransaction(
    { data: pstContractID },
    key
  );

  pstTransaction.addTag("Content-Type", "text/html");
  pstTransaction.addTag("Exchange", "Verto");
  pstTransaction.addTag("Type", "PST");
  pstTransaction.addTag("Contract", exchangePST);

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

supportPST("FcM-QQpfcD0xTTzr8u4Su9QCgcvRx_JH4JSCQoFi6Ck");
