import React from 'react';

import BillingInfo from './BillingInfo';
import PaymentInfo from './PaymentInfo';


const BillingPage = () => (
  <div>
    <h1 className="sr-only">Billing</h1>
    <BillingInfo />
    <PaymentInfo />
  </div>
);

export default BillingPage;
