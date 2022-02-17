import axios from 'axios';
import useSWR from 'swr';

export const useSanityProduct = (itemId) => {
  const { data, error } = useSWR(`/api/sanity/product?productId=${itemId}`, axios, {
    revalidateOnFocus: false,
  });

  return {
    product: data?.data?.product,
    isLoading: !error && !data,
    isError: error,
  };
};
