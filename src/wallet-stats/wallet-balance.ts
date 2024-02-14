import { balanceApiEndpoint } from "../utils/constants";
import { buildApiUrl, giveParams, weiToEth } from "../utils/helper-functions";
import { makeApiRequest, AccountEtherBalanceResponseDto } from "../utils/makeApiRequest";

export async function getBalance(walletAddress: string, proxy?: string, userAgent?: string) {
  const params = giveParams("address", walletAddress);
  const apiUrl = buildApiUrl(balanceApiEndpoint, params);
  const response = await makeApiRequest<AccountEtherBalanceResponseDto>(apiUrl, proxy, userAgent);
  // console.log(response);
  console.log("Log from wallet-balance.ts/line 10:", "Using Proxy: ", proxy, "for address: ", walletAddress, "with user-agent: ", userAgent);

  if (response === null) {
    console.error("Error: Response from balance API is null.");
    return null;
  }

  const balanceWei = parseFloat(response.result);
  const balanceEth = weiToEth(balanceWei);

  return balanceEth;
}

// getBalance(walletAddress);
