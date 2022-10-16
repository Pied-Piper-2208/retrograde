import { useEffect, useState } from "react"
import { getUserPurchaseHistory } from "./axios"


export const MyPage = ({token}) => {
    const [purchaseHistory, setPurchaseHistory] = useState([])

    useEffect(()=>{
        getUserPurchaseHistory(token)
        .then(results=>setPurchaseHistory(results))
    },[])

    return (
        <div>
            <h1>Purchase History</h1>
            <hr/>
            {purchaseHistory.map(purchase=>{
                return (
                    <div key={purchase.orderId}>
                        <img className="GameDetailsImage" src={purchase.image} alt={purchase.name}/>
                        <h2>{purchase.name}</h2>
                        <h2>${purchase.price}</h2>
                        <hr/>
                    </div>
                )
            })}
        </div>
    )
}