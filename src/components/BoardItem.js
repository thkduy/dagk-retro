import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Button,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
    maxWidth: 300
  }
}));



export default function Board({boardData, onClick}) {
  const history = useHistory();
  const classes = useStyles();
  let cardTotal = 0;
  boardData.column.map((i) => {
      cardTotal += i.cards.length;
      return 0;
  });
  const handleViewDetailed = () => {
    history.push({
      pathname: "/board/"+boardData._id,
      boardData: boardData,
    });
  }

  return (
    <Card className={classes.root}>
      <CardHeader style={{ paddingBottom: 5 }} title={boardData.name} />
      <CardContent style={{ paddingTop: 0 }}>
        <Typography
          style={{ paddingBottom: 5 }}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {boardData.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {cardTotal} cards
        </Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
        <Button 
          onClick={()=>onClick(boardData)}
          variant="contained" 
          color="secondary" 
          fullWidth>
          Xóa
        </Button>
        
        </Grid>
        <Grid item xs={8}>
        <Button 
          onClick={handleViewDetailed}
          variant="contained" 
          color="primary" 
          fullWidth>
          Xem chi tiết
        </Button>
      
        </Grid>
      </Grid>
        </CardContent>
    </Card>
  );
}