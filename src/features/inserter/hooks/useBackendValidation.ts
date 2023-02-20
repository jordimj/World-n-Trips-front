import { useState } from 'react';
import { ImportData, KindOfData } from '../types';
import useRequest from './useRequest';

function useBackendValidation() {
  const { doRequest, loading, errorSnackbar } = useRequest();

  const [validationErrors, setValidationErrors] = useState<Array<any> | null>(null);

  console.log({ validationErrors });

  const handleDataValidation = async (
    dataKind: KindOfData,
    parsedData: ImportData
    // optionId: number
  ) => {
    if (dataKind === undefined) return;

    const body = {
      parsedData,
      optionId: 1,
    };

    const response = await doRequest({
      url: `/${dataKind}s/validate`,
      method: 'post',
      body,
      mockable: false,
      onSuccess: (response) =>
        setValidationErrors(response.data?.isValid ? [] : response.data?.errors),
      onValidationFail: (error) => setValidationErrors(error.response.data?.errors),
    });

    if (response?.status !== 200) {
    }
  };

  return {
    isValid: (validationErrors && validationErrors?.length > 0) ?? undefined,
    isValidating: loading,
    validationErrors,
    handleDataValidation,
  };
}

export default useBackendValidation;
