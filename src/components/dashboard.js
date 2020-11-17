import React, {useEffect, useState} from 'react';
import Board from '../components/BoardItem.js';
import {
    Grid,
    Button,
    Container,
    Typography
} from '@material-ui/core';
import Loading from '../components/loading.js';

export default function DashBoard() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [Data, setData] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const user = localStorage.getItem("user");
            const url = "http://localhost:3001/dashboard/?id="+JSON.parse(user).id;
            const res = await fetch(url);
            try{
                const result = await res.json();
                setIsLoaded(true);
                setData(result);
            }catch(error){
                setIsLoaded(true);
                setError(error);
            }
        }
        fetchData();
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
                <Container fixed> 
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography variant="h4">
                                Danh sách board
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                // onClick={handleViewDetailed}
                                variant="contained"
                                color="primary"
                                fullWidth>
                                Tạo bảng mới
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-start" spacing={2}>
                        {Data.map((item, pos) => {
                            return (
                                <Grid item key={pos}>
                                    <Board key={pos} boardData={item} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}