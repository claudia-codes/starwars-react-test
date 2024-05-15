
import { ThemeProvider, createTheme } from "@mui/material";


const darkTheme = createTheme({ palette: { mode: "dark" } });

const withTheme = (WrappedComponent: React.FunctionComponent) => {
    const WithTheme = () => {
      return (
        <ThemeProvider theme={darkTheme}>
          <WrappedComponent />
        </ThemeProvider>
      );
    };

    return WithTheme;
  };


  export default withTheme;