import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Grid, Paper } from "@mui/material";

type Props = {
  edge: {
    node?: {
      id: string;
      name: string;
    };
  };
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: "center",
  color: theme.palette.text.primary,
  lineHeight: "10rem",
  height: "10rem",
}));

const PersonListItem = ({ edge }: Props) => {
  const navigate = useNavigate();
  const handleClick = (personId: string | undefined) =>
    navigate(`person/${personId}`);

  return (
    <Grid item xs={2}>
      <Item
        key={edge?.node?.id}
        onClick={() => handleClick(edge?.node?.id)}
        sx={{ "&:hover": { boxShadow: 6 }, cursor: "pointer" }}
        elevation={1}
      >
        {edge?.node?.name}
      </Item>
    </Grid>
  );
};

export default PersonListItem;
