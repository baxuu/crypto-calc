import { TradeType } from '@uniswap/sdk';
import JSBI from 'jsbi';

import { ethers } from 'ethers';

import { CurrencyAmount, Token } from '@uniswap/sdk-core';
import { tokenMap, ChainId } from '@/types/constants';

import { AlphaRouter } from '@uniswap/smart-order-router';

const chainId = ChainId.MAINNET;

const router = new AlphaRouter({
  chainId: chainId,
  provider: new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_INFURA_TEST_URL
  ),
});

const getTokenBySymbol = (symbol: string): Token => {
  const tokenData = tokenMap[symbol];
  return new Token(
    chainId,
    tokenData.address,
    tokenData.decimals,
    tokenData.symbol,
    tokenData.name
  );
};

export const getAmountOut = async (
  inputTokenSymbol: string,
  outputTokenSymbol: string,
  amountIn: string
): Promise<SwapResult> => {
  try {
    const inputToken = getTokenBySymbol(inputTokenSymbol);
    const outputToken = getTokenBySymbol(outputTokenSymbol);

    if (!inputToken || !outputToken) {
      throw new Error('Invalid token symbol');
    }

    const amountInUnits = ethers.utils.parseUnits(
      amountIn.toString(),
      inputToken.decimals
    );
    const inputAmount = CurrencyAmount.fromRawAmount(
      inputToken,
      JSBI.BigInt(amountInUnits)
    );

    const route = await router.route(
      inputAmount,
      outputToken,
      TradeType.EXACT_INPUT
    );
    const amountOut = route?.quote.toFixed(10);

    const path = route?.route[0].tokenPath
      .map((token) => token.symbol)
      .filter((item): item is string => !!item);

    return { amountOut, path };
  } catch (error) {
    console.error(error);
    return {};
  }
};
