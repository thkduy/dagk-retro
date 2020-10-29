import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Board from '../components/board.js';
import Grid from '@material-ui/core/Grid';
import Loading from '../components/loading.js';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function AutoGrid() {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [Data, setData] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("http://localhost:3001/")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setData(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return(
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={3}>
                    <Loading />
                </Grid>

            </Grid>
            
        )
    } else {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <Typography component="div">
                        Danh sách board
                    </Typography>
                    <div className={classes.root}>
                        <Grid container justify="flex-start" spacing={3}>
                            {Data.map((item) => {
                                let cardTotal = 0;
                                item.column.map((i) => {
                                    cardTotal += i.cards.length;
                                    return 0;
                                });
                                return (
                                    <Grid item xs>
                                        <Board
                                            name={item.name}
                                            description={item.description}
                                            column={item.column}
                                            cardTotal={cardTotal}
                                        />
                                    </Grid>
                                )
                            })}

                        </Grid>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}