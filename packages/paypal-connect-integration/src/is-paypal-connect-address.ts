import {
    Address,
    AddressRequestBody,
    BillingAddress,
    CustomerAddress,
} from '@bigcommerce/checkout-sdk';
import { isEqual, omit } from 'lodash';

import { PAYPAL_ADDRESS_TYPE } from './constants';

type ComparableAddress = CustomerAddress | Address | BillingAddress | AddressRequestBody;
type ComparableAddressFields = keyof CustomerAddress | keyof Address | keyof BillingAddress;

const normalizeAddress = (address: ComparableAddress) => {
    const ignoredFields: ComparableAddressFields[] = [
        'id',
        'shouldSaveAddress',
        'stateOrProvince',
        // 'stateOrProvinceCode', // should we keep that?
        'type',
        'email',
        'country',
        'customFields',
    ];

    return omit(address, ignoredFields);
};

const isEqualToPayPalConnectAddress = (
    bcAddress: ComparableAddress,
    paypalConnectAddress: ComparableAddress,
): boolean => {
    return isEqual(normalizeAddress(bcAddress), normalizeAddress(paypalConnectAddress));
};

export default function isPayPalConnectAddress(address: Address, addresses: Address[]): boolean {
    if ('type' in address) {
        return address.type === PAYPAL_ADDRESS_TYPE;
    }

    return addresses.some((paypalConnectAddress) =>
        isEqualToPayPalConnectAddress(address, paypalConnectAddress),
    );
}
