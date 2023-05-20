import React from 'react'






const CraftCard = ({craft}) => {
    let hearts;

    hearts = (craft != undefined ?
    (craft.difficulty == "easy" ? hearts = '💚' :
    craft.difficulty == "medium" ? hearts = '🧡🧡' :
    hearts = '❤️❤️❤️')
    : null)

    return craft != undefined ? (
    <div className="card-container">
    <div className="image-container">
      <img src={craft.image} alt="" />
    </div>
    <div className="card-content">
      <div className="card-title">
        <h3>{craft.name}</h3>
        <br />
      </div>
      <div className="card-body">
        <p>{hearts}</p>
        <br />
        <p>{craft.description}</p>
      </div>
      <br />

      <div className="btn">
        {/* <Link to={`${yarn.id}`}> */}
          <button>Show More</button>
        {/* </Link> */}
        <br />
        <br />
      </div>
    </div>
  </div>) : (<h2>Loading...</h2>)

  
}

export default CraftCard