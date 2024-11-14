import React, { FC } from 'react';
import { Market } from '../../types';
import MarketRow from './MarketRow';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableSortLabel,
} from '@mui/material';

interface MarketTableContentProps {
  data: Market[];
  onManualSuspension: (marketKey: string, isSuspended: boolean) => void;
  onSort: (column: keyof Market) => void;
  sortColumn: keyof Market;
  sortOrder: 'asc' | 'desc';
}

interface Column {
  id: keyof Market | 'marketStatus' | 'manualControl';
  label: string;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
}

const columns: Column[] = [
  { id: 'playerName', label: 'Player', sortable: true },
  { id: 'teamNickname', label: 'Team', sortable: true },
  { id: 'position', label: 'Position', sortable: true },
  { id: 'statType', label: 'Stat Type', sortable: true },
  { id: 'lowLine', label: 'Low Line', align: 'right', sortable: true },
  { id: 'highLine', label: 'High Line', align: 'right', sortable: true },
  { id: 'line', label: 'Optimal Line', align: 'right', sortable: true },
  { id: 'marketStatus', label: 'Market Status' }, // Non-sortable
  { id: 'manualControl', label: 'Manual Control' }, // Non-sortable
];

const MarketTableContent: FC<MarketTableContentProps> = ({
  data,
  onManualSuspension,
  onSort,
  sortColumn,
  sortOrder,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="market table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || 'left'}
                sortDirection={
                  column.sortable && sortColumn === column.id ? sortOrder : false
                }
              >
                {column.sortable ? (
                  <TableSortLabel
                    active={sortColumn === column.id}
                    direction={sortColumn === column.id ? sortOrder : 'asc'}
                    onClick={() => onSort(column.id as keyof Market)}
                    aria-label={`Sort by ${column.label} (${
                      sortOrder === 'asc' ? 'ascending' : 'descending'
                    })`}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                No markets found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((market) => {
              const marketKey = `${market.playerId}-${market.statType}`;
              return (
                <MarketRow
                  key={marketKey}
                  market={market}
                  marketKey={marketKey}
                  onManualSuspension={onManualSuspension}
                />
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MarketTableContent;
