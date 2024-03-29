import React from 'react';

import { useExchange } from 'context/exchange/ExchangeContext';
import { useChain } from 'context/chain/ChainContext';
import { SellBtn } from './exchangeStyles';

export default function NOMButton({ onBid, onApprove }) {
  const { weakBalance, NOMallowance } = useChain();

  const { bidAmount, bidDenom, input, weak } = useExchange();

  return (
    <>
      {bidDenom === 'strong' ? (
        <SellBtn> Input Value </SellBtn>
      ) : bidAmount.lte(weakBalance) ? (
        input === '' ? (
          <SellBtn> Input Value </SellBtn>
        ) : NOMallowance.gte(bidAmount) ? (
          <SellBtn onClick={onBid}>Sell {weak}</SellBtn>
        ) : (
          <SellBtn onClick={onApprove}>Approve</SellBtn>
        )
      ) : (
        <SellBtn> Low {weak} Balance </SellBtn>
      )}
    </>
  );
}
