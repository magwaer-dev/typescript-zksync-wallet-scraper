import { CONTRACT_TYPE_UNKNOWN, contractApiEndpoint } from "../utils/constants";
import { buildApiUrl, giveParams } from "../utils/helper-functions";
import { ContractSourceCodeDto, makeApiRequest } from "../utils/makeApiRequest";

export async function getContractName(address: string, proxy?: string, userAgent?: string) {
  const params = giveParams("address", address);
  const apiUrl = buildApiUrl(contractApiEndpoint, params);
  const response = await makeApiRequest<ContractSourceCodeDto>(apiUrl, proxy, userAgent);

  //   console.log(response);

  if (response.result.length > 0) {
    const contractNames = response.result.map((contract) => contract.ContractName);
    const lastWord = contractNames.map((contractName) => extractLastWord(contractName));
    const concatenatedLastWord = lastWord.join(" ");

    const result = concatenatedLastWord || CONTRACT_TYPE_UNKNOWN;
    // console.log(result);

    return result;
  }
  return CONTRACT_TYPE_UNKNOWN;
}

function extractLastWord(str: string) {
  const words = str.split(":");
  return words[words.length - 1];
}
// getContractName("0x000000000000000000000000000000000000800A");
