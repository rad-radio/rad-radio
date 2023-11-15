import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ref, Ref, toRefs } from "vue";

export enum Token {
  DAI = "DAI",
  USDC = "USDC",
  ETH = "ETH",
  GHO = "GHO",
}

const erc20TokenAdresses: { [key in Token]?: string } = {
  [Token.DAI]: "0x6b175474e89094c44da98b954eedeac495271d0f",
  [Token.USDC]: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  [Token.GHO]: "0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f",
};

function isToken(name: string): name is Token {
  return (
    Object.keys(erc20TokenAdresses).find((k) => name === k) !== undefined
  );
}

function getTokenByAddress(address: string): Token {
  const token = Object.entries(erc20TokenAdresses).find(
    ([t, a]) => a === address
  )?.[0];

  if (!token || !isToken(token)) throw new Error("Unknown token address");

  return token;
}

type TokenBalanceList = { [key in Token]?: bigint };

export default (
  alchemyApiToken: string,
  forAddress: string,
  { updateIntervalDuration } = { updateIntervalDuration: 60 }
) => {
  const web3 = createAlchemyWeb3(
    `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiToken}`
  );

  const balances: Ref<TokenBalanceList> = ref({});

  async function fetchEthBalance(address: string) {
    return BigInt(await web3.eth.getBalance(address));
  }

  async function fetchErc20Balances(address: string) {
    const balances = await web3.alchemy.getTokenBalances(
      address,
      Object.values(erc20TokenAdresses)
    );

    return balances.tokenBalances.reduce<TokenBalanceList>(
      (acc, tb) => ({
        ...acc,
        [getTokenByAddress(tb.contractAddress)]: BigInt(tb.tokenBalance || 0),
      }),
      {}
    );
  }

  async function update() {
    balances.value = {
      ETH: await fetchEthBalance(forAddress),
      ...(await fetchErc20Balances(forAddress)),
    };
  }

  setInterval(update, updateIntervalDuration * 1000);
  update();

  return {
    balances,
    update,
  };
};
