import axios from 'axios';
import useSWR from 'swr';

export const useStripeProducts = () => {
  const { data, error } = useSWR(`/api/stripe/products`, axios, {
    revalidateOnFocus: false,
  });

  return {
    products: data?.data?.products,
    isLoading: !error && !data,
    isError: error,
  };
};
