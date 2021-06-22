/**
 * @param n : number of users to request. 
 * @returns Object {results: Array(n), info: {…}}
 */
const getNRandomUserImpl = async n => {
    let res = await fetch(`https://randomuser.me/api/?results=${n}`);
    if(res.ok){
        let data = await res.json();
        return data;
    } else {
        console.error('An error has accured while fetching users: ',res.status);
    }
}

const displayUserCards = user => {
    const { name, email, location,  picture } = user;
    const card = document.createElement('div');
    const cardImage = document.createElement('div');
    const cardInfo = document.createElement('div');
    //set classNames
    card.className = 'card';
    cardImage.className = 'card-img-container';
    cardInfo.className = 'card-info-container';
    //update image
    cardImage.innerHTML = `
        <img class="card-img" 
        src="${picture.thumbnail}" alt="profile picture">
    `;

    cardInfo.innerHTML = `
        <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${location.city}, ${location.state}</p>
    `;

    card.appendChild(cardImage);
    card.appendChild(cardInfo);
    return card;
}

const displayNRandomUser = async n => {
    const gallery = document.getElementById('gallery');
    const { results }= await getNRandomUserImpl(n);
    results.forEach(user => gallery.appendChild(displayUserCards(user)));
} 
//TODO: paginate? 
displayNRandomUser(100);

