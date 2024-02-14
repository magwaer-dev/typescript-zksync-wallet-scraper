import { Transaction, getTransactions } from "./total-tx";
import { getUniqueAddresses } from "./unique-addresses";
import { AccountTransactionsResponseDto } from "../utils/makeApiRequest";

export async function getUniqueAddressesTimestamp(address: string) {
  const uniqueAddresses = await getUniqueAddresses(address);
  const transactions = await getTransactions(address);
  let timeStampAddress: Map<string, Date> = new Map();
  for (const address of uniqueAddresses) {
    const timeStamp = findLastTransactionTimestamp(address, transactions);
    timeStampAddress.set(address, timeStamp);
  }

  // console.log(timeStampAddress);

  return timeStampAddress;
}

// getUniqueAddressesTimestamp();

function findLastTransactionTimestamp(address: string, transactions: Transaction[]) {
  const transactionsForAddress = transactions.filter((transaction) => transaction.to === address || transaction.from === address);
  if (transactionsForAddress.length > 0) {
    const sortedTransactions = transactionsForAddress.sort((a, b) => parseInt(b.timeStamp) - parseInt(a.timeStamp));
    return new Date(parseInt(sortedTransactions[0].timeStamp) * 1000);
  } else {
    throw new Error("No transactions found for the provided address");
  }
}

export async function getLastTxTimestamp(address: string) {
  const transactions = await getTransactions(address);
  if (transactions.length > 0) {
    const sortedTransactions = transactions.sort((a, b) => parseInt(b.blockNumber) - parseInt(a.blockNumber));
    const lastTxTimestamp = new Date(parseInt(sortedTransactions[0].timeStamp) * 1000);

    return lastTxTimestamp;
  } else {
    throw new Error("No transactions found for the provided address");
  }
}
