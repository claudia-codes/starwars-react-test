import { Container, Typography } from "@mui/material";

const ErrorPage = () => {
    return (
      <Container maxWidth="sm" style={{ marginTop: '20%', marginBottom: '20%' }}>
        <Typography variant="h4" align="center">Oops Something went wrong.</Typography>
        <Typography variant="body1" align="center">We encountered an unexpected error. Please try again later.</Typography>
      </Container>
    );
  }
  
  export default ErrorPage;
  