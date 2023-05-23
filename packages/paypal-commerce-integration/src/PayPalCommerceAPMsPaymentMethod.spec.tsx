import { createCheckoutService, LanguageService } from '@bigcommerce/checkout-sdk';
import { mount } from 'enzyme';
import React from 'react';

import { PaymentFormService } from '@bigcommerce/checkout/payment-integration-api';

import PayPalCommercePaymentMethodComponent from './components/PayPalCommercePaymentMethodComponent';
import { getPayPalCommerceAPMsMethod } from './mocks/paymentMethods.mock';
import PayPalCommerceAPMsPaymentMethod from './PayPalCommerceAPMsPaymentMethod';

describe('PayPalCommerceAPMsPaymentMethod', () => {
    const checkoutService = createCheckoutService();
    const checkoutState = checkoutService.getState();
    const props = {
        method: getPayPalCommerceAPMsMethod(),
        checkoutService,
        checkoutState,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        paymentForm: jest.fn() as unknown as PaymentFormService,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        language: { translate: jest.fn() } as unknown as LanguageService,
        onUnhandledError: jest.fn(),
    };

    it('renders PayPalCommercePaymentMethodComponent with provided props', () => {
        const component = mount(<PayPalCommerceAPMsPaymentMethod {...props} />);
        const childComponent = component.find(PayPalCommercePaymentMethodComponent);

        expect(childComponent.props()).toEqual(
            expect.objectContaining({
                ...props,
                providerOptionsKey: 'paypalcommercealternativemethods',
                providerOptionsData: {
                    apmFieldsContainer: '#paypalcommercealternativemethods-sepa',
                    apmFieldsStyles: {
                        variables: {
                            fontFamily: 'Open Sans, Helvetica Neue, Arial, sans-serif',
                            colorBackground: 'transparent',
                            textColor: 'black',
                            fontSizeBase: '16px',
                            spacingUnit: '1rem',
                            borderColor: '#d9d9d9',
                            borderRadius: '4px',
                            borderWidth: '1px',
                        },
                        rules: {
                            '.Input': {
                                backgroundColor: 'white',
                                color: '#333',
                                fontSize: '1rem',
                            },
                            '.Input:active': {
                                color: '#4496f6',
                            },
                            '.Input--invalid': {
                                color: '#ed6a6a',
                            },
                        },
                    },
                },
            }),
        );
    });
});
