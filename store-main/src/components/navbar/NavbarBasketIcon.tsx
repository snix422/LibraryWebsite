import { Badge } from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CardContext from "../../context/CardContext";
import Tooltip from "@mui/material/Tooltip";

const NavbarBasketIcon = (props: any) => {
  const { items } = useContext(CardContext);

  return (
    <Badge
      badgeContent={items.length}
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
      <Link to={"/checkout"}>
        <Tooltip title="Shopping basket">
          <IconButton>
            <ShoppingCartIcon sx={{ width: "2em", height: "2em" }} />
          </IconButton>
        </Tooltip>
      </Link>
    </Badge>
  );
};
export default NavbarBasketIcon;
