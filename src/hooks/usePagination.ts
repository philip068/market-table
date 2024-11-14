import { useMemo } from 'react';

const usePagination = (
  data: any[],
  currentPage: number,
  itemsPerPage: number
) => {
  const totalItems = data.length;
  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  return { paginatedData, totalItems, totalPages };
};

export default usePagination;
