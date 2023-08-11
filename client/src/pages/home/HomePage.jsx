import { useTranslation } from 'react-i18next'
import { useQuery } from '~shared/lib/query/useQuery.jsx'
import $api from '~shared/api/index.js'
import { useEffect, useState } from 'react'

const fetchData = async () => {
  try {
    const response = await $api.getUser(3);
    return response.data
  } catch (error) {
    throw error;
  }
};

export const HomePage = () => {
  const { data, isLoading, error } = useQuery(fetchData);
  const { t } = useTranslation();
  useEffect(() => {
    if(!data) return
    console.log(data)
  }, [isLoading])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {t('TEST')}
      {data && <div>Hello {data.username}</div>}
    </div>
  );
}