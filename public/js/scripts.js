const API_URL = "https://api.github/users";

console.log('working');
// search
const main = document.getElementById("main");
const form = document.getElementById("form");

// autopopulate
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");

//if user press any key and release
inputBox.onkeyup = (e) => {
    let userData = e.target.value; //user entered data
    let emptyArray = [];
    if (userData) {
        emptyArray = suggestions.filter((data) => {
            // filtering array value nad user char to lowercaaase and return only those word
            //which startss with user entered word.
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
           
        });
       emptyArray = emptyArray.map((data) => {
           return data = "<li><div>" + data + "</div></li>";
       });
       console.log(emptyArray);
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

function select(element) {
    let selectUserData = element.textContent;
    console.log(selectUserData);
    inputBox.value = selectUserData; //passing user selected list item in textfield
    searchWrapper.classList.remove("active"); // hide autocomplete box
}

function showSuggestions(list) {
    let listData;
    if(!list.length) {
        userValue = inputBox.value;
        listData = "<li><div>" + userValue + "</div></li>";

    } else {
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}


form.addEventListener('submit', function(e) {
    e.preventDefault();

    let search = document.getElementById("search").value;

    let originalName = search.split(' ').join('');
    alert(originalName);

    fetch("https://api.github.com/users/"+originalName)
    .then((result) => result.json())
    .then((data) => {
       console.log(data);

       main.innerHTML = 
       `<div class="card">
            <div>
                <a href="${data.html_url}" target="_blank"><img class="avatar" src="${data.avatar_url}" /></a>
            </div>
            <div class="user-info">
                 <h2>${data.name}</h2>
                 <h5>${data.login}</h5>
                 <p>${data.bio}</p>
                 <ul class="info">
                    <li>Followers: ${data.followers}</li>
                    <li>Following: ${data.following}</li>
                    <li>Repos: ${data.public_repos}</li>
                    <li>Location: ${data.location}</li>
                    <li>Twitter: <a href='https://twitter.com/${data.twitter_username}' target='_blank'> @${data.twitter_username}</a></li>
                 </ul>
            </div>
        </div>`
    })
})


// getUser("junejanean");

// async function getUser(username) {
//     const resp = await fetch(API_URL + username);
//     const respData = await resp.json();

//     createUserCard(respData);
// }

function getRepos(data) {
    alert("createUserCard is ON");
    const cardHTML =
     `<div class="card">
          <div>
            <img class="avatar" src="${data.avatar_url}" alt="${data.name}" />
          </div>
          <div class="user-info">
              <h2>${data.name}</h2>
              <h3>${data.login}</h3>
              <p>${data.bio}</p>
          </div>
      </div>`
      

      main.innerHTML = cardHTML;
}