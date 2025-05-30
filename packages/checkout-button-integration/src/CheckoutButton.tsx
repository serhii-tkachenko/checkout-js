import React, { FunctionComponent, useEffect } from 'react';

import {
    CheckoutButtonProps,
    CheckoutButtonResolveId,
    toResolvableComponent,
} from '@bigcommerce/checkout/payment-integration-api';

const CheckoutButton: FunctionComponent<CheckoutButtonProps> = ({
    checkoutService: { deinitializeCustomer, initializeCustomer },
    checkoutButtonContainerClass,
    containerId,
    methodId,
    onUnhandledError,
    onWalletButtonClick,
    additionalInitializationOptions = {},
}) => {
    useEffect(() => {
        initializeCustomer({
            methodId,
            [methodId]: {
                container: containerId,
                onUnhandledError,
                onClick: () => onWalletButtonClick(methodId),
                ...additionalInitializationOptions,
            },
        }).catch(onUnhandledError);

        return () => {
            deinitializeCustomer({ methodId }).catch(onUnhandledError);
        };
    }, [
        additionalInitializationOptions,
        containerId,
        deinitializeCustomer,
        initializeCustomer,
        methodId,
        onUnhandledError,
        onWalletButtonClick,
    ]);

    return <div className={checkoutButtonContainerClass} id={containerId} />;
};

export default toResolvableComponent<CheckoutButtonProps, CheckoutButtonResolveId>(
    CheckoutButton,
    [],
);
