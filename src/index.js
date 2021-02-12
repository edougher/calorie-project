
let allCharInfo = []

main = () => {
    fetchData()
    handleSpanClick()
    
}

fetchData = () =>{
    fetch('http://localhost:3000/characters')
    .then(resp => resp.json())
    .then(charData => {
        allCharInfo = charData
        charData.forEach(char => {
            createCharacterSpan(char)
            
        });
    })
}

createCharacterSpan = (char) =>{
    const charBar = document.querySelector('#character-bar')
    const charSpan = `<span class="char-span" id="${char.id}">${char.name}</span>`

    charBar.innerHTML += charSpan
}

handleSpanClick = () => {
    const charBar = document.querySelector('#character-bar')
    charBar.addEventListener('click', function(e){
        if(e.target.className === "char-span"){
            displayCharInfo(e)
            
        }
        
    })
    
}

displayCharInfo = (e) =>{
    const charDetails = document.querySelector('#detailed-info')
    const char = allCharInfo.find(char => char.id == e.target.id)
    const h4 = document.querySelector('h4')
    
    const details = `
    <p id="name">${char.name}</p>
        <img id="image" src="${char.image}">
    <h4 id="${char.calories}">Total Calories: <span id="calories">${char.calories}</span> </h4>
    <form id="calories-form">
        <input type="hidden" value="${char.id}" id="characterId"/> <!-- Assign character id as a value here -->
        <input type="text" placeholder="Enter Calories" id="calories"/>
        <input id="${char.calories}"type="submit" value="Add Calories"/>
    </form>
        <button id="reset-btn">Reset Calories</button>
    `
    charDetails.innerHTML = details
    handleCaloriesForm(char)
    //handleReset()
}

handleCaloriesForm = (char) => {
    const form = document.querySelector('#calories-form')
    
    form.addEventListener('submit', function(e){
        e.preventDefault()
        let charCalories = parseInt(char.calories) + parseInt(e.target['calories'].value)
        console.log(charCalories)

        const newData = {
        calories: charCalories 
        }

        form.reset()

        const reqObject = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
        }
        
    fetch(`http://localhost:3000/characters/${char.id}`, reqObject)
    .then(resp => resp.json())
    .then(newData => {
       const span = document.querySelector('span#calories')
       span.innerText = newData.calories
    })
  })
}

main()
