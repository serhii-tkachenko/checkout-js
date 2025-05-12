import {
    CheckoutSelectors, CheckoutService,
    CheckoutSettings,
    CustomerInitializeOptions,
    CustomerRequestOptions,
} from '@bigcommerce/checkout-sdk';
import { noop } from 'lodash';
import React, { FunctionComponent, memo } from 'react';

import { TranslatedString, useLocale } from '@bigcommerce/checkout/locale';
import { CheckoutContextProps } from '@bigcommerce/checkout/payment-integration-api';

// import CheckoutButton from './CheckoutButton';
// import { AmazonPayV2Button, ApplePayButton, PayPalCommerceButton } from './customWalletButton';
import { getSupportedMethodIds } from './getSupportedMethods';
import resolveCheckoutButton from './resolveCheckoutButton';
import CheckoutButtonV1Resolver from './WalletButtonV1Resolver';
import { withCheckout } from '../checkout';

export interface CheckoutButtonListProps {
    checkoutSettings: CheckoutSettings;
    hideText?: boolean;
    isInitializing?: boolean;
    isShowingWalletButtonsOnTop?: boolean;
    methodIds?: string[];
    checkEmbeddedSupport?(methodIds: string[]): void;
    deinitialize(options: CustomerRequestOptions): void;
    initialize(options: CustomerInitializeOptions): void;
    onClick?(methodId: string): void;
    onError?(error: Error): void;
}

interface WithCheckoutCheckoutButtonListProps {
    checkoutState: CheckoutSelectors;
    checkoutService: CheckoutService;
}

const CheckoutButtonList: FunctionComponent<WithCheckoutCheckoutButtonListProps & CheckoutButtonListProps> = ({
    checkoutService,
    checkoutState,
    checkEmbeddedSupport,
    isInitializing = false,
    checkoutSettings,
    methodIds = [],
    hideText = false,
    onError,
    onClick = noop,
}) => {
    const { language } = useLocale();

    const supportedMethodIds = getSupportedMethodIds(methodIds, checkoutSettings);

    if (supportedMethodIds.length === 0) {
        return null;
    }

    if (checkEmbeddedSupport) {
        try {
            checkEmbeddedSupport(supportedMethodIds);
        } catch (error) {
            if (error instanceof Error && onError) {
                onError(error);
            } else {
                throw error;
            }

            return null;
        }
    }

    const renderButtons = () => supportedMethodIds.map((methodId) => {
        const ResolvedCheckoutButton = resolveCheckoutButton({ id: methodId });

        if (!ResolvedCheckoutButton) {
            return <CheckoutButtonV1Resolver
                deinitialize={checkoutService.deinitializeCustomer}
                initialize={checkoutService.initializeCustomer}
                isShowingWalletButtonsOnTop={false}
                key={methodId}
                methodId={methodId}
                onClick={onClick}
                onError={onClick}
            />
        }

        return <ResolvedCheckoutButton
            checkoutService={checkoutService}
            checkoutState={checkoutState}
            containerId={`${methodId}CheckoutButton`}
            key={methodId}
            language={language}
            methodId={methodId}
            onUnhandledError={onClick}
            onWalletButtonClick={onClick}
        />;
    });


    return (
        <>
            {!isInitializing && !hideText && (
                <p>
                    <TranslatedString id="remote.continue_with_text" />
                </p>
            )}

            <div className="checkoutRemote">
                {renderButtons()}
            </div>
        </>
    );

    // return (
    //     <>
    //         {!isInitializing && !hideText && (
    //             <p>
    //                 <TranslatedString id="remote.continue_with_text" />
    //             </p>
    //         )}
    //
    //         <div className="checkoutRemote">
    //             {methodIds.map((methodId) => {
    //                 if (methodId === 'applepay') {
    //                     return (
    //                         <ApplePayButton
    //                             containerId={`${methodId}CheckoutButton`}
    //                             key={methodId}
    //                             methodId={methodId}
    //                             onError={onError}
    //                             {...rest}
    //                         />
    //                     );
    //                 }
    //
    //                 if (methodId === 'amazonpay') {
    //                     return (
    //                         <AmazonPayV2Button
    //                             containerId={`${methodId}CheckoutButton`}
    //                             key={methodId}
    //                             methodId={methodId}
    //                             onError={onError}
    //                             {...rest}
    //                         />
    //                     );
    //                 }
    //
    //                 if (methodId === 'paypalcommerce' || methodId === 'paypalcommercecredit') {
    //                     return (
    //                         <PayPalCommerceButton
    //                             containerId={`${methodId}CheckoutButton`}
    //                             key={methodId}
    //                             methodId={methodId}
    //                             onError={onError}
    //                             {...rest}
    //                         />
    //                     );
    //                 }
    //
    //                 return (
    //                     <CheckoutButton
    //                         containerId={`${methodId}CheckoutButton`}
    //                         isShowingWalletButtonsOnTop={isShowingWalletButtonsOnTop}
    //                         key={methodId}
    //                         methodId={methodId}
    //                         onError={onError}
    //                         {...rest}
    //                     />
    //                 );
    //             })}
    //         </div>
    //     </>
    // );
};

function mapToCheckoutButtonListProps({
   checkoutState,
   checkoutService,
}: CheckoutContextProps): WithCheckoutCheckoutButtonListProps | null {
    return {
        checkoutService,
        checkoutState,
    };
}

export default memo(withCheckout(mapToCheckoutButtonListProps)(CheckoutButtonList));
