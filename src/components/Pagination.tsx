import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      color="primary"
      variant="outlined"
      shape="rounded"
      size="large"
      showFirstButton
      showLastButton
      sx={{ mt: 2, textAlign: 'center' }}
    />
  );
  
};

export default Pagination;
