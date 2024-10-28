import { useState } from 'react';

import { Button } from '@nextui-org/button';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

import { publicEnv } from '@/config/env';
import { GenericError } from '@/features/error/generic-error';

type ModalContentProps = {
  clientSecret: string;
  conferenceId: number;
};

export function PaymentForm({ clientSecret, conferenceId }: ModalContentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const didLoad = stripe && elements;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!didLoad) {
      return;
    }

    setIsSubmitting(true);
    const { error } = await elements.submit();
    if (error) {
      setError(error.message ?? '');
      setIsSubmitting(false);
      return;
    }
    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${publicEnv.uiBaseUrl}/conference/${conferenceId}`,
      },
    });
    setIsSubmitting(false);

    if (result.error) {
      setError(result.error.message ?? '');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ModalHeader>Pay for tickets</ModalHeader>
      <ModalBody>
        <PaymentElement />
        {error && <GenericError header="Payment failed" message={error} />}
      </ModalBody>
      <ModalFooter>
        <Button
          type="submit"
          color="primary"
          isDisabled={!didLoad}
          isLoading={isSubmitting}
        >
          Join conference
        </Button>
      </ModalFooter>
    </form>
  );
}
