import { Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const CategoryNavbar = () => {
  const categoryTable = ["Biography", "Business", "Computer", "Careers"];
  return (
    <Box sx={{ height: "3rem", width: "100%", display: "flex" }}>
      {categoryTable.map((categoryItem) => (
        <Link to={"/" + categoryItem.toLowerCase()}>
          {/* <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: "20px",
            }}
          > */}
          {categoryItem}
          {/* </Typography> */}
        </Link>
      ))}
    </Box>
  );
};

export default CategoryNavbar;
