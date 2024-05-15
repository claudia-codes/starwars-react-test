/* 
  This page should list all the people from the Star Wars API. Each person should
  be linked to its own page.
*/
import { useQuery } from "urql";
import { HomeQuery, HomeDocument } from "../generated/graphql";
import { Container, Grid } from "@mui/material";
import PersonListItem from "../components/PersonListItem";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [result] = useQuery<HomeQuery>({ query: HomeDocument });
  const { data, error, fetching } = result;

  if (error) return <Container>Error</Container>;
  if (fetching) return <Container>Loading...</Container>;

  return (
    <>
      <Navbar title="People" />
      <Container maxWidth="lg" style={{ marginTop: 100 }}>
        <Grid container spacing={2}>
          {data?.allPeople?.edges?.map((edge) => (
            <PersonListItem edge={edge}></PersonListItem>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
