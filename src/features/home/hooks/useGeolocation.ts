import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface GeolocationPosition {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface GeolocationOptions {
  watch?: boolean;
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  refetchInterval?: number | false;
  enabled?: boolean;
}

interface UseGeolocationReturn {
  position: GeolocationPosition | undefined;
  error: GeolocationPositionError | Error | null;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
}

// Geolocation fetcher function
const getGeolocation = (options: PositionOptions = {}): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        reject(error);
      },
      options
    );
  });
};

// Custom hook using TanStack Query
export const useGeolocation = (options: GeolocationOptions = {}): UseGeolocationReturn => {
  const {
    watch = false,
    enableHighAccuracy = false,
    timeout = 10000,
    maximumAge = 0,
    refetchInterval,
    enabled = true,
  } = options;

  const geolocationOptions: PositionOptions = {
    enableHighAccuracy,
    timeout,
    maximumAge,
  };

  // Use TanStack Query for state management
  const query = useQuery<GeolocationPosition, GeolocationPositionError | Error>({
    queryKey: ['geolocation', { enableHighAccuracy, timeout, maximumAge }],
    queryFn: () => getGeolocation(geolocationOptions),
    enabled,
    refetchInterval: watch ? refetchInterval || 5000 : false,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: maximumAge,
  });

  return {
    position: query.data,
    error: query.error,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
    isSuccess: query.isSuccess,
  };
};
