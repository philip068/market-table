import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface ThemeToggleProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme, darkMode }) => {

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        sx={{
          transition: 'transform 0.3s ease',
          '&:hover': { transform: 'scale(1.1)' },
        }}
      >
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>

    </Tooltip>
  );
};

export default ThemeToggle;
