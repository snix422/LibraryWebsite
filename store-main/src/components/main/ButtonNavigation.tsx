import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../customHook/useFetch";
import axios from "axios";
import React from "react";

import { Avatar, Grid, Paper } from "@material-ui/core";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface IDescription {
  imgDescription: string;
  id: number;
}

interface IComment {
  id: number;
  username: string;
  comment: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ButtonNavigation: React.FC<IDescription> = ({ imgDescription, id }) => {
  const [value, setValue] = useState(0);

  const [addedComment, setAddedComment] = useState("");
  const [productsWithComment, setProductsWithComment] = useState<any[]>([]);

  const fireBaseUrl =
    "https://bookstore-ce144-default-rtdb.europe-west1.firebasedatabase.app/Comments.json";

  const { products } = useFetch(fireBaseUrl);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const userIsLoggedIn = localStorage.getItem("name");

  const addComment = (event: any) => {
    setAddedComment(event.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      axios.get(fireBaseUrl).then(
        (response) => {
          const getData = Object.values(response.data);
          setProductsWithComment(getData);
        },
        (error) => {
          console.log(error);
        }
      );
    }, 5000); // wait 5 seconds
  }, [addedComment]);

  const getProductWithComment =
    productsWithComment.length > 0 ? productsWithComment : products;

  const commentHandler = () => {
    if (addedComment.trim().length < 5) {
      toast.error("Not possible to add comment");
      return;
    }
    axios.post(fireBaseUrl, {
      id: id,
      username: userIsLoggedIn,
      comment: addedComment,
    });
    toast.success("Added comment !", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setAddedComment("");
  };

  const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  const user = localStorage.getItem("name");

  return (
    <Box
      sx={{
        paddingTop: {
          xl: "40px",
          lg: "40px",
          md: "40px",
          sm: "20px",
          xs: "20px",
        },
        width: {
          xl: "80vw",
          lg: "80vw",
          md: "80vw",
          sm: "90vw",
          xs: "95vw",
        },
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Comments" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Typography
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 500,
            fontSize: {
              xl: "20px",
              lg: "20px",
              md: "15px",
              sm: "15px",
              xs: "15px",
            },
            textAlign: "justify",
            fontStyle: "italic",
            
          }}
        >
          {imgDescription}
        </Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {getProductWithComment.length > 0
          ? getProductWithComment.map((comment: IComment) => {
              return (
                <Paper style={{ padding: "40px 20px", marginBottom: "10px" }}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar alt="Ubuntu" src={imgLink} />
                    </Grid>
                    <Grid
                      style={{ justifyContent: "left" }}
                      item
                      xs
                      zeroMinWidth
                    >
                      <h4 style={{ margin: 0, textAlign: "left" }}>{user}</h4>
                      <p style={{ textAlign: "left" }}>{comment.comment}</p>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })
          : null}
        {userIsLoggedIn ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{
                width: {
                  xl: "75vw",
                  lg: "75vw",
                  md: "70vw",
                  sm: "70vw",
                  xs: "70vw",
                },
              }}
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue="Add Comment"
              onChange={addComment}
              value={addedComment}
            />
            <Button
              className="button-color"
              size="medium"
              variant="contained"
              sx={{
                marginTop: "4px",
                width: {
                  xl: "350px",
                  lg: "350px",
                  md: "200px",
                  sm: "200px",
                  xs: "200px",
                },
                backgroundColor: "#c75146",
                color: "white",
                "&:hover": {
                  backgroundColor: "#ad2e24",
                },
              }}
              onClick={commentHandler}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "20px",
                  textAlign: "center",
                }}
              >
                Add Comment
              </Typography>
            </Button>
          </Box>
        ) : (
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: "20px",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            <p>User need to login to add any comments</p>
          </Typography>
        )}
      </CustomTabPanel>
      <ToastContainer />
    </Box>
  );
};

export default ButtonNavigation;
