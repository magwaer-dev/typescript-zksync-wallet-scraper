import { CONTRACT_TYPE_CONTRACT, CONTRACT_TYPE_WALLET, contractApiEndpoint, getContractCreationApiEndpoint } from "../utils/constants";
import { buildApiUrl, giveParams } from "../utils/helper-functions";
import { ContractSourceCodeDto, makeApiRequest } from "../utils/makeApiRequest";

async function getContractInfo(walletAddress: string, proxy?: string, userAgent?: string) {
  const params = giveParams("address", walletAddress);
  const apiUrl = buildApiUrl(contractApiEndpoint, params);
  const response = await makeApiRequest<ContractSourceCodeDto>(apiUrl, proxy, userAgent);
  // console.log(apiUrl);

  if (response?.result && response.result.length > 0) {
    // console.log(response.result[0]);
    return response.result[0];
  } else {
    console.error("Response might be null");
    return null;
  }
}
// this function checks the contract creation and sometimes if there is no contract it triggers the log: "Error in API response No data found" (needs fix)
async function checkContractCreation(walletAddress: string, proxy?: string, userAgent?: string) {
  try {
    const params = giveParams("contractaddresses", walletAddress);
    const apiUrl = buildApiUrl(getContractCreationApiEndpoint, params);
    const response = await makeApiRequest<ContractSourceCodeDto>(apiUrl, proxy, userAgent);

    return response !== null;
  } catch (error) {
    console.error("Error while checking contract creation", error);
  }
}

export async function getWalletType(walletAddress: string) {
  const contractInfo = await getContractInfo(walletAddress);

  if (contractInfo && contractInfo.ContractName === "") {
    const isContractCreation = await checkContractCreation(walletAddress);
    return isContractCreation ? CONTRACT_TYPE_CONTRACT : CONTRACT_TYPE_WALLET;
  } else {
    return CONTRACT_TYPE_CONTRACT;
  }
}