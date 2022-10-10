
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllGames } from "./axios";
import { Link } from "react-router-dom";


export const Details = () => {
    const {id} = useParams();
    const [game, setGame] = useState([])

    useEffect(()=>{
        getAllGames()
        .then(results=>setGame(results))
    },[])

    return(
        <div id="HomePage">
            <div id="AllGames">
                {game.map(game=>{
                    (id === game.id) 
                    return (
                        <div className="Game" key={game.id}>
                            <div className="GamePhoto"></div>
                            <p>Id: {id}</p>

                            <div className="GameQuickInfo">
                                <div className="GameName">{game.name}</div>
                                <div className="GamePrice">${game.price}</div>
                                <Link to ='/'>Back to Home</Link>
                            </div>
                        </div>
                    ) 
                })}
            </div>
        </div>
    )
}
export default Details







// import React from "react";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getAllGames } from "./axios";
// import { Link } from "react-router-dom";


// export const Details = () => {
//     const {id} = useParams();
//     const [game, setGame] = useState([])

//     useEffect(() => {
//         console.log('id:', id);
//     }, []);
//     return (
//         <div>
//             <p>Id: {id}</p>
//             <p>Name:</p>
//             <p>Price</p>
//             <p>description</p>
//             <Link to ='/'>Back to Home</Link>
//         </div>
//     )
// }
// export default Details