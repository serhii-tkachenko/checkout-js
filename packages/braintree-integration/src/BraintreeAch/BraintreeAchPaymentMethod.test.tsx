// import { Formik } from 'formik';
// import { noop } from 'lodash';
// import React, { FunctionComponent } from 'react';
// import { render } from '@testing-library/react';
//
// import {
//     BillingAddress,
//     CheckoutSelectors,
//     CheckoutService,
//     createCheckoutService,
// } from '@bigcommerce/checkout-sdk';
// import { createLocaleContext } from '@bigcommerce/checkout/locale';
// import {
//     PaymentFormService,
//     PaymentMethodProps,
// } from '@bigcommerce/checkout/payment-integration-api';
// import {
//     getBraintreeAchPaymentMethod,
//     getPaymentFormServiceMock,
//     getStoreConfig,
// } from '@bigcommerce/checkout/test-utils';
//
// import BraintreeAchPaymentMethod from './BraintreeAchPaymentMethod';
//
// describe('BraintreeAchPaymentForm', () => {
//     let BraintreeAchPaymentMethodTest: FunctionComponent<PaymentMethodProps>;
//     let checkoutService: CheckoutService;
//     let checkoutState: CheckoutSelectors;
//     let defaultProps: PaymentMethodProps;
//     let paymentForm: PaymentFormService;
//
//     // TODO: add getBillingAddress mock to @bigcommerce/checkout/test-utils package
//     const billingAddress: BillingAddress = {
//         id: '1',
//         firstName: 'Test',
//         lastName: 'Tester',
//         company: 'Bigcommerce',
//         address1: '12345 Testing Way',
//         address2: '',
//         city: 'Some City',
//         stateOrProvince: 'California',
//         stateOrProvinceCode: 'CA',
//         country: 'United States',
//         countryCode: 'US',
//         postalCode: '95555',
//         phone: '555-555-5555',
//         customFields: [],
//     };
//
//     beforeEach(() => {
//         checkoutService = createCheckoutService();
//         checkoutState = checkoutService.getState();
//         paymentForm = getPaymentFormServiceMock();
//
//         jest.mock('./components', () => ({
//             // BraintreeAchPaymentForm: () => '<div>BraintreeAchPaymentForm</div>',
//             BraintreeAchPaymentForm: 'test',
//         }));
//
//         jest.spyOn(checkoutService, 'initializePayment').mockResolvedValue(checkoutState);
//         jest.spyOn(checkoutService, 'deinitializePayment').mockResolvedValue(checkoutState);
//         jest.spyOn(checkoutService, 'loadInstruments').mockResolvedValue(checkoutState);
//         jest.spyOn(checkoutState.data, 'getBillingAddress').mockReturnValue(billingAddress);
//
//         const { language } = createLocaleContext(getStoreConfig());
//
//         defaultProps = {
//             method: getBraintreeAchPaymentMethod(),
//             checkoutService,
//             checkoutState,
//             paymentForm,
//             language,
//             onUnhandledError: jest.fn(),
//         };
//
//         BraintreeAchPaymentMethodTest = (props: PaymentMethodProps) => (
//             <Formik initialValues={{}} onSubmit={noop}>
//                 <BraintreeAchPaymentMethod {...props} />
//             </Formik>
//         );
//     });
//
//     it('should be initialized with the required config', async () => {
//         render(<BraintreeAchPaymentMethodTest {...defaultProps} />);
//
//         expect(checkoutService.initializePayment).toHaveBeenCalledWith({
//             braintreeach: {
//                 getMandateText: expect.any(Function),
//             },
//             gatewayId: undefined,
//             methodId: 'braintreeach',
//         });
//     });
//
//     it('catches an error during failed initialization of loadBillingAddressFields', async () => {
//         jest.spyOn(checkoutService, 'initializePayment').mockRejectedValue(new Error('error'));
//         render(<BraintreeAchPaymentMethodTest {...defaultProps} />);
//
//         await new Promise((resolve) => process.nextTick(resolve));
//
//         expect(defaultProps.onUnhandledError).toHaveBeenCalled();
//     });
//
//     it('catches an error during failed initialization of initializePayment', async () => {
//         jest.spyOn(checkoutService, 'initializePayment').mockRejectedValue(new Error('error'));
//         render(<BraintreeAchPaymentMethodTest {...defaultProps} />);
//
//         await new Promise((resolve) => process.nextTick(resolve));
//
//         expect(defaultProps.onUnhandledError).toHaveBeenCalled();
//     });
// });
