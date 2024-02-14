import { getTransactions } from "./total-tx";

export async function getUniqueAddresses(walletAddress: string) {
  const transactions = await getTransactions(walletAddress);

  let uniqueAddresses: Set<string> = new Set();

  transactions.forEach((transaction) => {
    uniqueAddresses.add(transaction.to);
    uniqueAddresses.add(transaction.from);
  });

  uniqueAddresses.delete(walletAddress);
  // console.log(uniqueAddresses);

  return uniqueAddresses;
}

// getUniqueAddresses(walletAddress);
