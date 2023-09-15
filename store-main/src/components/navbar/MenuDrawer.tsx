import { Accordion, AccordionDetails, AccordionSummary, Container } from "@mui/material";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Drawer,
} from "@mui/material";

import IconButton from "@mui/material/IconButton/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useState, useContext } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryContext from "../../context/CategoryContext";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarBasketIcon from "./NavbarBasketIcon";
import NavbarFavoriteIcon from "./NavbarFavoriteIcon";
import NavbarDrawer from "./NavbarDrawer";
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Anchor = "right";

const MenuDrawer = () => {
  const [state, setState] = useState({
    right: false,
  });

  const navigate = useNavigate();

  const toogleCategoryDrawer = () => {
    return;
  };

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
      sx={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["checkout", "favourite"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link to={"/" + text.toLowerCase()}>
              <ListItemButton
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "10px",
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
          xl: "none",
          lg: "none",
          md: "none",
          sm: "flex",
          xs: "flex",
        },
        position:'relative'
      }}
    >
      {(["right"] as const).map((anchor) => (
        <Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <MenuIcon
              sx={{
                width: {
                  xl: "40px",
                  lg: "40px",
                  md: "40px",
                  sm: "40px",
                  xs: "40px",
                },
                height: {
                  xl: "40px",
                  lg: "40px",
                  md: "40px",
                  sm: "40px",
                  xs: "40px",
                },
              }}
            ></MenuIcon>
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
            <Accordion sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{textAlign:'center'}}>Kategorie</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Link to="/"><Typography>Business</Typography></Link>
        </AccordionDetails>
        <AccordionDetails>
          <Typography>Comedy</Typography>
        </AccordionDetails>
        <AccordionDetails>
          <Typography>Travel</Typography>
        </AccordionDetails>
      </Accordion>
            <CloseIcon sx={{position:'absolute', right:'3%', top:'3%', display:'flex'}} />
          </Drawer>
        </Fragment>
      ))}
    </Container>
  );
};
export default MenuDrawer;
