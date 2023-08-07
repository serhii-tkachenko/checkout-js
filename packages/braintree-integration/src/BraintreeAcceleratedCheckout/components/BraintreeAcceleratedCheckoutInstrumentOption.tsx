import { CardInstrument } from '@bigcommerce/checkout-sdk';
import { noop } from 'lodash';
import React, { FunctionComponent, useCallback } from 'react';

import BraintreeAcceleratedCheckoutInstrumentMenuItem from './BraintreeAcceleratedCheckoutInstrumentMenuItem';

interface BraintreeAcceleratedCheckoutInstrumentOptionProps {
    instrument: CardInstrument;
    onClick?(token: string): void;
}

const BraintreeAcceleratedCheckoutInstrumentOption: FunctionComponent<
    BraintreeAcceleratedCheckoutInstrumentOptionProps
> = ({ instrument, onClick = noop }) => {
    const handleClick = useCallback(() => {
        onClick(instrument.bigpayToken);
    }, [onClick, instrument]);

    return (
        <BraintreeAcceleratedCheckoutInstrumentMenuItem
            instrument={instrument}
            onClick={handleClick}
            testId="instrument-select-option"
        />
    );
};

export default BraintreeAcceleratedCheckoutInstrumentOption;
