import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Grid } from "@material-ui/core";

const NavbarLoginIcon = () => {
  const user = localStorage.getItem("name");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(!open);
  };
  const logOut = () => {
    localStorage.removeItem("name");
  };

  const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  return (
    <Box
      sx={{
        display: {
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: "none",
          xs: "none",
        },
        flexDirection: "column",
      }}
    >
      {user ? (
        <>
          <IconButton onClick={handleClick}>
            <Box sx={{ flexDirection: "column" }}>
              <Grid item>
                <Avatar alt="Ubuntu" src={imgLink} />
              </Grid>

              {/* sx={{ width: "2em", height: "2em" }} */}
            </Box>
          </IconButton>
          <Box>
            <Typography>{user}</Typography>
            <Menu
              anchorEl={anchorEl}
              id="basic-menu"
              open={open}
              onClose={handleClose}
            >
              <Link to={"/"}>
                <MenuItem onClick={logOut}>Wyloguj się</MenuItem>
              </Link>
              <MenuItem onClick={handleClose}>Zamknij</MenuItem>
            </Menu>
          </Box>
        </>
      ) : (
        <>
          <Tooltip title="Login">
            <IconButton>
              <Box sx={{ flexDirection: "column" }}>
                <PersonIcon
                  onClick={handleClick}
                  sx={{ width: "2em", height: "2em" }}
                />
              </Box>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="basic-menu"
            open={open}
            onClose={handleClose}
          >
            <Link to={"/login"}>
              <MenuItem>Login</MenuItem>
            </Link>
            <Link to={"/signup"}>
              <MenuItem>Create an account</MenuItem>
            </Link>
            <MenuItem onClick={handleClose}>Close</MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
};

export default NavbarLoginIcon;
