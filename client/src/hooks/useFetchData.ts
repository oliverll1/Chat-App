import { useState, useEffect } from 'react';
import { IUser } from '../types/types';

const useFetchData = (user: IUser, requestUrl: string, dataKey: string, setDataCallback: ((data: []) => void) | undefined = undefined) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          try {
            if (!user) {
              return;
            }

            const config = {
              method: 'get',
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
    
            const response = await fetch( requestUrl, config);

            if (!response.ok) {
              throw new Error('Failed to fetch');
            }
            const data = await response.json();

            setData(data);

            if (setDataCallback) {
              setDataCallback(data); // Update parent state with fetched data if callback is provided
            }

            setError(null);
          } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setIsLoading(false);
          }
        };
    
        fetchData();

      }, [user, requestUrl]);

      return { [dataKey]: data, isLoading, error };
    }

export default useFetchData;
