import React from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Dimmer } from 'components/UI/Dimmer';
import LoadingSpinner from 'components/UI/LoadingSpinner';

import ApproveTokensBridgeModal from './ApproveTokensBridgeModal';
import BridgeTransactionComplete from './BridgeTransactionComplete';
import { Close } from '../Icons';
import * as Modal from '../styles';
import { responsive } from 'theme/constants';
import { BridgeSending, BridgeAmountInput, BridgeMaxBtn, BridgeAddressInput } from '../../Exchange/exchangeStyles';
import oneWayBridgeImg from '../assets/one-way-bridge.svg';
import whyBridgeImg from '../assets/why-bridge.svg';
import bridgeCurveImg from '../assets/icon-bridge-curve.svg';
import walletImg from '../assets/icon-onomy-wallet.svg';

const InputWrapper = styled.div`
  margin: 0 0 12px;
`;

const FormWrapper = styled.form`
  padding: 32px 32px 0;
  margin: 32px -32px 0 -36px;

  border-top: 1px solid ${props => props.theme.colors.bgHighlightBorder};

  @media screen and (max-width: ${responsive.laptop}) {
    margin-left: -28px;
    margin-right: -24px;
  }

  @media screen and (max-width: ${responsive.laptopSmall}) {
    margin-left: -28px;
    margin-right: -28px;
  }
`;

export default function BridgeSwapModal({ ...props }) {
  const { account } = useWeb3React();

  const {
    onomyWalletValue,
    onomyWalletError,
    amountInputValue,
    amountError,
    formattedWeakBalance,
    isButtonDisabled,
    isMaxButtonClicked,
    handleWalletInputChange,
    handleAmountInputChange,
    maxBtnHandler,
    submitTrans,
    closeModalHandler,
    showBridgeExchangeModal,
    showApproveModal,
    showTransactionCompleted,
    onCancelHandler,
    allowanceAmountGravity,
    weakBalance,
    showLoader,
  } = props;

  return (
    <>
      <Dimmer />
      <Modal.BridgeModalWrapper>
        <Modal.CloseIcon onClick={() => closeModalHandler()}>
          <Close />
        </Modal.CloseIcon>

        <Modal.BridgeLayout>
          {showBridgeExchangeModal && (
            <main>
              <Modal.CaptionLeft>Onomy Bridge Here</Modal.CaptionLeft>

              <Modal.BridgeContent>
                <Modal.ConnectionItem>
                  <Modal.ConnectionItemIcon>
                    <img src={bridgeCurveImg} alt="" />
                  </Modal.ConnectionItemIcon>
                  <Modal.ConnectionItemContent>
                    <strong>Onomy Bonding Curve</strong>
                    <span>
                      {account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : ''}
                    </span>
                  </Modal.ConnectionItemContent>
                  <Modal.Balance>
                    <strong>wNOM Balance</strong>
                    <span>{`${formattedWeakBalance.toFixed(6)}`}</span>
                  </Modal.Balance>
                </Modal.ConnectionItem>

                <Modal.ConnectionStatus>Bridge Connected</Modal.ConnectionStatus>

                <Modal.ConnectionItem>
                  <Modal.ConnectionItemIcon>
                    <img src={walletImg} alt="" />
                  </Modal.ConnectionItemIcon>
                  <Modal.CosmosInputSection error={onomyWalletError}>
                    <BridgeAddressInput
                      type="text"
                      placeholder="Your Onomy Wallet Address"
                      value={
                        onomyWalletValue.length > 24
                          ? `${onomyWalletValue.substring(0, 10)}...${onomyWalletValue.substring(
                              onomyWalletValue.length - 11,
                            )}`
                          : onomyWalletValue
                      }
                      onChange={handleWalletInputChange}
                    />
                  </Modal.CosmosInputSection>
                </Modal.ConnectionItem>
              </Modal.BridgeContent>
              <FormWrapper>
                {showLoader && (
                  <Modal.LoadingWrapper>
                    <LoadingSpinner />
                  </Modal.LoadingWrapper>
                )}
                <InputWrapper>
                  <BridgeSending error={amountError}>
                    <strong>I want to swap to NOM</strong>
                    <BridgeAmountInput type="text" value={amountInputValue} onChange={handleAmountInputChange} />
                    wNOM
                    <BridgeMaxBtn onClick={maxBtnHandler}>Max</BridgeMaxBtn>
                  </BridgeSending>
                </InputWrapper>
                {(onomyWalletError || amountError) && (
                  <Modal.ErrorSection>{onomyWalletError || amountError}</Modal.ErrorSection>
                )}
                <Modal.FullWidthButton onClick={submitTrans} disabled={isButtonDisabled}>
                  Swap wNOM for NOM
                </Modal.FullWidthButton>
              </FormWrapper>
            </main>
          )}
          {showApproveModal && (
            <main>
              <ApproveTokensBridgeModal
                {...props}
                onCancelHandler={onCancelHandler}
                amountInputValue={amountInputValue}
                allowanceAmountGravity={allowanceAmountGravity}
                formattedWeakBalance={formattedWeakBalance}
                weakBalance={weakBalance}
                isMaxAmount={isMaxButtonClicked}
              />
            </main>
          )}
          {showTransactionCompleted && (
            <main>
              <BridgeTransactionComplete {...props} />
            </main>
          )}
          <Modal.Info>
            <h2>What is Onomy Bridge?</h2>

            <Modal.Desc>
              The Onomy Bonding Curve platform is a gateway into the Onomy Network. This is achieved by participants
              purchasing wrapped-NOM, an ERC-20 token on the Ethereum Network, and swapping for NOM on the Onomy
              Network.
            </Modal.Desc>

            <Modal.InfoRow>
              <div>
                <Modal.InfoSubCaption>One Way Bridge</Modal.InfoSubCaption>

                <Modal.Desc>
                  Choose to bridge when you are ready to do so to finalize your purchase of NOM!{' '}
                  <strong>
                    After bridging, you can no longer sell back to the bonding curve or bridge back for wNOM.
                  </strong>{' '}
                  There are no guarantees of liquid markets.
                </Modal.Desc>
              </div>

              <img src={oneWayBridgeImg} alt="" />
            </Modal.InfoRow>

            <Modal.InfoRow>
              <div>
                <Modal.InfoSubCaption>Why Bridge?</Modal.InfoSubCaption>

                <Modal.List>
                  <li>You must hold NOM to participate in the Onomy Network. </li>
                  <li>Early stakers of NOM take advantage of larger staking yield. </li>
                  <li>NOM is used for governance, staking, and collateral to mint stablecoins.</li>
                  <li>All bridged wNOM is burned from the bonding curve supply. </li>
                  <li>NOM would be listed on exchanges rather than wNOM. </li>
                </Modal.List>
              </div>

              <Modal.InfoImgWrapper>
                <img src={whyBridgeImg} alt="" />
              </Modal.InfoImgWrapper>
            </Modal.InfoRow>
          </Modal.Info>
        </Modal.BridgeLayout>
      </Modal.BridgeModalWrapper>
    </>
  );
}
