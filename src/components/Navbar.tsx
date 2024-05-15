import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";

type Props = {
  title: string;
};
const Navbar = ({ title }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const canGoBack = location.key !== "default";

  const handleBackButtonClick = () => {
    navigate(-1);
  };
  
  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <IconButton
          style={{ position: "absolute" }}
          hidden={!canGoBack}
          edge="start"
          color="inherit"
          aria-label="back"
          onClick={handleBackButtonClick}
        >
          <ArrowBack />
        </IconButton>
        <Typography
          style={{ textAlign: "center" }}
          variant="h6"
          color="inherit"
          component="div"
          flex="1"
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
