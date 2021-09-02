import React, { useMemo, FunctionComponent } from 'react';

import { TranslatedHtml, TranslatedString } from '../../locale';
import { CheckboxFormField } from '../../ui/form';

export interface BoltCustomFormProps {
    containerId: string;
    showCreateAccountCheckbox: boolean;
}

const BoltCreateAccountCheckbox: FunctionComponent = () => {
    const options = {
        privacyPolicyUrl: 'https://www.bolt.com/privacy/',
        termsUrl: 'https://www.bolt.com/end-user-terms/',
    };

    const labelContent = useMemo(() => (
        <>
            <TranslatedString id="payment.bolt_create_account_label" />
            <br />
            <TranslatedHtml
                data={ options }
                id="payment.bolt_create_account_disclaimer"
            />
        </>
    ), [options]);

    return <CheckboxFormField
        additionalClassName="form-checkbox form-field--createAccount"
        labelContent={ labelContent }
        name="shouldCreateAccount"
    />;
};

const BoltCustomForm: FunctionComponent<BoltCustomFormProps> = ({ containerId, showCreateAccountCheckbox }) => {
    return (
        <div className="form-ccFields">
            <div
                className="form-field form-field--bolt-embed"
                id={ containerId }
            />
            { showCreateAccountCheckbox ? <BoltCreateAccountCheckbox /> : null }
        </div>
    );
};

export default BoltCustomForm;
