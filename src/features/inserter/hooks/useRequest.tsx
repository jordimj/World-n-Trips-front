import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import useSnackbar from './useSnackbar';

interface DoRequestProps {
  url: string;
  method?: 'get' | 'post';
  body?: {};
  mockable?: boolean;
  onSuccess?: (response: AxiosResponse) => void;
  onValidationFail?: (response: any) => void;
}

export default function useRequest() {
  const [loading, setLoading] = useState<boolean>(false);
  const { snackbar: errorSnackbar, openSnackbar } = useSnackbar();

  const doRequest = async ({
    url,
    method = 'get',
    body,
    mockable = false,
    onSuccess,
    onValidationFail,
  }: DoRequestProps) => {
    try {
      setLoading(true);

      if (mockable && process.env.NODE_ENV === 'development') return { status: 201 };

      const response = await axios({
        method: method,
        url: `http://localhost:8000${url}`,
        data: body,
      });

      onSuccess?.(response);
      return response;
    } catch (error: any) {
      onValidationFail?.(error);
      openSnackbar([
        {
          label: `Error ${error.response.status}: ${error.response.statusText}`,
          sublabel: error.response.data.message,
          severity: 'error',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { doRequest, loading, errorSnackbar };
}
