import { getBalance } from "./wallet-stats/wallet-balance";
import { CONTRACT_TYPE_CONTRACT, CONTRACT_TYPE_WALLET } from "./utils/constants";
import { getTransactions } from "./wallet-stats/total-tx";
import { getUniqueAddresses } from "./wallet-stats/unique-addresses";
import { getWalletType } from "./wallet-stats/wallet-type";
import { getContractName } from "./wallet-stats/contract-name";
import { getUniqueAddressesTimestamp, getLastTxTimestamp } from "./wallet-stats/tx-date";
import { wallets } from "./wallets";

interface Wallet {
    address: string;
    proxy?: any;
    userAgent?: any;
}

interface Interaction {
    address: string;
    type: string;
    lastTxAt: Date;
    contractName?: string;
}

interface WalletStats {
    walletAddress: string;
    walletBalance: number;
    totalTxCount: number;
    totalUniqueAddressesCount: number;
    interactions: Interaction[];
    lastTxAt: Date;
}

async function getWalletStats(wallets: Wallet[]): Promise<WalletStats[]> {
    const walletStatsPromises = wallets.map(async (wallet) => {
        const { address, proxy, userAgent } = wallet;
        const walletBalance = await getBalance(address, proxy, userAgent);
        const walletTx = await getTransactions(address, proxy, userAgent);
        const totalTxCount = walletTx.length;
        const uniqueAddresses = await getUniqueAddresses(address);
        const totalUniqueAddresses = uniqueAddresses.size;
        const addressesWithTimestamp = await getUniqueAddressesTimestamp(address);
        const interactions: Interaction[] = [];
        for (const [address, lastTxAt] of addressesWithTimestamp) {
            const walletType = await getWalletType(address);
            let contractName: string | undefined;
            if (walletType === CONTRACT_TYPE_CONTRACT) {
                contractName = await getContractName(address, proxy, userAgent);
            }
            const interaction: Interaction = {
                address: address,
                type: walletType,
                lastTxAt: lastTxAt,
                contractName: contractName,
            };
            if (walletType === CONTRACT_TYPE_WALLET) {
                delete interaction.contractName;
            }
            interactions.push(interaction);
        }
        const lastTxAt = await getLastTxTimestamp(address);
        const walletStats: WalletStats = {
            walletAddress: address,
            walletBalance: walletBalance,
            totalTxCount: totalTxCount,
            totalUniqueAddressesCount: totalUniqueAddresses,
            interactions: interactions,
            lastTxAt: lastTxAt,
        };
        return walletStats;
    });
    return Promise.all(walletStatsPromises);
}

getWalletStats(wallets)
    .then((stats) => {
        const statsJSON = JSON.stringify(stats, null, 2);
        console.log(statsJSON);
    })
    .catch((error) => {
        console.error("Error retrieving wallet stats ", error.message);
    });
