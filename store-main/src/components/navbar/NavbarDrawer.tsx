import { Container } from "@mui/material";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Drawer,
} from "@mui/material";

import IconButton from "@mui/material/IconButton/IconButton";
import { Link } from "react-router-dom";
import { Fragment, useState, useContext } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryContext from "../../context/CategoryContext";
import CloseIcon from '@mui/icons-material/Close';

type Anchor = "right";

const NavbarDrawer = (props: any) => {
  const { declareCategory, category } = useContext(CategoryContext);
  const [refresh, setRefresh] = useState(false);
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Biography", "Business", "Computer", "Careers"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link to={"/" + text.toLowerCase()}>
              <ListItemButton
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
                onClick={() => {
                  declareCategory(text);
                  setRefresh(!refresh);
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                    fontSize: "20px",
                  }}
                >
                  {text}
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Container
      sx={{
        display: {
          xl: "block",
          lg: "block",
          md: "block",
          sm: props.mobile ? "flex" : "none",
          xs: props.mobile ? "flex" : "none",
        },
        position:'relative'
      }}
    >
      {(["right"] as const).map((anchor) => (
        <Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <MenuBookIcon sx={{ width: "2em", height: "2em" }} />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
            
          </Drawer>
        </Fragment>
      ))}
    </Container>
  );
};
export default NavbarDrawer;
