import './App.css';
import AppRoutes from './routers/AppRoutes';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  // Override or create new styles, colors, palettes...
});

function App() {
  return (
    <div>
       <ThemeProvider theme={theme}>
        <AppRoutes/>
      </ThemeProvider>
    </div>
  );
}

export default App;
