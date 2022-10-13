let episodes = [];
let episodesReversed = [];

function toggleDisplay(tabId) {
    var tab = document.getElementById(tabId);
    if (tab.style.display == "none") {
        tab.style.display = "";
    } else if (tab.style.display == "") {
        tab.style.display = "none";
    }
};

function updateCardTitleBar() {
    var cardId = Math.round(scrollY / 300);
    var episode = episodes[cardId - 1];
    var title = document.getElementById("title");
    title.innerText = `S${episode.season}E${episode.episode_number}: ${episode.title} - ${episode.air_date}`;
}

function centreCard() {
    var cardId = Math.round(scrollY / 300);
    var episode = episodes[cardId - 1];
    var currentCard = document.getElementById(cardId.toString);
    currentCard.style.transform = "translateX(-50%)";
}

function scrollToNextCard() {
    window.scrollTo(0, Math.round(window.scrollY/300) * 300);
};

function scrollToFront() {
    window.scrollTo({
        top: 300,
        left: 0,
        behavior: 'smooth'
    });
};

function scrollToBack() {
    window.scrollTo({
        top: (300 * episodes.length),
        left: 0,
        behavior: 'smooth'
    });
};

function scrollTest() {
    window.scrollTo({
        top: (parseInt(episodes[102].title, 10)),
        left: 0,
        behavior: 'smooth'
    });
    let test = document.getElementById("test");
    test.innerText = episodes[100].title;
};

function scrollUp() {
    window.scrollTo({
        top: (Math.round((scrollY + 300) / 300)) * 300,
        left: 0,
        behavior: 'smooth'
    });
};

function scrollDown() {
    window.scrollTo({
        top: (Math.round((scrollY - 300) / 300)) * 300,
        left: 0,
        behavior: 'smooth'
    });
};

function scrollForwardSeason(){
    if (scrollY > 39900) {
        window.scrollTo({
            top: 39900,
            left: 0,
            behavior: 'smooth'
        });
    } else if (scrollY > 33300) {
        window.scrollTo({
            top: 33300,
            left: 0,
            behavior: 'smooth'
        });
    } else if (scrollY > 26700) {
        window.scrollTo({
            top: 26700,
            left: 0,
            behavior: 'smooth'
        });
    } else if (scrollY > 20100) {
        window.scrollTo({
            top: 20100,
            left: 0,
            behavior: 'smooth'
        });
    } else if (scrollY > 13500) {
        window.scrollTo({
            top: 13500,
            left: 0,
            behavior: 'smooth'
        });
    } else if (scrollY > 6600) {
        window.scrollTo({
            top: 6600,
            left: 0,
            behavior: 'smooth'
        });
    } else if (scrollY <= 6600) {
        window.scrollTo({
            top: 300,
            left: 0,
            behavior: 'smooth'
        });
    }
};

function scrollBackSeason(){
    if (scrollY < 6600) {
        window.scrollTo({
            top: 6600,
            left: 0,
            behavior: 'smooth'
        });
    } else if (scrollY < 13500) {
        window.scrollTo({
            top: 13500,
            left: 0,
            behavior: 'smooth'
        });
    } else if (scrollY < 20100) {
        window.scrollTo({
            top: 20100,
            left: 0,
            behavior: 'smooth'
        });
    } else if (scrollY < 26700) {
        window.scrollTo({
            top: 26700,
            left: 0,
            behavior: 'smooth'
        });
    } else if (scrollY < 33300) {
        window.scrollTo({
            top: 33300,
            left: 0,
            behavior: 'smooth'
        });
    } else if (scrollY < 39900) {
        window.scrollTo({
            top: 39900,
            left: 0,
            behavior: 'smooth'
        });
    } else if (scrollY < 43500) {
        window.scrollTo({
            top: 43500,
            left: 0,
            behavior: 'smooth'
        });
    }
};

function pageScrollBy() {
    window.scrollBy(0,-1);
    scrolldelay = setTimeout(pageScrollBy, 10)
};

function stopScrollBy() {
    clearTimeout(scrolldelay)
};

function arrowKeyScroll(event) {
    if (event.code === 'ArrowRight') {
        scrollDown();
    } else if (event.code === 'ArrowLeft') {
        scrollUp();
    }
};

function cullDistantCards() {
    const allCards = document.getElementById("scene3D").children;
    for (let i = 0; i < allCards.length; i++) {
    // allCards.forEach(card => {
        if ((parseInt(allCards[i].id, 10) - scrollY) > 0) {
            if ((parseInt(allCards[i].id, 10) - scrollY) > (25 * 300)) {
                allCards[i].style.display = "none";
            } else {
                allCards[i].style.display = "";
            }
        } 
    }
};

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
    maxGap: 10
};

document.addEventListener("DOMContentLoaded", function () {
    axios
        // .get("https://buffy-the-vampire-slayer-api.herokuapp.com/episode/season/1")
        .get("https://buffy-the-vampire-slayer-api.herokuapp.com/episode")
        .then(function (response) {
            episodes = response.data;
            episodesReversed = episodes.reverse();
            appendEpisodes(episodesReversed);
            window.addEventListener("scroll", moveCamera);
            // var scene = document.getElementById("scene3D");
            // scene.addEventListener("scroll", moveCamera);
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

    // const height =
    //     300 * episodes.length + 498;

    // Update --viewportHeight value
    document.documentElement.style.setProperty("--viewportHeight", height);
}

function createEpisodeItem(episode, id, css) {
    return `
        <div id='${id}' class='${css}'>
            <div class='card_left'>
                <img src='https://images.justwatch.com/poster/257479052/s332/season-3'>
            </div>
            <div class='card_right'>
                <h2>${episode.title}</h2>
                <div class='card_right__details'>
                    <ul>
                        <li><b>Episode:</b> ${episode.episode_number}</li>
                        <li><b>Season:</b> ${episode.season}</li>
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
        </div>
    `;
}

function createEpisodeItem2(episode, id, css) {
    return `
        <div id='${id}' class='${css}'>
            <div class='card_right'>
                <h2>${episode.title}</h2>
                <div class='card_right__details'>
                    <ul>
                        <li><b>Episode:</b> ${episode.episode_number}</li>
                        <li><b>Season:</b> ${episode.season}</li>
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
                <img src='https://m.media-amazon.com/images/M/MV5BY2MwOGIyZGYtNzgxZC00N2Q5LTllYjItM2U4MTkwMDBjYzUyXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_FMjpg_UX1000_.jpg'></a>
            </div>
        </div>
    `;
}

{/* <h2 class = "eventtitle">${episode.title}</h2>
            <div>
                <p><b>Episode:</b> ${episode.episode_number} <b>Season:</b> ${episode.season}</p>
                <p><b>Air date:</b> ${episode.air_date}</p>
                <p><b>Director:</b> ${episode.director}</p>
                <p><b>Writers:</b> ${episode.writers}</p>
                <p><b>Sinopsis:</b> ${episode.plot}</p>
                <p><a href = ${episode.imdb_url} target = new >Follow this link for IMDB info</a></p>
            </div> */}

{/*
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
          </fieldset> */}
{/* <div class='card_right__button'>
<a href='https://www.youtube.com/watch?v=ot6C1ZKyiME' target='_blank'>WATCH TRAILER</a>
</div> */}
// <p><b>Trivia:</b> ${episode.trivia}</p>

function appendEpisodes(episodes) {
    const episodesEl = document.querySelector(".viewport .scene3D");
    let episodesNodes = [];

    for (episode of episodes) {
        let index = episodesReversed.length - episodesReversed.indexOf(episode);
        let itemZ = (episodesReversed.indexOf(episode) + 1) * 300;
        if (index % 2 == 0) { // if even as it is
            let css = "card";
            let id = itemZ;
            episodesNodes.push(createEpisodeItem2(episode, id, css));
        } else {
            let css = "card_inverted";
            let id = itemZ;
            episodesNodes.push(createEpisodeItem(episode, id, css));
        }
        
    }

    episodesEl.innerHTML = episodesNodes.join(" ");
}