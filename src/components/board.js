import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300
  }
}));

export default function Board({name, description, column, cardTotal}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader style={{ paddingBottom: 5 }} title={name} />
      <CardContent style={{ paddingTop: 0 }}>
        <Typography
          style={{ paddingBottom: 5 }}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {cardTotal} cards
        </Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Typography variant="body2" color="textSecondary" component="p">
          board tóm tắt
        </Typography>
      </CardContent>
    </Card>
  );
}