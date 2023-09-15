import { Badge } from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import FavouriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import { useContext } from "react";
import FavouriteContext from "../../context/FavouriteContext";
import Tooltip from "@mui/material/Tooltip";

const NavbarFavoriteIcon = (props: any) => {
  const { favouriteItems } = useContext(FavouriteContext);

  return (
    <Badge
      badgeContent={favouriteItems.length}
      color="primary"
      sx={{
        display: {
          xl: "block",
          lg: "block",
          md: "block",
          sm: props.mobile ? "block" : "none",
          xs: props.mobile ? "block" : "none",
        },
      }}
    >
      <Tooltip title="Favorites">
        <Link to={"/favourite"}>
          <IconButton>
            <FavouriteBorderIcon sx={{ width: "2em", height: "2em" }} />
          </IconButton>
        </Link>
      </Tooltip>
    </Badge>
  );
};

export default NavbarFavoriteIcon;
