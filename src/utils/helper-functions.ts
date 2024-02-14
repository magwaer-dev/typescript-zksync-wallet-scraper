export function buildApiUrl(apiEndpoint: string, params: string): string {
  const baseApiUrl: string = "https://block-explorer-api.mainnet.zksync.io/api";
  let queryString: string = params;

  const apiUrl: string = `${baseApiUrl}?${apiEndpoint}&${queryString}`;

  // console.log(apiUrl);

  return apiUrl;
}

export function giveParams(addressParam: string, walletAddress: string, page?: number, pageSize?: number) {
  let params: URLSearchParams = new URLSearchParams();
  params.append(addressParam, walletAddress);

  if (page !== undefined) {
    params.append("page", page.toString());
  }

  if (pageSize !== undefined) {
    params.append("pageSize", pageSize.toString());
  }

  return params.toString();
}

export function weiToEth(wei: number): number {
  return wei / 1e18;
}

// buildApiUrl("module=account&action=txlist", "address=0xd3D526A8CCA22Fe072cD1852faA4F0a6F2C21765");
// buildApiUrl("module=contract&action=getsourcecode", "address=0xd3D526A8CCA22Fe072cD1852faA4F0a6F2C21765");
// buildApiUrl("module=contract&action=getcontractcreation", "address=0xd3D526A8CCA22Fe072cD1852faA4F0a6F2C21765");
