import axios from 'axios';
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
// axios.get('https://api.github.com/users/torvalds/followers?page=2')
//   .then(response => console.log(response.data))
//   .catch(error => console.error("CAUGHT ERROR" + error));
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
const cards = document.querySelector('.cards')
axios.get('https://api.github.com/users/buchananta')
  .then(res => cards.appendChild(makeCard(res.data)))
  .catch(error => console.error('CAUGHT ERROR:' + error))
/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

let followersArray = [
    'torvalds',
    'tetondan',
    'dustinmyers',
    'justsml',
    'luishrd',
    'bigknell',
];

//STRETCH GOAL STUFF
function linusCards(followers) {
  //take an array of follower usernames, and append cards to the page
  followers.forEach(person => {
    axios.get(`https://api.github.com/users/${person}`)
      .then(res => {
        cards.appendChild(makeCard(res.data))
      })
      .catch(error => {
        return console.error(`error retrieving ${person}: ` + error)
      })
    }
  )
}
//now lets set the page number, and start grabbing
function getFollowers(userName, page) {
  //get an array of followers
  axios.get(`https://api.github.com/users/${userName}/followers?page=${page}`)
    .then(res => {
      //call linusCards to append followers to page
      //actually, res is an array of objects full of data.
      //lets map!
      console.log(`response is`);
      res = res.data.map(personObj => personObj.login);
      console.log(res);
      linusCards(res);
    })
    .catch(error => {
      return console.error(`error retrieving ${userName} ${page} followers: ${error}`); 
    })
}

getFollowers('torvalds', 1);
//END OF STRETCH GOAL STUFF

followersArray.forEach(person => {
  axios.get(`https://api.github.com/users/${person}`)
    .then(res => {
      cards.appendChild(makeCard(res.data))
    })
    .catch(error => {
      return console.error(`error retrieving ${person}: ` + error)
    })
  }
)

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:
    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function makeCard(data) {
  const element = document.createElement('div');
  const btn = document.createElement('button');
  btn.textContent = '+'
  btn.addEventListener('click', event => {
    console.log(btn.nextElementSibling);
    debugger;
    btn.nextElementSibling.classList.toggle('no-display');
  })
  element.className = 'card';
  element.innerHTML = `<img src = ${data.avatar_url} />
  <div class="card-info">
    <h3 class="name">${data.name}</h3>
    <p class="username">${data.login}</p>  
    <p>Location: ${data.location}</p>
    <p>Profile:
      <a href=${data.html_url}>${data.html_url}</a>
      </p>
      <p>Followers: ${data.followers}</p>
      <p>Following: ${data.following}</p>
      <p>Bio: ${data.bio}</p>
      </div>
      <img class='temp'>
      <div class='expanded-info no-display'></div>
    </div>`;
    element.querySelector('.temp').replaceWith(btn);
  return element;
}
/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
