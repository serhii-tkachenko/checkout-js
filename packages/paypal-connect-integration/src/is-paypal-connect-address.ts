import { Address } from '@bigcommerce/checkout-sdk';

import { isEqualAddress } from '@bigcommerce/checkout/address-utils';

const PAYPAL_ADDRESS_TYPE = 'paypal-address';

export default function isPayPalConnectAddress(address: Address, addresses: Address[]): boolean {
    if ('type' in address) {
        return address.type === PAYPAL_ADDRESS_TYPE;
    }

    return addresses.some(
        (paypalConnectAddress) => isEqualAddress(address, paypalConnectAddress)
    );
}
