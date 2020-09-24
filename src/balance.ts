import { interactRead } from "smartweave";
import arweave from "./utils/client";

const contractID: string = "usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A";

const balance = async (addr: string) => {
  const contract = await interactRead(
    arweave,
    await arweave.wallets.generate(),
    contractID,
    {
      target: addr,
      function: "unlockedBalance",
    }
  );

  console.log(contract.balance);
};

balance("aLemOhg9OGovn-0o4cOCbueiHT9VgdYnpJpq7NgMA1A");
