import { CustomerInitializeOptions } from '@bigcommerce/checkout-sdk';
import { noop } from 'lodash';
import React, { FunctionComponent, useCallback, useContext } from 'react';

import { LocaleContext } from '@bigcommerce/checkout/locale';
import { navigateToOrderConfirmation } from '@bigcommerce/checkout/utility';

import CheckoutButton, { CheckoutButtonProps } from '../CheckoutButton';

const PayPalCommerceButton: FunctionComponent<CheckoutButtonProps> = ({
    methodId,
    initialize,
    onError,
    onClick = noop,
    ...rest
}) => {
    const localeContext = useContext(LocaleContext);
    const initializeOptions = useCallback(
        (options: CustomerInitializeOptions) =>
            initialize({
                ...options,
                [methodId]: {
                    container: rest.containerId,
                    onError,
                    onClick: () => onClick(methodId),
                    onComplete: navigateToOrderConfirmation,
                },
            }),
        [initialize, localeContext, onError, rest.containerId],
    );

    return <CheckoutButton initialize={initializeOptions} methodId={methodId} {...rest} />;
};

export default PayPalCommerceButton;
