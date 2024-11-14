import React from 'react';
import { Container, Typography, AppBar, Toolbar } from '@mui/material';
import ThemeToggle from './components/ThemeToggle';
import MarketTable from './components/Market/MarketTable';
import { useThemeContext } from './contexts/ThemeContext';

const App: React.FC = () => {
  const { toggleTheme, darkMode } = useThemeContext();

  return (
    <Container maxWidth="xl" sx={{ padding: '24px 0' }}>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h1" sx={{ flexGrow: 1, color: 'primary.contrastText' }}>
            NBA Player Markets
          </Typography>
          <ThemeToggle toggleTheme={toggleTheme} darkMode={darkMode} />
        </Toolbar>
      </AppBar>
      <MarketTable />
    </Container>
  );
};

export default App;
