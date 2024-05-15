import { useQuery } from "urql";
import { HomeQuery, HomeDocument } from "../generated/graphql";
import {
  Container,
  Grid,
  Skeleton,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import PersonListItem from "../components/PersonListItem";
import Navbar from "../components/Navbar";
import { redirect } from "react-router-dom";

const HomePage = () => {
  const [result] = useQuery<HomeQuery>({ query: HomeDocument });
  const { data, error, fetching } = result;

  if (error) return redirect("/error");

  const numberOfItems = data?.allPeople?.edges?.length || 8; // Default to 8 if undefined

  if (fetching) {
    return (
      <Container maxWidth="lg" style={{ marginTop: 80 }}>
        <Grid container spacing={2}>
          {[...Array(numberOfItems)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" height={210} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
  return (
    <Container maxWidth="lg" style={{ marginTop: 80 }}>
      <Navbar title="People" />
      <Grid container spacing={2}>
        {data?.allPeople?.edges?.map((edge, index) => (
          <PersonListItem key={index} edge={edge}></PersonListItem>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
