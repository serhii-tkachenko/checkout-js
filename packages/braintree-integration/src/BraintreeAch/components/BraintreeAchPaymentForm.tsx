import React, { FunctionComponent, useEffect, useState } from 'react';

import { PaymentMethod } from '@bigcommerce/checkout-sdk';
import { AccountInstrumentFieldset, StoreInstrumentFieldset } from '@bigcommerce/checkout/instrument-utils';
import { useCheckout, usePaymentFormContext } from '@bigcommerce/checkout/payment-integration-api';

import BraintreeAchFormFields from './BraintreeAchFormFields';
import BraintreeAchMandateText from './BraintreeAchMandateText';

import { AccountTypes, OwnershipTypes } from '../constants';
import useBraintreeAchInstruments from '../hooks/useBraintreeAchInstruments';
import useBraintreeAchValidation from '../hooks/useBraintreeAchValidation';

export interface BraintreeAchPaymentFormProps {
    method: PaymentMethod;
    updateMandateText: (mandateText: string) => void;
}

const BraintreeAchPaymentForm: FunctionComponent<BraintreeAchPaymentFormProps> = ({
    method,
    updateMandateText,
}) => {
    const [isValidForm, setIsValidForm] = useState(false);

    const { checkoutState } = useCheckout();
    const { paymentForm } = usePaymentFormContext();
    const { disableSubmit, getFieldValue, getFormValues, setFieldValue } = paymentForm;

    const {
        accountInstruments,
        currentInstrument,
        handleSelectInstrument,
        handleUseNewInstrument,
        isInstrumentFeatureAvailable,
        shouldShowInstrumentFieldset,
        shouldCreateNewInstrument,
        shouldConfirmInstrument,
    } = useBraintreeAchInstruments(method);
    const { validateBraintreeAchForm } = useBraintreeAchValidation();

    const shouldShowBraintreeAchFormFields = !shouldShowInstrumentFieldset || shouldCreateNewInstrument || shouldConfirmInstrument;

    const resetFormValues = () => {
        const { firstName, lastName } = checkoutState.data.getBillingAddress() || {};

        const defaultFormValues = {
            ownershipType: OwnershipTypes.Personal,
            accountType: AccountTypes.Savings,
            accountNumber: '',
            routingNumber: '',
            businessName: '',
            firstName: firstName || '',
            lastName: lastName || '',
            shouldSaveInstrument: false,
            shouldSetAsDefaultInstrument: false,
            instrumentId: '',
            orderConsent: false,
        };

        for (const [key, value] of Object.entries(defaultFormValues)) {
            setFieldValue(key, value);
        }
    };

    useEffect(() => {
        resetFormValues();
    }, [currentInstrument?.bigpayToken]);

    useEffect(() => {
        if (shouldShowBraintreeAchFormFields) {
            const validate = async () => {
                const braintreeAchFormValues = getFormValues();
                const isValid = await validateBraintreeAchForm(braintreeAchFormValues);

                if (!isValid) {
                    setFieldValue('orderConsent', false);
                }

                setIsValidForm(isValid);
            };

            void validate();
        }
    }, [
        getFormValues,
        setFieldValue,
        setIsValidForm,
        shouldShowBraintreeAchFormFields,
        validateBraintreeAchForm,
    ]);

    useEffect(() => {
        if (shouldShowBraintreeAchFormFields) {
            const mandateTextConfirmationCheckboxValue = getFieldValue('orderConsent');

            disableSubmit(method, !mandateTextConfirmationCheckboxValue);
        } else {
            disableSubmit(method, false);
        }
    }, [
        disableSubmit,
        getFieldValue,
        method,
        shouldShowBraintreeAchFormFields,
    ]);

    return (
        <div className="checkout-ach-form" data-test="checkout-ach-form">
            {
                shouldShowInstrumentFieldset && (
                    <div className="checkout-ach-form__instrument">
                        <AccountInstrumentFieldset
                            instruments={accountInstruments}
                            onSelectInstrument={handleSelectInstrument}
                            onUseNewInstrument={handleUseNewInstrument}
                            selectedInstrument={currentInstrument}
                        />
                    </div>
                )
            }

            {
                shouldConfirmInstrument &&
                    <p>Add some confirmation text here</p>
            }

            {
                shouldShowBraintreeAchFormFields &&
                    <BraintreeAchFormFields />
            }

            {
                isInstrumentFeatureAvailable &&
                    <StoreInstrumentFieldset
                        instrumentId={currentInstrument?.bigpayToken}
                        isAccountInstrument
                    />
            }

            {
                shouldShowBraintreeAchFormFields && isValidForm &&
                    <BraintreeAchMandateText
                        isInstrumentFeatureAvailable={isInstrumentFeatureAvailable}
                        updateMandateText={updateMandateText}
                    />
            }
        </div>
    );
};

export default BraintreeAchPaymentForm;
