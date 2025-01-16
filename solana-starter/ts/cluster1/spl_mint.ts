import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import wallet from "../turbine3-wallet.json";
// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("61Z9VEZFB8H3xXEC4oXVSCzHQ9TJxsBAPu1mdsX5g2jC");
//Your ata is: 64v7oRjmw8m3LL8rPPNjBHN1o5yPeUNDLR1K2oSV1AJ9
//Your mint txid: 2o9txd7LkSUduX2FmeqCPT51YiQWa7FbyrY7zmEWcZTdUFyds2DLvexkNqJJZSo6DxdztBa4nFbvKdxrsq7DE5z1

(async () => {
  try {
    // Create an ATA
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );
    console.log(`Your ata is: ${ata.address.toBase58()}`);
    // Mint to ATA
    const mintTx = await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair.publicKey,
      989898989898
    );
    console.log(`Your mint txid: ${mintTx}`);
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
