import { createCheckoutService, LanguageService } from '@bigcommerce/checkout-sdk';
import { mount } from 'enzyme';
import React from 'react';

import { PaymentFormService } from '@bigcommerce/checkout/payment-integration-api';

import PayPalCommercePaymentMethodComponent from './components/PayPalCommercePaymentMethodComponent';
import { getPayPalCommerceVenmoMethod } from './mocks/paymentMethods.mock';
import PayPalCommerceVenmoPaymentMethod from './PayPalCommerceVenmoPaymentMethod';

describe('PayPalCommerceVenmoPaymentMethod', () => {
    const checkoutService = createCheckoutService();
    const checkoutState = checkoutService.getState();
    const props = {
        method: getPayPalCommerceVenmoMethod(),
        checkoutService,
        checkoutState,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        paymentForm: jest.fn() as unknown as PaymentFormService,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        language: { translate: jest.fn() } as unknown as LanguageService,
        onUnhandledError: jest.fn(),
    };

    it('renders PayPalCommercePaymentMethodComponent with provided props', () => {
        const component = mount(<PayPalCommerceVenmoPaymentMethod {...props} />);
        const childComponent = component.find(PayPalCommercePaymentMethodComponent);

        expect(childComponent.props()).toEqual(
            expect.objectContaining({
                ...props,
                providerOptionsKey: 'paypalcommercevenmo',
            }),
        );
    });
});
