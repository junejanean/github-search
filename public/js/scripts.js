// let module = require('./suggestions.js');
// let suggestions = module.suggestions;

// base API url variable to be used for different API calls
const API_BASE = "https://api.github.com/";

// search variables
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// autopopulate variables
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");

keyboardTrigger();

//if user press any key and releases
function keyboardTrigger() {
    inputBox.onkeyup = (e) => {
        let userData = e.target.value; //user entered data
        let emptyArray = [];
        if (userData) {
            emptyArray = suggestions.filter((data) => {
                // filtering array value and user char to lowercase and return only the value
                //which starts with user entered word.
                return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());  
            });
            emptyArray = emptyArray.map((data) => {
            return data = "<li><div>" + data + "</div></li>";
        });
        showSuggestions(emptyArray);
        searchWrapper.classList.add("active"); //show autocomplete box
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attitute to all li tags
                allList[i].setAttribute("onClick", "select(this)");
        }
        } else {
            searchWrapper.classList.remove("active"); // hide autocomplete box
        }
    }
}

// Populate's autocomplete box by writing HTML
const showSuggestions = list => {
    let listData;
    if(!list.length) {
        userValue = inputBox.value;
        listData = "<li><div>" + userValue + "</div></li>";
    } else {
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

// select suggestion in autocomplete box
const select = element => {
    let selectUserData = element.textContent;
    console.log(selectUserData);
    inputBox.value = selectUserData; //passing user selected list item in textfield
    
    searchWrapper.classList.remove("active"); // hide autocomplete box
}

// async await call function for gitHub API for usernames
const getUser = async (username) => {
    const resp = await fetch(API_BASE + "users/" + username);
    const respData = await resp.json();
    createUserCard(respData);
    getRepos(username);
}

// another async await call function for gitHub API for repos of selected username
const getRepos = async (username) => {
    const resp = await fetch(API_BASE + "users/" + username + "/repos");
    const respData = await resp.json();
    addReposToCard(respData);
}

// writes HTML for each repo in an <a> tag using the forEach() array method, looping through each repo
const addReposToCard = (repos) => {
    const reposElement = document.getElementById("repos");
    repos.forEach((repo) => {
        console.log(repo);
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;
        reposElement.appendChild(repoEl);
    })
}

// writes HTML for gitHub user information in div's and li's into the #main div
const createUserCard = (user) => {
    const cardHTML =
    `<div class="card">
             <div>
                <a href="${user.html_url}" target="_blank"><img class="avatar" src="${user.avatar_url}" /></a>
           </div>
             <div class="user-info">
                  <h2>${user.name}</h2>
                  <h5>${user.login}</h5>
                  <p>${user.bio}</p>
                  <ul class="info">
                     <li>Followers: ${user.followers}</li>
                     <li>Following: ${user.following}</li>
                     <li>Repos: ${user.public_repos}</li>
                     <li>Location: ${user.location}</li>
                     <li>Twitter: <a href='https://twitter.com/${user.twitter_username}' target='_blank'> @${user.twitter_username}</a></li>
                  </ul>
                  <div id="repos"></div>
             </div>
         </div>
    `;
    main.innerHTML = cardHTML;
}

// listening event for when user hits submit and calls the function getUser() to populate #main
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user);
        search.value = "";
    }
    searchWrapper.classList.remove("active"); // hide autocomplete box

});