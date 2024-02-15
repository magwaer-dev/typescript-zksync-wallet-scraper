import { gotScraping } from "got-scraping";
import { HttpProxyAgent, HttpsProxyAgent } from "hpagent";

interface ApiResponse<T> {
  status: string;
  message: string;
  result: T;
}

export interface AccountTransactionsResponseDto {
  status: string;
  message: string;
  result: {
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
  }[];
}

export interface AccountEtherBalanceResponseDto {
  status: string;
  message: string;
  result: string;
}

export interface ContractSourceCodeDto {
  result: {
    ABI: string;
    SourceCode: string;
    ConstructorArguments: string;
    ContractName: string;
    OptimizationUsed: string;
    Library: string;
    LicenseType: string;
    CompilerVersion: string;
    ZkCompilerVersion: string;
    EVMVersion: string;
    Runs: string;
    SwarmSource: string;
    Proxy: string;
    Implementation: string;
  }[];
}

export interface ContractCreationInfoDto {
  contractAddress: string;
  contractCreator: string;
  txHash: string;
}

export interface ContractSourceCodeDto {
  ABI: string;
  SourceCode: string;
  ConstructorArguments: string;
  ContractName: string;
  OptimizationUsed: string;
  Library: string;
  LicenseType: string;
  CompilerVersion: string;
  ZkCompilerVersion: string;
  EVMVersion: string;
  Runs: string;
  SwarmSource: string;
  Proxy: string;
  Implementation: string;
}

interface RequestOptions {
  url: string;
  headers?: { [key: string]: string | undefined };
  agent?: { [protocol: string]: HttpProxyAgent | HttpsProxyAgent };
  responseType: "json";
}

export async function makeApiRequest<T>(apiUrl: string, proxy?: string, userAgent?: string) {
  const options: RequestOptions = {
    url: apiUrl,
    headers: {
      "user-agent": userAgent,
    },
    responseType: "json",
  };

  // Determine proxy protocol
  if (proxy !== undefined) {
    const proxyProtocol = proxy.startsWith("https") ? "https" : "http";
    options.agent = {
      [proxyProtocol]: proxy.startsWith("https") ? new HttpsProxyAgent({ proxy }) : new HttpProxyAgent({ proxy }),
    };
  }

  const response = await gotScraping<ApiResponse<T>>(options);
  if (response.body.status === "1") {
    return response.body as T;
  } else {
    const errorMessage = response.body.message;
    throw new Error("Error in API response: " + errorMessage);
  }
}

// makeApiRequest<AccountEtherBalanceResponseDto>("https://block-explorer-api.mainnet.zksync.io/api?module=account&action=balance&address=0xd3D526A8CCA22Fe072cD1852faA4F0a6F2C21765");
// makeApiRequest<AccountEtherBalanceResponseDto>("https://block-explorer-api.mainnet.zksync.io/api?module=account&action=balance&address=0xd3D526A8CCA22Fe072cD1852faA4F0a6F2C21765");
