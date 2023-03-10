import { useState } from 'react';

import { getAmountOut } from '@/utils/uniswap';
import { TokenSymbol, tokenMap } from '@/types/constants';

const App = () => {
  const [amountIn, setAmountIn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [swapResult, setSwapResult] = useState<SwapResult>({});
  const [fromToken, setFromToken] = useState<keyof typeof TokenSymbol>('USDC');
  const [toToken, setToToken] = useState<keyof typeof TokenSymbol>('WETH');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAmountIn(e.target.value);
    setSwapResult({});
  };

  const handleSwap = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await getAmountOut(fromToken, toToken, amountIn);
      setSwapResult(result);
    } catch (error) {
      console.error('Error occurred while swapping:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFromTokenChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedToken = e.target.value as keyof typeof TokenSymbol;
    setFromToken(selectedToken);
    setSwapResult({});
  };

  const handleToTokenChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedToken = e.target.value as keyof typeof TokenSymbol;
    setToToken(selectedToken);
    setSwapResult({});
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="amountIn" className="mt-4 mb-2 font-bold">
        {fromToken} Amount:
      </label>
      <div className="relative w-64">
        <input
          type="number"
          id="amountIn"
          name="amountIn"
          value={amountIn}
          onChange={handleInputChange}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        {isLoading && (
          <div className="absolute -top-1 right-0 mt-3 mr-3 border-t-transparent w-6 h-6 border-4 border-blue-500 rounded-full animate-spin"></div>
        )}
      </div>
      <label htmlFor="fromToken" className="mt-4 mb-2 font-bold">
        Swap From:
      </label>
      <select
        id="fromToken"
        name="fromToken"
        value={fromToken}
        onChange={handleFromTokenChange}
        disabled={isLoading}
        className="w-64 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        <option value="USDC">USDC</option>
      </select>
      <label htmlFor="toToken" className="mt-4 mb-2 font-bold">
        Swap To:
      </label>
      <select
        id="toToken"
        name="toToken"
        value={toToken}
        onChange={handleToTokenChange}
        disabled={isLoading}
        className="w-64 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        {Object.values(tokenMap)
          .filter((token) => token.symbol !== TokenSymbol.USDC)
          .map((token) => (
            <option key={token.symbol} value={token.symbol}>
              {token.symbol}
            </option>
          ))}
      </select>
      <button
        onClick={handleSwap}
        disabled={isLoading || fromToken === toToken || !amountIn}
        className="mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-md shadow-md focus:outline-none hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Swapping...' : 'Swap'}
      </button>
      {swapResult.amountOut && (
        <div className="mt-4 text-lg font-bold">
          Amount Out: {swapResult.amountOut} {toToken}
        </div>
      )}
      {swapResult.path && (
        <div className="mt-4">
          Optimal swap path:
          <span className="font-bold ml-2">
            {swapResult.path.join(` ${String.fromCharCode(8594)} `)}
          </span>
        </div>
      )}
    </div>
  );
};

export default App;
