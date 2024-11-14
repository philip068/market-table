import React, { memo, FC } from 'react';
import { Market } from '../../types';
import {
  TableRow,
  TableCell,
  Button,
  Chip,
  Tooltip,
} from '@mui/material';
import { Lock, LockOpen } from '@mui/icons-material';

interface MarketRowProps {
  market: Market;
  marketKey: string;
  onManualSuspension: (marketKey: string, isSuspended: boolean) => void;
}

const StatusChip: FC<{ isSuspended: boolean }> = ({ isSuspended }) => (
  <Chip
    label={isSuspended ? 'Suspended' : 'Active'}
    color={isSuspended ? 'error' : 'success'}
    size="small"
  />
);

const SuspendButton: FC<{ isSuspended: boolean; onClick: () => void }> = ({ isSuspended, onClick}) => (
  <Tooltip title={isSuspended ? 'Release Market' : 'Suspend Market'}>
    <Button
      variant="contained"
      color={isSuspended ? 'primary' : 'secondary'}
      onClick={onClick}
      startIcon={isSuspended ? <LockOpen /> : <Lock />}
      size="small"
      aria-label={isSuspended ? 'Release Market' : 'Suspend Market'}
    >
      {isSuspended ? 'Release' : 'Suspend'}
    </Button>
  </Tooltip>
);

const MarketRow: FC<MarketRowProps> = memo(
  ({ market, marketKey, onManualSuspension }) => {
    const {
      playerName,
      teamNickname,
      position,
      statType,
      lowLine,
      highLine,
      line,
      isSuspended,
    } = market;

    const handleSuspendToggle = () => {
      onManualSuspension(marketKey, !isSuspended);
    };

    return (
      <TableRow hover sx={{ cursor: 'pointer' }}>
        <TableCell>{playerName}</TableCell>
        <TableCell>{teamNickname}</TableCell>
        <TableCell>{position}</TableCell>
        <TableCell>{statType}</TableCell>
        <TableCell align="right">{lowLine ?? 'N/A'}</TableCell>
        <TableCell align="right">{highLine ?? 'N/A'}</TableCell>
        <TableCell align="right">{line}</TableCell>
        <TableCell>
          <StatusChip isSuspended={isSuspended} />
        </TableCell>
        <TableCell>
          <SuspendButton isSuspended={isSuspended} onClick={handleSuspendToggle} />
        </TableCell>
      </TableRow>
    );
  }
);

export default MarketRow;
