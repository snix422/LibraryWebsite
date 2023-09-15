import { AppBar, Paper, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton/IconButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import NavbarLoginIcon from "./NavbarLoginIcon";
import NavbarDrawer from "./NavbarDrawer";
import NavbarBasketIcon from "./NavbarBasketIcon";
import NavbarFavoriteIcon from "./NavbarFavoriteIcon";
import MenuDrawer from "./MenuDrawer";
import CategoryNavbar from "./CategoryNavbar";
import { Box } from "@material-ui/core";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const ariaLabel = { "aria-label": "description" };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar
        sx={{
          background: "white",
          minHeight: "130px",
          maxWidth: "100vw",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tooltip title="Home">
          <Link to={"/"}>
            <IconButton>
              <HomeIcon
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
              />
            </IconButton>
          </Link>
        </Tooltip>

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: {
              xl: "800px",
              lg: "700px",
              md: "500px",
              sm: "350px",
              xs: "200px",
            },
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={searchValue}
            placeholder="Search..."
            inputProps={ariaLabel}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue.length > 0 ? (
            <IconButton onClick={() => setSearchValue("")}>
              <CloseIcon />
            </IconButton>
          ) : (
            ""
          )}
          <Link to={"/search/" + searchValue}>
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={() => setSearchValue("")}
            >
              <SearchIcon />
            </IconButton>
          </Link>
        </Paper>
        <div style={{ display: "flex" }}>
          <NavbarLoginIcon />
          <NavbarBasketIcon />
          <NavbarFavoriteIcon />
          <NavbarDrawer />
          <MenuDrawer />
        </div>
      </AppBar>
      {/* <CategoryNavbar /> */}
    </Box>
  );
};

export default Navbar;
