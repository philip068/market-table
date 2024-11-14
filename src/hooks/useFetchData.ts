import { useState, useEffect } from 'react';
import { fetchJson } from '../utils';
import { Prop, Alternate } from '../types';

interface UseFetchDataReturn {
  propsData: Prop[];
  alternatesData: Alternate[];
  loading: boolean;
  error: string;
}

const useFetchData = (): UseFetchDataReturn => {
  const [propsData, setPropsData] = useState<Prop[]>([]);
  const [alternatesData, setAlternatesData] = useState<Alternate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [fetchedProps, fetchedAlternates] = await Promise.all([
          fetchJson<Prop[]>('/props.json'),
          fetchJson<Alternate[]>('/alternates.json'),
        ]);
        setPropsData(fetchedProps);
        setAlternatesData(fetchedAlternates);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { propsData, alternatesData, loading, error };
};

export default useFetchData;
