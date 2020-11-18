import React, {useEffect, useState} from 'react';
import {useLocation, useParams } from "react-router-dom";
import {
    Container,
    Grid,
    Typography,
    Button,
    TextField,
    IconButton,
    Box
} from "@material-ui/core";

import EditIcon from '@material-ui/icons/Edit';

import Column from './Column';
import Loading from '../components/loading.js';
import Swal from 'sweetalert2';

export default function Board() {
    const location = useLocation();
    const [isLoaded, setIsLoaded] = useState(location.boardData? true : false);
    const [boardData, setBoardData] = useState(location.boardData);
    const { id } = useParams();
    const domain = "http://localhost:3000";
    //if boardData undefine (click link share)
    useEffect(()=>{
        async function fetchData(){
            const url = "https://dagk-retro-api.herokuapp.com/board/" + id;
            const res = await fetch(url);
            try{
                const result = await res.json();
                setBoardData(result);
                setIsLoaded(true);
            }catch(error){
                console.log(error);
            }
                
        }
        if (!boardData) {
            fetchData();
        }        
    }, [boardData, id])

    const handleChange = (event) => {
        setBoardData({...boardData,'name' : event.target.value});
    }
    const [isEditName,setIsEditName] = useState(false);
    const handleEdit = () => {
        setIsEditName(true);
    }

    const handleShare = async () => {
        await Swal.fire({
            title: 'To invite people to your board, simply send them the following URL:',
            text: domain + location.pathname,
          })
    }

    const handleSaveName = async () => {
        const options = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify({ id: id, newName: boardData.name }),
        }

        await fetch(`https://dagk-retro-api.herokuapp.com/editBoardName`, options);
        setIsEditName(false);
    }
    
    if (!isLoaded) {
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
        return(
            <Container maxWidth="xl">
                <Grid container spacing={1}>
                    <Grid container item direction="row" spacing={1} alignItems="baseline">
                        <Grid item>
                        {isEditName ?
                            <Box style={{paddingRight: 10}}>
                                <TextField
                                    value={boardData.name}
                                    autoFocus
                                    style={{marginRight: 5}}
                                    onChange={handleChange}
                                />
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={handleSaveName} 
                                >
                                    Save
                                </Button>
                            </Box>
                            
                            : <Typography>
                                <Box fontWeight="fontWeightBold">
                                    {boardData.name}
                                    <IconButton
                                    onClick={handleEdit}
                                    color="inherit"
                                    >
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
                                </Box>
                            </Typography>
                        }  
                        </Grid>
                        <Grid item>
                            <Typography>
                            {boardData.description}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleShare}>Share</Button>
                        </Grid>
                    </Grid>
                    <Column key={0} name="Went Well" columnData={boardData.column[0]}/>
                    <Column key={1} name="To Improve" columnData={boardData.column[1]}/>
                    <Column key={2} name="Action Items" columnData={boardData.column[2]}/>
                </Grid>
            </Container>
        );
    }
}
