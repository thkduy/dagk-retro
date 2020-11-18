import React, {useEffect, useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import Board from '../components/BoardItem.js';
import authUserContext  from '../context/context';
import {
    Grid,
    Button,
    Container,
    Typography
} from '@material-ui/core';
import Loading from '../components/loading.js';
import Swal from 'sweetalert2';

export default function DashBoard() {
    const context = useContext(authUserContext);
    const id = context.user.id;
    const history = useHistory();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [Data, setData] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const user = localStorage.getItem("user");
            const url = "https://dagk-retro-api.herokuapp.com/dashboard/?id="+JSON.parse(user).id;
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

    const handleCreateNewBoard = async () => {
        await Swal.fire({
            title: 'Type your board name',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            showLoaderOnConfirm: true,
            preConfirm: (board_name) => {
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
                    body: JSON.stringify({ name: board_name, idUser: id}),
                }
                return fetch(`https://dagk-retro-api.herokuapp.com/createBoard`, options)
                .then(response => {
                  if (!response.ok) {
                    throw new Error(response.statusText)
                  }
                  return response.json()
                })
                .catch(error => {
                  Swal.showValidationMessage(
                    `Request failed: ${error}`
                  )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
              if(result.isConfirmed){
                const newBoard = result.value.newBoard;
                history.push({
                pathname: "/board/"+newBoard._id,
                boardData: newBoard,
              });
              }
            
          })
    }

    const handleDelete = async (item) => {
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
            body: JSON.stringify({ id: item._id }),
        }

        const res = await fetch(`https://dagk-retro-api.herokuapp.com/deleteBoard`, options);
        if(res.ok){
            const result = await res.json();
            console.log(result);
            let array = Array.from(Data);
            const index = array.indexOf(item);
            if (index > -1) {
                array.splice(index, 1);
            }
            setData(array);
        }
        
    };

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
                                onClick={handleCreateNewBoard}
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
                                    <Board key={pos} boardData={item} onClick={(item) => handleDelete(item)}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}