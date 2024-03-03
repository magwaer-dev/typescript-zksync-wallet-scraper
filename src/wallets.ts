interface Wallet {
  address: string;
  userAgent: string;
  proxy?: string;
}

export const wallets: Wallet[] = [
  
  {
    address: "0x22179a4D1cC7ECD9E326423725f15888E3514DB2",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 Edg/98.0.1108.56",
    // proxy: "your-proxy-url if needed",
  },
  {
    address: "0x4F471D378B84422A971846e85bE3792b7f0f63EA",
    userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 Edg/98.0.1108.56",

    // proxy: "your-proxy-url if needed",
  },
];
