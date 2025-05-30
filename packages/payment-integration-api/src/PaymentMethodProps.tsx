import {
    CheckoutSelectors,
    CheckoutService,
    LanguageService,
    PaymentMethod,
} from '@bigcommerce/checkout-sdk';

import PaymentFormService from './PaymentFormService';

export default interface PaymentMethodProps {
    children?: React.ReactNode;
    method: PaymentMethod;
    checkoutService: CheckoutService;
    checkoutState: CheckoutSelectors;
    paymentForm: PaymentFormService;
    language: LanguageService;
    onUnhandledError(error: Error): void;
}
