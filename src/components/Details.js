
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllGames } from "./axios";
import { Link } from "react-router-dom";


export const Details = () => {
    const {id} = useParams();
    const [game, setGame] = useState([])

    useEffect(() => {
        console.log('id:', id);
    }, []);
    return (
        <div>
            <p>Id: {id}</p>
            <p>Name:</p>
            <p>Price</p>
            <p>description</p>
            <Link to ='/'>Back to Home</Link>
        </div>
    )
}
export default Details