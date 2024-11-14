import React, { useState, useEffect, useMemo, FC } from 'react';
import { Prop, Alternate, Market, Filters } from '../../types';
import MarketTableContent from './MarketTableContent';
import FilterBar from '../FilterBar';
import Pagination from '../Pagination';
import {
  Paper,
  CircularProgress,
  Typography,
  Stack,
} from '@mui/material';
import useFetchData from '../../hooks/useFetchData';
import useProcessedData from '../../hooks/useProcessedData';
import usePagination from '../../hooks/usePagination';

const ITEMS_PER_PAGE = 10;

type SortOrder = 'asc' | 'desc';

const MarketTable: FC = () => {
  const { propsData, alternatesData, loading, error } = useFetchData();
  const [manualSuspensions, setManualSuspensions] = useState<Record<string, boolean>>({});
  const [filters, setFilters] = useState<Filters>({
    position: '',
    statType: '',
    marketStatus: '',
    searchTerm: '',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<keyof Market>('playerName');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const uniquePositions = useMemo(() => {
    const positions = propsData.map((market) => market.position);
    return Array.from(new Set(positions)).sort();
  }, [propsData]);

  const uniqueStatTypes = useMemo(() => {
    const statTypes = propsData.map((market) => market.statType);
    return Array.from(new Set(statTypes)).sort();
  }, [propsData]);

  const processedData = useProcessedData({
    propsData,
    alternatesData,
    manualSuspensions,
    sortColumn,
    sortOrder,
    filters,
  });

  const { paginatedData, totalPages } = usePagination(
    processedData,
    currentPage,
    ITEMS_PER_PAGE
  );

  const handleManualSuspension = (marketKey: string, isSuspended: boolean) => {
    setManualSuspensions((prev) => ({
      ...prev,
      [marketKey]: isSuspended,
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (column: keyof Market) => {
    if (sortColumn === column) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  if (loading) {
    return (
      <Stack alignItems="center" marginTop={4}>
        <CircularProgress />
        <Typography variant="h6" marginTop={2}>
          Loading data...
        </Typography>
      </Stack>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" align="center" marginTop={4}>
        {error}
      </Typography>
    );
  }

  return (
    <>
      <FilterBar filters={filters} setFilters={setFilters} positions={uniquePositions} statTypes={uniqueStatTypes}
      />
      <Paper elevation={3} sx={{ padding: 2, marginY: 3, backgroundColor: 'background.paper' }}>
        <MarketTableContent data={paginatedData} onManualSuspension={handleManualSuspension} onSort={handleSort} sortColumn={sortColumn} sortOrder={sortOrder}
        />
      </Paper>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}
      />
    </>
  );
};

export default MarketTable;
