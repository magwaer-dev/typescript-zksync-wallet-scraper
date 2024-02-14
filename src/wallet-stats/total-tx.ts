import { buildApiUrl, giveParams } from "../utils/helper-functions";
import { txListApiEndpoint } from "../utils/constants";
import { AccountTransactionsResponseDto, makeApiRequest } from "../utils/makeApiRequest";

export interface Transaction {
  hash: string;
  to: string;
  from: string;
  transactionIndex: string;
  input: string;
  value: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  fee: string;
  nonce: string;
  confirmations: string;
  blockNumber: string;
  blockHash: string;
  timeStamp: string;
  commitTxHash: string | null;
  proveTxHash: string | null;
  executeTxHash: string | null;
  isL1Originated: string;
  l1BatchNumber: string;
  contractAddress: string | null;
  isError: string;
  txreceipt_status: string;
  methodId: string;
  functionName: string;
  type: string;
}

export async function getTransactions(walletAddress: string, proxy?: string, userAgent?: string) {
  const pageSize = 10;
  let page = 1;
  let allTransactions: Transaction[] = [];

  try {
    while (true) {
      const params = giveParams("address", walletAddress, page, pageSize);
      const apiUrl = buildApiUrl(txListApiEndpoint, params);

      const response = await makeApiRequest<AccountTransactionsResponseDto>(apiUrl, proxy, userAgent);

      if (response !== null) {
        const filteredTransactions = response.result.filter((transaction) => transaction.isError === "0");
        allTransactions = allTransactions.concat(filteredTransactions);

        if (response.result.length < pageSize) {
          break;
        } else {
          page++;
        }
      } else {
        console.error("Unexpected response format:", response);
        break;
      }
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }

  // console.log(allTransactions);
  return allTransactions;
}

// getTransactions(walletAddress)
