import { createCheckoutService, createLanguageService } from '@bigcommerce/checkout-sdk';
import React from 'react';

import { CheckoutButtonProps } from '@bigcommerce/checkout/payment-integration-api';
import { render } from '@bigcommerce/checkout/test-utils';

import PayPalCommerceButton from './PayPalCommerceButton';

describe('PayPalCommerceButton', () => {
    let defaultProps: CheckoutButtonProps;

    beforeEach(() => {
        const checkoutService = createCheckoutService();

        defaultProps = {
            checkoutService,
            checkoutState: checkoutService.getState(),
            containerId: 'paypalcommerce-button-container',
            language: createLanguageService(),
            methodId: 'paypalcommerce',
            onUnhandledError: jest.fn(),
            onWalletButtonClick: jest.fn(),
        };
    });

    it('renders PayPalCommerceButton with provided props', () => {
        const { container } = render(<PayPalCommerceButton {...defaultProps} />);

        expect(container.querySelector(`#${defaultProps.containerId}`)).toBeInTheDocument();
    });
});
