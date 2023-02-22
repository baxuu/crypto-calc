export const ChainId = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GÖRLI: 5,
  KOVAN: 42,
} as const;

export const TokenSymbol = {
  USDC: 'USDC',
  WETH: 'WETH',
  DAI: 'DAI',

  //...
} as const;

export const tokenMap: TokenMap = {
  [TokenSymbol.USDC]: {
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    decimals: 6,
    symbol: TokenSymbol.USDC,
    name: 'USD Coin',
  },
  [TokenSymbol.WETH]: {
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    decimals: 18,
    symbol: TokenSymbol.WETH,
    name: 'Wrapped Ether',
  },
  [TokenSymbol.DAI]: {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
    symbol: TokenSymbol.DAI,
    name: 'Dai Stablecoin',
  },

  // ...
};
