import { React, useState } from 'react'
import {
    Grid,
    Typography,
    Button,
    Card,
    CardContent,
    Box,
    TextField,
    CardActions

} from "@material-ui/core";

export default function CardItem({item, idCol}) {
    const [content, setContent] = useState(item.content);
    const [isEditName,setIsEditName] = useState(item.isEditing === undefined ? false : item.isEditing);
    const handleEdit = () => {
        setIsEditName(true);
    }

    const handleContentChange = (event) => {
        setContent(event.target.value);
    }

    const handleSaveName = async() => {
        
        if(item.isEditing)
        {//create new card
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
                body: JSON.stringify({ idColumn: idCol, content: content }),
            }
    
            const response = await fetch(`http://localhost:3001/save`, options);
            if(response.ok){
                const res = await response.json();
                item._id = res.data._id;
                item.isEditing = false;
            }
        } else
        {
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
                body: JSON.stringify({ id: item._id, newContent: content }),
            }
    
            await fetch(`http://localhost:3001/editCard`, options);
        }
        setIsEditName(false);
    }

    const handleDelete = async () => {
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
            body: JSON.stringify({ idColumn: idCol, idCard: item._id }),
        }

        await fetch(`http://localhost:3001/deleteCard`, options);
        setIsEditName(false);
    }


    return(
        <Grid item>
            <Card variant="outlined">
                <CardContent>
                    {isEditName ?
                        <Box style={{ paddingRight: 10 }}>
                            <TextField
                                value={content}
                                autoFocus
                                style={{ marginRight: 5 }}
                                fullWidth
                                multiline={true}
                                onChange={handleContentChange}
                            />
                        </Box>
                        : <Typography variant="h5">
                            {content}
                        </Typography>}
                </CardContent>
                <CardActions>
                    {isEditName ?
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveName}
                                style={{ marginRight: 5 }}
                            >
                                Done
                                    </Button>
                        </Box>
                        : <Box >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleEdit}
                                style={{ marginRight: 5 }}
                            >
                                Edit
                                    </Button>
                            <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
                        </Box>
                    }
                </CardActions>
            </Card>
        </Grid>
    );

}