//////////////////////// //3D Scene methods// ////////////////////////////

// Global variable array that stores response.data from Axios (see below)
let episodes = [];
// Reversed episodes array to reverse default card order (=> back to front)
let episodesReversed = [];

const perspectiveOrigin = {
    x: parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
            "--scenePerspectiveOriginX"
        )
    ),
    y: parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
            "--scenePerspectiveOriginY"
        )
    ),
    maxGap: 10,
};

// Pull data for cards from api/database using Axios and set up 3D viewport
document.addEventListener("DOMContentLoaded", function () {
    axios
        // Swap below .get statements to pull from api instead of DB
        // .get("https://buffy-the-vampire-slayer-api.herokuapp.com/episode")
        .get("http://localhost:3000/api/episodes")
        .then(function (response) {
            episodes = response.data;
            episodesReversed = episodes.reverse();
            appendEpisodes(episodesReversed);
            window.addEventListener("scroll", moveCamera);
            window.addEventListener("mousemove", moveCameraAngle);
            setSceneHeight();
        })
        .catch(function (error) {
            console.log(error);
        });
});

function moveCameraAngle(event) {
    const xGap =
        (((event.clientX - window.innerWidth / 2) * 100) /
            (window.innerWidth / 2)) *
        -1;
    const yGap =
        (((event.clientY - window.innerHeight / 2) * 100) /
            (window.innerHeight / 2)) *
        -1;
    const newPerspectiveOriginX =
        perspectiveOrigin.x + (xGap * perspectiveOrigin.maxGap) / 100;
    const newPerspectiveOriginY =
        perspectiveOrigin.y + (yGap * perspectiveOrigin.maxGap) / 100;

    document.documentElement.style.setProperty(
        "--scenePerspectiveOriginX",
        newPerspectiveOriginX
    );
    document.documentElement.style.setProperty(
        "--scenePerspectiveOriginY",
        newPerspectiveOriginY
    );
}

function moveCamera() {
    document.documentElement.style.setProperty("--cameraZ", window.pageYOffset);
}

function setSceneHeight() {
    const numberOfItems = episodes.length; // Or number of items you have in `.scene3D`
    const itemZ = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--itemZ")
    );
    const scenePerspective = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
            "--scenePerspective"
        )
    );
    const cameraSpeed = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--cameraSpeed")
    );
    const height =
        window.innerHeight +
        scenePerspective * cameraSpeed +
        itemZ * cameraSpeed * numberOfItems;
    document.documentElement.style.setProperty("--viewportHeight", height);
}

const dateformat = (date) => {
    let newdate = new Date(date);
    let datetostring = `${newdate.getDate()}/${newdate.getMonth()}/${newdate.getFullYear()}`;
    return datetostring;
};

const dateyear = (date) => {
    let newdate = new Date(date);
    let datetostring = `${newdate.getFullYear()}`;
    return datetostring;
};

function createEpisodeItem(episode, id, css) {

    let n = (3*(episode.episode_number-1))+1
    // let n = (3*(id));
    // let n = id;

    return `
        <div class="blog-card" id="${id}">

        <input type="radio" name="select${n}" id="tap-${n}" checked>
        <input type="radio" name="select${n}" id="tap-${n + 1}">
        <input type="radio" name="select${n}" id="tap-${n + 2}">
        <input type="checkbox" id="imgTap">

        <div class="sliders">
            <label for="tap-${n}" class="tap tap-${n}"></label>
            <label for="tap-${n + 1}" class="tap tap-${n + 1}"></label>
            <label for="tap-${n + 2}" class="tap tap-${n + 2}"></label>
        </div>

        <div class="inner-part">
            <div class='${css}'>
                <div class='card_left'>
                    <label for="imgTap" class="img">
                        <img class="img-${n}" src='${episode.imgurl[0]}'>
                    </label>
                </div>
                <div class='card_right'>
                    <div class="content content-${n}">
                        <h2>${episode.title}</h2>
                        <div class='card_right__details'>
                            <ul>
                                <li><b>Season:</b> ${episode.season}</li>
                                <li><b>Episode:</b> ${episode.episode_number}</li>
                            </ul>
                            <ul>
                                <li><b>Air date:</b> ${dateformat(episode.air_date)}</li>
                                <li><b>Lore year:</b> ${dateyear(episode.lore_year)}</li>
                            </ul>
                            <ul>
                                <li><b>Director:</b> ${episode.director}</li>
                            </ul>
                            <ul>
                                <li><b>Writers:</b> ${episode.writers}</li>
                            </ul>
                        <div class='card_right__review'>
                            <p><b>Synopsis:</b> ${episode.plot}</p>
                            <a href='${episode.imdb_url}' target='_blank'>Read more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="inner-part">
            <div class='${css}'>
                <div class="content content-${n + 1}" style="width: 100%;">
                    <div class="chartitle">
                        <h2>Main cast starring:</h2>
                    </div>
                    <div class='characterscontainer'>
                        <img class="charimg" src='https://www.wonderwall.com/wp-content/uploads/sites/2/2021/02/shutterstock_editorial_5884304r.jpg?h=800'>
                        <img class="charimg" src='https://static.displate.com/857x1200/displate/2021-07-01/216e8525ac06fe26794873766ec39c7b_b5d0db53814e3058f516f471608b4598.jpg'>
                        <img class="charimg" src='https://i.pinimg.com/originals/c8/4b/3e/c84b3e85d52475b50f126a998ea1e855.jpg'>
                        <img class="charimg" src='https://i.pinimg.com/736x/8c/bc/73/8cbc73686a4f84bd45a89b0a20e0ad0c.jpg'>
                        <img class="charimg" src='https://static.wikia.nocookie.net/buffy/images/5/52/Giles-S1-03.jpg'>
                    </div>
                </div>
            </div>
        </div>

        <div class="inner-part">
            <div class='${css}'>
                <div class='triviainfo'>
                    <div class="content content-${n + 2}">
                            <div class='card_right__details'>
                                <div class='card_right__review'>
                                    <h2 class="thirdslide">${episode.title}</h2>
                                    <div class='thirdcardinfo'>
                                        <p><b>Quote:</b> ${episode.quote}</p>
                                        <p><b>Trivia:</b> ${episode.trivia}</p>
                                        <p><b>Last updated:</b> ${dateformat(episode.updatedAt)}</p>
                                        <a href='${episode.imdb_url}' target='_blank'>Read more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    `;
}

// Create a "card" element (appears on right)
function createEpisodeItem2(episode, id, css) {
  return `
        <div id='${id}' class='${css}'>
            <div class='card_right'>
                <h2>${episode.title}</h2>
                <h2>${id}</h2>
                <div class='card_right__details'>
                    <ul>
                        <li><b>Season:</b> ${episode.season}</li>
                        <li><b>Episode:</b> ${episode.episode_number}</li>
                    </ul>
                    <ul>
                        <li><b>Air date:</b> ${episode.air_date}</li>
                    </ul>
                    <div class='card_right__review'>
                    <p><b>Sinopsis:</b> ${episode.plot}</p>
                        <a href='${episode.imdb_url}' target='_blank'>Read more</a>
                    </div>
                </div>
            </div>
            <div class='card_left'>
                <img src='${episode.imgurl}'>
            </div>
        </div>
    `;
}

function appendEpisodes(episodes) {
    const episodesEl = document.querySelector(".viewport .scene3D");
    let episodesNodes = [];
    for (episode of episodes) {
        let index = episodesReversed.length - episodesReversed.indexOf(episode);
        let itemZ = (episodesReversed.indexOf(episode) + 1) * 300;
        // if (index % 2 == 0) {
        //   // even numbered index card creates card
        // let css = "card";
        //   let id = itemZ;
        //   episodesNodes.push(createEpisodeItem2(episode, id, css));
        // } else {
          // odd numbered index card creates card_inverted
          let css = "card_inverted";
        let id = itemZ;
        episodesNodes.push(createEpisodeItem(episode, id, css));
        // }
    }
    episodesEl.innerHTML = episodesNodes.join(" ");
}

//////////////////////// //Zoompage UI methods// /////////////////////////

function toggleDisplay(tabId) {
    const tab = document.getElementById(tabId);
    if (tab.style.display == "none") {
        tab.style.display = "";
    } else if (tab.style.display == "") {
        tab.style.display = "none";
    }
}

function updateCardTitleBar() {
    const cardId = Math.round(scrollY / 300);
    const episode = episodes[cardId - 1];
    const title = document.getElementById("title");
    title.innerText = `S${episode.season}E${episode.episode_number}: ${episode.title
        }: ${episode.air_date.substring(0, 10)}`;
}

function scrollToFront() {
    window.scrollTo({
        top: 300,
        left: 0,
        behavior: "smooth",
    });
}

function scrollToBack() {
    window.scrollTo({
        top: 300 * episodes.length,
        left: 0,
        behavior: "smooth",
    });
}

function scrollUp() {
    window.scrollTo({
        top: Math.round((scrollY + 300) / 300) * 300,
        left: 0,
        behavior: "smooth",
    });
}

function scrollDown() {
    window.scrollTo({
        top: Math.round((scrollY - 300) / 300) * 300,
        left: 0,
        behavior: "smooth",
    });
}

function scrollForwardSeason() {
    if (scrollY > 39900) {
        window.scrollTo({
            top: 39900,
            left: 0,
            behavior: "smooth",
        });
    } else if (scrollY > 33300) {
        window.scrollTo({
            top: 33300,
            left: 0,
            behavior: "smooth",
        });
    } else if (scrollY > 26700) {
        window.scrollTo({
            top: 26700,
            left: 0,
            behavior: "smooth",
        });
    } else if (scrollY > 20100) {
        window.scrollTo({
            top: 20100,
            left: 0,
            behavior: "smooth",
        });
    } else if (scrollY > 13500) {
        window.scrollTo({
            top: 13500,
            left: 0,
            behavior: "smooth",
        });
    } else if (scrollY > 6600) {
        window.scrollTo({
            top: 6600,
            left: 0,
            behavior: "smooth",
        });
    } else if (scrollY <= 6600) {
        window.scrollTo({
            top: 300,
            left: 0,
            behavior: "smooth",
        });
    }
}

function scrollBackSeason() {
    if (scrollY < 6600) {
        window.scrollTo({
            top: 6600,
            left: 0,
            behavior: "smooth",
        });
    } else if (scrollY < 13500) {
        window.scrollTo({
            top: 13500,
            left: 0,
            behavior: "smooth",
        });
    } else if (scrollY < 20100) {
        window.scrollTo({
            top: 20100,
            left: 0,
            behavior: "smooth",
        });
    } else if (scrollY < 26700) {
        window.scrollTo({
            top: 26700,
            left: 0,
            behavior: "smooth",
        });
    } else if (scrollY < 33300) {
        window.scrollTo({
            top: 33300,
            left: 0,
            behavior: "smooth",
        });
    } else if (scrollY < 39900) {
        window.scrollTo({
            top: 39900,
            left: 0,
            behavior: "smooth",
        });
    } else if (scrollY < 43500) {
        window.scrollTo({
            top: 43500,
            left: 0,
            behavior: "smooth",
        });
    }
}

// Autoscroll start
function pageScrollBy() {
    window.scrollBy(0, -1);
    scrolldelay = setTimeout(pageScrollBy, 10);
}

//Autoscroll stop
function stopScrollBy() {
    clearTimeout(scrolldelay);
}

// Add keyboard shortcuts to this method
function keyShortcut(event) {
    if (event.code === "ArrowRight") {
        scrollDown();
    } else if (event.code === "ArrowLeft") {
        scrollUp();
    } else if (event.code === "Minus") {
        scrollToBack();
    } else if (event.code === "Equal") {
        scrollToFront();
    } else if (event.code === "BracketLeft") {
        scrollBackSeason();
    } else if (event.code === "BracketRight") {
        scrollForwardSeason();
    } else if (event.code === "Comma") {
        pageScrollBy();
    } else if (event.code === "Period") {
        stopScrollBy();
    } else if (event.code === "KeyM") {
        toggleDisplay("dropdown");
    } else if (event.code === "KeyN") {
        toggleDisplay("navbuttons");
    }
}

// Hides card elements that are out of view to prevent page slowdown when zooming out
function cullDistantCards() {
    const allCards = document.getElementById("scene3D").children;
    for (let i = 0; i < allCards.length; i++) {
        if (parseInt(allCards[i].id, 10) - scrollY > 0) {
            if (parseInt(allCards[i].id, 10) - scrollY > 25 * 300) {
                allCards[i].style.display = "none";
            } else {
                allCards[i].style.display = "";
            }
        }
    }
}

{
    /* <h2 class = "eventtitle">${episode.title}</h2>
                <div>
                    <p><b>Episode:</b> ${episode.episode_number} <b>Season:</b> ${episode.season}</p>
                    <p><b>Air date:</b> ${episode.air_date}</p>
                    <p><b>Director:</b> ${episode.director}</p>
                    <p><b>Writers:</b> ${episode.writers}</p>
                    <p><b>Sinopsis:</b> ${episode.plot}</p>
                    <p><a href = ${episode.imdb_url} target = new >Follow this link for IMDB info</a></p>
                </div> */
}

{
    /*
        <div class='card_right__rating'>
        <div class='card_right__rating__stars'>
        </div>
      </div>
         <fieldset class='rating'>
                <input id='star10' name='rating' type='radio' value='10'>
                <label class='full' for='star10' title='10 stars'></label>
                <input id='star9half' name='rating' type='radio' value='9 and a half'>
                <label class='half' for='star9half' title='9.5 stars'></label>
                <input id='star9' name='rating' type='radio' value='9'>
                <label class='full' for='star9' title='9 stars'></label>
                <input id='star8half' name='rating' type='radio' value='8 and a half'>
                <label class='half' for='star8half' title='8.5 stars'></label>
                <input id='star8' name='rating' type='radio' value='8'>
                <label class='full' for='star8' title='8 stars'></label>
                <input id='star7half' name='rating' type='radio' value='7 and a half'>
                <label class='half' for='star7half' title='7.5 stars'></label>
                <input id='star7' name='rating' type='radio' value='7'>
                <label class='full' for='star7' title='7 stars'></label>
                <input id='star6half' name='rating' type='radio' value='6 and a half'>
                <label class='half' for='star6half' title='6.5 stars'></label>
                <input id='star6' name='rating' type='radio' value='6'>
                <label class='full' for='star6' title='6 star'></label>
                <input id='star5half' name='rating' type='radio' value='5 and a half'>
                <label class='half' for='star5half' title='5.5 stars'></label>
                <input id='star5' name='rating' type='radio' value='5'>
                <label class='full' for='star5' title='5 stars'></label>
                <input id='star4half' name='rating' type='radio' value='4 and a half'>
                <label class='half' for='star4half' title='4.5 stars'></label>
                <input id='star4' name='rating' type='radio' value='4'>
                <label class='full' for='star4' title='4 stars'></label>
                <input id='star3half' name='rating' type='radio' value='3 and a half'>
                <label class='half' for='star3half' title='3.5 stars'></label>
                <input id='star3' name='rating' type='radio' value='3'>
                <label class='full' for='star3' title='3 stars'></label>
                <input id='star2half' name='rating' type='radio' value='2 and a half'>
                <label class='half' for='star2half' title='2.5 stars'></label>
                <input id='star2' name='rating' type='radio' value='2'>
                <label class='full' for='star2' title='2 stars'></label>
                <input id='star1half' name='rating' type='radio' value='1 and a half'>
                <label class='half' for='star1half' title='1.5 stars'></label>
                <input id='star1' name='rating' type='radio' value='1'>
                <label class='full' for='star1' title='1 star'></label>
                <input id='starhalf' name='rating' type='radio' value='half'>
                <label class='half' for='starhalf' title='0.5 stars'></label>
              </fieldset> */
}
{
    /* <div class='card_right__button'>
    <a href='https://www.youtube.com/watch?v=ot6C1ZKyiME' target='_blank'>WATCH TRAILER</a>
    </div> */
}

// function appendEpisodes(episodes) {
//     const episodesEl = document.querySelector(".viewport .scene3D");
//     let episodesNodes = [];

//     for (episode of episodes) {
//         let index = episodes.indexOf(episode);
//         if (index % 2 == 0) {
//             // if even as it is
//             let css = "card";
//             episodesNodes.push(createEpisodeItem2(episode, css));
//         } else {
//             let css = "card_inverted";
//             episodesNodes.push(createEpisodeItem(episode, css));
//         }
//     }

//     episodesEl.innerHTML = episodesNodes.join(" ");
// }
