import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CARDS } from "../utils/queries";
import "semantic-ui-css/semantic.min.css";
import VisDeck from "./VisDeck";

function CardDetail(props) {
  console.log(props.playerClass)
  var searchCrit = props.playerClass
  console.log(`hello${searchCrit}`)
  const { loading, data } = useQuery(QUERY_CARDS, {
   variables: {playerClass: searchCrit}
  })

  const theseCards = data?.getClassCard || [];

  const [currDeck, setCurrDeck] = useState([]);
  const filterTwo = (array, chosen) => {
    return array.filter(item => item.name === chosen.name).length
  }


  const addToDeck = (event) => {
    var card = JSON.parse(event.target.value)
    if(card.rarity === "Legendary"){
      if(filterTwo(currDeck, card) <= 0){
        setCurrDeck(currDeck => [...currDeck, card])
      } else alert('Max One Legendary!!')
    } else if(filterTwo(currDeck, card) <= 1){
        setCurrDeck(currDeck => [...currDeck, card])
      } else alert('Max 2 of the same card!!')
  }
   

  return (
    <div>
      <h1 style={{marginTop:"20px", marginBottom:"20px"}}>Choose your cards! </h1>
    <div>
      <div className="text-center ui centered grid">
        <div className="ui right sidebar vertical inverted menu overlay visible"
        style={{marginTop:"20px"}}>
          <VisDeck 
            currDeck = {currDeck}
          />
        </div>
        {loading ? (
          <div>
            Loading
          </div>
        ) : (
          theseCards.map((card) => (
          <button
            onClick={addToDeck}
            key={card.name}
            className="three wide column"
            value={`{"name":"${card.name}", "img":"${card.img}", "rarity":"${card.rarity}"}`}
            style={{
              backgroundColor:'white',
              backgroundImage:`url(${card.img})`,
              width: 'auto',
              height: 200,
              backgroundSize:'contain',
              backgroundRepeat:'no-repeat',
              border: 'none'
            }}
          />
        )))}
      </div>
  </div>
  </div>
  );
}

export default CardDetail;