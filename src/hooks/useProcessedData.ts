import { useMemo } from 'react';
import { Prop, Alternate, Market, Filters } from '../types';

type SortOrder = 'asc' | 'desc';

interface UseProcessedDataParams {
  propsData: Prop[];
  alternatesData: Alternate[];
  manualSuspensions: Record<string, boolean>;
  sortColumn: keyof Market;
  sortOrder: SortOrder;
  filters: Filters;
}

const useProcessedData = ({
  propsData,
  alternatesData,
  manualSuspensions,
  sortColumn,
  sortOrder,
  filters,
}: UseProcessedDataParams): Market[] => {
  const processedData: Market[] = useMemo(() => {
    return propsData.map((market) => {
      const { playerId, statType, line, marketSuspended } = market;

      const relevantAlternates = alternatesData.filter(
        (alt) => alt.playerId === playerId && alt.statType === statType
      );

      const lines = relevantAlternates.map((alt) => alt.line);
      const lowLine = lines.length > 0 ? Math.min(...lines) : null;
      const highLine = lines.length > 0 ? Math.max(...lines) : null;

      const optimalAlternate = relevantAlternates.find((alt) => alt.line === line);

      let isSuspended = false;

      if (marketSuspended === 1) {
        isSuspended = true;
      } else if (!optimalAlternate) {
        isSuspended = true;
      } else {
        const { underOdds, overOdds, pushOdds } = optimalAlternate;
        if (underOdds <= 0.4 && overOdds <= 0.4 && pushOdds <= 0.4) {
          isSuspended = true;
        }
      }

      const marketKey = `${playerId}-${statType}`;
      if (manualSuspensions.hasOwnProperty(marketKey)) {
        isSuspended = manualSuspensions[marketKey];
      }

      return {
        ...market,
        lowLine,
        highLine,
        isSuspended,
      } as Market;
    });
  }, [propsData, alternatesData, manualSuspensions]);

  const sortedData = useMemo(() => {
    const sorted = [...processedData];
    sorted.sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (valueA === null || valueB === null) return 0;

      const compareA =
        typeof valueA === 'string' ? valueA.toLowerCase() : valueA;
      const compareB =
        typeof valueB === 'string' ? valueB.toLowerCase() : valueB;

      if (typeof compareA === 'string' && typeof compareB === 'string') {
        return sortOrder === 'asc'
          ? compareA.localeCompare(compareB)
          : compareB.localeCompare(compareA);
      }

      if (compareA < compareB) return sortOrder === 'asc' ? -1 : 1;
      if (compareA > compareB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [processedData, sortColumn, sortOrder]);

  const filteredData = useMemo(() => {
    return sortedData.filter((market) => {
      const { position, statType, marketStatus, searchTerm } = filters;

      if (
        position &&
        market.position.toLowerCase() !== position.toLowerCase()
      )
        return false;
      if (
        statType &&
        market.statType.toLowerCase() !== statType.toLowerCase()
      )
        return false;
      if (marketStatus) {
        const status = market.isSuspended ? 'Suspended' : 'Active';
        if (status !== marketStatus) return false;
      }
      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        if (
          !market.playerName.toLowerCase().includes(lowerSearchTerm) &&
          !market.teamNickname.toLowerCase().includes(lowerSearchTerm)
        )
          return false;
      }

      return true;
    });
  }, [sortedData, filters]);

  return filteredData;
};

export default useProcessedData;
