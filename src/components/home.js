import { React } from "react";
import {
  Box,
  Typography,
  Grid
} from "@material-ui/core";


export default function Home(){
  return(
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '80vh' }}
    >
      <Grid item xs={6}>
        <Box>
          <Typography variant="h3">
            Improve with Fun Sprint Retrospectives 🔥
          </Typography>
          <Typography variant="h5">
            Collaborate with your remote team and get better in what you do with a simple, intuitive and beautiful tool
          </Typography>
        </Box>
      </Grid>
    </Grid>
    
  );
}