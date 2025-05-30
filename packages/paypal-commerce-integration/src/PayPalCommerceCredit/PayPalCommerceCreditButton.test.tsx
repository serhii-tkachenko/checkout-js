import { createCheckoutService, createLanguageService } from '@bigcommerce/checkout-sdk';
import React from 'react';

import { CheckoutButtonProps } from '@bigcommerce/checkout/payment-integration-api';
import { render } from '@bigcommerce/checkout/test-utils';

import PayPalCommerceCreditButton from './PayPalCommerceCreditButton';

describe('PayPalCommerceCreditButton', () => {
    let defaultProps: CheckoutButtonProps;

    beforeEach(() => {
        const checkoutService = createCheckoutService();

        defaultProps = {
            checkoutService,
            checkoutState: checkoutService.getState(),
            containerId: 'paypal-commerce-credit-button-container',
            language: createLanguageService(),
            methodId: 'paypalcommercecredit',
            onUnhandledError: jest.fn(),
            onWalletButtonClick: jest.fn(),
        };
    });

    it('renders PayPalCommerceCreditButton with provided props', () => {
        const { container } = render(<PayPalCommerceCreditButton {...defaultProps} />);

        expect(container.querySelector(`#${defaultProps.containerId}`)).toBeInTheDocument();
    });
});
