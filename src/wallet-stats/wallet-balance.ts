import { balanceApiEndpoint } from "../utils/constants";
import { buildApiUrl, giveParams, weiToEth } from "../utils/helper-functions";
import { makeApiRequest, AccountEtherBalanceResponseDto } from "../utils/makeApiRequest";

export async function getBalance(walletAddress: string, proxy?: string, userAgent?: string) {
  const params = giveParams("address", walletAddress);
  const apiUrl = buildApiUrl(balanceApiEndpoint, params);
  const response = await makeApiRequest<AccountEtherBalanceResponseDto>(apiUrl, proxy, userAgent);
  // console.log(response);
  console.log("Log from wallet-balance.ts/line 10");
  console.log("Using Proxy: ", proxy);
  console.log("for address: ", walletAddress);
  console.log("with user-agent: ", userAgent);

  if (response === null) {
    throw new Error("Error: Response from balance API is null.");
  }

  const balanceWei = parseFloat(response.result);
  const balanceEth = weiToEth(balanceWei);

  return balanceEth;
}

// getBalance(walletAddress);
