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
    const { name, email, location, picture, dob, phone } = user;
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

    card.addEventListener('click',(e)=>{
        const date = new Date(dob.date)
        const body = document.querySelector('body');
        const modalContainer = document.createElement('div');
        const modal = document.createElement('div');
        const button = document.createElement('button');
        const modalInfo = document.createElement('div');
        // cosmetics
        modalContainer.className ='modal-container';
        modal.className = 'modal';
        button.type = 'button';
        button.id = 'modal-close-btn';
        button.className = 'modal-close-btn';
        modalInfo.className ='modal-info-container';
        button.innerHTML = '<strong>X</strong>';
        modalInfo.innerHTML = `
            <img class="modal-img" src="${picture.thumbnail}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${location.city}</p>
            <hr>
            <p class="modal-text">${phone}</p>
            <p class="modal-text"> 
                ${location.street.number} 
                ${location.street.name}, 
                ${location.city}, 
                ${location.state} 
                ${location.postcode}
            </p>
            <p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        `;
        modal.appendChild(button);
        modal.appendChild(modalInfo);
        modalContainer.appendChild(modal);
        body.append(modalContainer);

        button.addEventListener('click',(e)=>{
            modalContainer.remove();
        })
    })
    return card;
}

const displayNRandomUser = async n => {
    const gallery = document.getElementById('gallery');
    const { results }= await getNRandomUserImpl(n);
    results.forEach(user => gallery.appendChild(displayUserCards(user)));
} 
//TODO: paginate? 
displayNRandomUser(12);

