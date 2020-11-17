import { React, useContext } from "react";
import { useHistory } from "react-router-dom";
import authUserContext  from '../context/context';

export default function Home(){
    const history = useHistory();
    const isAuthenticated = useContext(authUserContext);
    if(isAuthenticated)
      history.push("/dashboard");
    else
      history.push("/");
    return(
        <div>
            home
        </div>
    );
}