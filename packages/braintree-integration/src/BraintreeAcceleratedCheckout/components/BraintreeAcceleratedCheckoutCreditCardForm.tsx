import React, { FunctionComponent, useEffect } from 'react';

interface BraintreeAcceleratedCheckoutCreditCardFormProps {
    renderPayPalConnectComponent?: (container: string) => void;
}

const BraintreeAcceleratedCheckoutCreditCardForm: FunctionComponent<BraintreeAcceleratedCheckoutCreditCardFormProps> = ({
    renderPayPalConnectComponent,
}) => {
    useEffect(() => {
        if (typeof renderPayPalConnectComponent === 'function') {
            renderPayPalConnectComponent('#braintree-axo-cc-form-container');
        }
    }, [renderPayPalConnectComponent]);

    return <div id="braintree-axo-cc-form-container" />;
}

export default BraintreeAcceleratedCheckoutCreditCardForm;
