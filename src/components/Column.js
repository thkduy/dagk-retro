import { React, useState } from 'react'
import {
    Grid,
    Typography,
    Button,
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Card from './Card';
export default function Column({name,columnData}) {
    const [cardArray, setCardArray] = useState(columnData.cards ? columnData.cards : []);
    const handleAddCard = () => {
        let newCard = {};
        newCard['content'] = "";
        newCard['isEditing'] = true;
        let newCardArray = Array.from(cardArray);
        newCardArray.push(newCard);
        setCardArray(newCardArray);
    }

    const handleDeleteCard = async (item) => {
        //alert(item.content);
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
            body: JSON.stringify({ idColumn: columnData._id, idCard: item._id }),
        }

        const res = await fetch(`https://dagk-retro-api.herokuapp.com/deleteCard`, options);
        if(res.ok){
            let array = Array.from(cardArray);
            const index = array.indexOf(item);
            if (index > -1) {
                array.splice(index, 1);
            }
            setCardArray(array);
        }
        
    };
    return(
        <Grid container item direction="column" xs spacing={1}>
            <Grid item>
                <Typography>
                    {name}
                </Typography>
            </Grid>
            <Grid item>
                <Button 
                    onClick={handleAddCard} 
                    variant="contained" 
                    fullWidth>
                    <AddIcon />
                </Button>
            </Grid>
            {cardArray.map((item,pos)=>{
                return(
                    <Card key={pos} item={item} idCol={columnData._id} onClick={(item) => handleDeleteCard(item)} />
                );
            })}
        </Grid>
    );
}