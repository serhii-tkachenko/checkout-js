// import { createLanguageService } from '../../../../../../checkout-sdk-js';
// import { render } from '@testing-library/react';
// import { Formik } from 'formik';
// import { noop } from 'lodash';
// import React from 'react';
//
// import { formFieldData } from './index';
//
// import BraintreeAchFormFields, { BraintreeAchFormFieldsProps } from './BraintreeAchFormFields';
//
// describe('BraintreeAchFormFields Component', () => {
//     it('should render with default formFieldData', () => {
//         const props: BraintreeAchFormFieldsProps = {
//             fieldValues: formFieldData,
//             handleChange: () => () => undefined,
//             language: createLanguageService(),
//         };
//
//         const { container } = render(
//             <Formik initialValues={{}} onSubmit={noop}>
//                 <BraintreeAchFormFields {...props} />
//             </Formik>,
//         );
//
//         // eslint-disable-next-line testing-library/no-node-access
//         expect(container.children).toHaveLength(formFieldData.length);
//     });
// });
