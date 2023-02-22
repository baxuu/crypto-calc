interface SwapResult {
  amountOut?: string;
  path?: string[];
}

type TokenMap = {
  [symbol: string]: {
    address: string;
    decimals: number;
    name: string;
    symbol: string;
  };
};
