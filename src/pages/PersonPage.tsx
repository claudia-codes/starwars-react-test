/*
This page should contain overview of the player
- List of producers the person has worked with and how many times.
- Birth year
- Person species average height.
- Paginated list of person films containing:
  - Title.
  - Release Date.
  - Number of planets without water in the film.
*/

import { useQuery } from "urql";
import { useParams } from "react-router-dom";
import { PersonDocument, PersonQuery } from "../generated/graphql";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { getAllProducersWorkCount } from "../utils/producers";
import TextMobileStepper from "../components/MoviesSlider";

const PersonPage = () => {
  const { personId } = useParams();
  const [result] = useQuery<PersonQuery>({
    query: PersonDocument,
    variables: { id: personId },
  });
  const { data, error, fetching } = result;
  const [producers, setProducers] = useState({});

  useEffect(() => {
    const validFilms = data?.person?.filmConnection?.films;
    setProducers(() => getAllProducersWorkCount(validFilms));
  }, [data]);

  if (error) return <Container>Error</Container>;
  if (fetching) return <Container>Loading...</Container>;

  return (
    <>
      {!data?.person ? (
        ""
      ) : (
        <>
          <Navbar title={data?.person.name} />
          <Container maxWidth="lg" style={{ marginTop: 100 }}>
            <Paper sx={{ p: 2 }}>
              <Stack
                direction="row"
                justifyContent={"space-evenly"}
                alignItems="baseline"
              >
                <Box>
                  <Typography sx={{ pb: 2 }} variant="h5" component="div">
                    Details
                  </Typography>
                  <Typography variant="body1" component="div">
                    {`Birth year: ${data?.person.birthYear}`}
                  </Typography>
                  <Typography component="div">
                    {`Average height: ${
                      data?.person.species?.averageHeight || 0
                    }`}
                  </Typography>
                  <Divider />

                  <Typography sx={{ py: 2 }} variant="h5" component="div">
                    List of producers
                  </Typography>
                  <List
                    style={{
                      width: "20rem",
                    }}
                  >
                    {Object.entries(producers).map(
                      ([producerName, collaborationsCount], index) => (
                        <ListItem>{`${
                          index + 1
                        }. ${producerName} - ${collaborationsCount} ${
                          collaborationsCount === 1
                            ? "collaboration"
                            : "collaborations"
                        }`}</ListItem>
                      )
                    )}
                  </List>
                </Box>
                <Box>
                  <Typography  sx={{ pb: 2 }} variant="h5" component="div">
                    Films
                  </Typography>
                  <TextMobileStepper
                    steps={data?.person?.filmConnection?.films}
                  ></TextMobileStepper>
                </Box>
              </Stack>
            </Paper>
          </Container>
        </>
      )}
    </>
  );
};

export default PersonPage;
