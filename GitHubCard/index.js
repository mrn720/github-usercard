import axios from 'axios'

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/mrn720')
.then(res => console.log(res))
.catch(err => console.log(err, 'Oh noooo'))

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

function githubCardMaker(axiosData) {
  const cardDiv = document.createElement('div')
  cardDiv.classList.add('card')

  const githubImg = document.createElement('img')
  cardDiv.appendChild(githubImg)
  githubImg.src = `${axiosData.avatar_url}`

  const infoDiv = document.createElement('div')
  cardDiv.appendChild(infoDiv)
  infoDiv.classList.add('card-info')

  const name = document.createElement('h3')
  name.classList.add('name')
  infoDiv.appendChild(name)
  name.textContent = `${axiosData.name}`

  const userName = document.createElement('p')
  userName.classList.add('username')
  infoDiv.appendChild(userName)
  userName.textContent = `${axiosData.login}`

  const location = document.createElement('p')
  infoDiv.appendChild(location)
  location.textContent = `Location: ${axiosData.location}`

  const profile = document.createElement('p')
  infoDiv.appendChild(profile)

  const userLink = document.createElement('a')
  profile.appendChild(userLink)
  userLink.href = `${axiosData.html_url}`
  userLink.textContent = `URL: ${axiosData.html_url}`

  const followers = document.createElement('p')
  infoDiv.appendChild(followers)
  followers.textContent = `Followers: ${axiosData.followers}`

  const following = document.createElement('p')
  infoDiv.appendChild(following)
  following.textContent = `Following: ${axiosData.following}`

  const bio = document.createElement('p')
  infoDiv.appendChild(bio)
  bio.textContent = `Bio: ${axiosData.bio}`

  return cardDiv
}

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
  const mainDiv = document.querySelector('div.cards')

  axios.get('https://api.github.com/users/mrn720')
  .then(res => {
    const myCard = githubCardMaker(res.data)
    mainDiv.appendChild(myCard)
  })
  .catch(err => {err, console.log(err)})
  

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

followersArray.forEach((follower) => {axios.get(`https://api.github.com/users/${follower}`)
.then(res => {
  const userCard = githubCardMaker(res.data)
  mainDiv.appendChild(userCard)
})
.catch(err => {err, console.log(err)})})

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

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

axios.get('https://api.github.com/users/mrn720').then(res => axios.get(`${res.data.followers_url}`).then(data1 => {
  const myFollowerArray = data1.data
  myFollowerArray.forEach((follower) => {axios.get(`${follower.url}`)
  .then(res => {
    const userCard = githubCardMaker(res.data)
    mainDiv.appendChild(userCard)
  })
  .catch(err => {err, console.log(err)})})
}))