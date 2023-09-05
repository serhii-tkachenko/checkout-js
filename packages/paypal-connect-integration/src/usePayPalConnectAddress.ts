import { PaymentMethodId, useCheckout } from '@bigcommerce/checkout/payment-integration-api';

import isPayPalConnectAddress from './is-paypal-connect-address';

const usePayPalConnectAddress = () => {
    const { checkoutState } = useCheckout();
    const { getConfig, getCustomer, getPaymentProviderCustomer } = checkoutState.data;

    const providerWithCustomCheckout = getConfig()?.checkoutSettings?.providerWithCustomCheckout;
    const isPayPalAxoEnabled = providerWithCustomCheckout === PaymentMethodId.BraintreeAcceleratedCheckout
        || providerWithCustomCheckout === PaymentMethodId.Braintree;

    const paypalConnectAddresses = getPaymentProviderCustomer()?.addresses || [];
    const bcAddresses = getCustomer()?.addresses || [];

    const mergedBcAndPayPalConnectAddresses = isPayPalAxoEnabled
        ? [
            ...paypalConnectAddresses,
            ...bcAddresses.filter((address) => !isPayPalConnectAddress(address, paypalConnectAddresses))
        ]
        : bcAddresses;

    const shouldShowPayPalConnectLabel = !!paypalConnectAddresses.length;

    return {
        isPayPalAxoEnabled,
        paypalConnectAddresses,
        shouldShowPayPalConnectLabel,
        mergedBcAndPayPalConnectAddresses,
    };
};

export default usePayPalConnectAddress;
