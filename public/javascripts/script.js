let episodes = [];

function toggleDisplay(tabId) {
    var tab = document.getElementById(tabId);
    if (tab.style.display == "none") {
        tab.style.display = "";
    } else if (tab.style.display == "") {
        tab.style.display = "none";
    }
}

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

document.addEventListener("DOMContentLoaded", function () {
    axios
        .get("http://localhost:3000/api/episodes")
        .then(function (response) {
            episodes = response.data;
            appendEpisodes(episodes);
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

    // Update --viewportHeight value
    document.documentElement.style.setProperty("--viewportHeight", height);
}

const dateformat = (date) => {
    let newdate = new Date(date)
    let datetostring = `${newdate.getDate()}/${newdate.getMonth()}/${newdate.getFullYear()}`
    return datetostring
}

const dateyear = (date) => {
    let newdate = new Date(date)
    let datetostring = `${newdate.getFullYear()}`
    return datetostring
}

function createEpisodeItem(episode, css) {

    let n = (3*(episode.episode_number-1))+1

    return`

    <div class="blog-card">

        <input type="radio" name="select${n}" id="tap-${n}" checked>
        <input type="radio" name="select${n}" id="tap-${n+1}">
        <input type="radio" name="select${n}" id="tap-${n+2}">
        <input type="checkbox" id="imgTap">

        <div class="sliders">
            <label for="tap-${n}" class="tap tap-${n}"></label>
            <label for="tap-${n+1}" class="tap tap-${n+1}"></label>
            <label for="tap-${n+2}" class="tap tap-${n+2}"></label>
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
                <div class="content content-${n+1}" style="width: 100%;">
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
                    <div class="content content-${n+2}">
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

// 

{/* <h2>${episode.title}</h2>
<p>Characters involved</p> */}

                        {/* <div class="inner-part">
                            <label for="imgTap" class="img">
                                <img class="img-3" src="https://1.bp.blogspot.com/-DI07JFSzcmA/XzzU8sIcjxI/AAAAAAAAAQg/YV0moinU2pE0TnADOEx2CBFyw51-IkkZgCLcBGAsYHQ/s0/Cara%2BMembuat%2BPush%2BNotifications%2Bdi%2BBlog%2Bdengan%2BOneSignal.png">
                            </label>
                            <div class="content content-3">
                                <span>26 December 2019</span>
                                <div class="title">
                                    Lorem Ipsum Dolor</div>
                                <div class="text">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod excepturi nemo commodi sint eum ipsam odit atque aliquam officia impedit.</div>
                                <button>Read more</button>
                            </div>
                        </div> */}

                        function createEpisodeItem2(episode, css) {

                            let n = (3*(episode.episode_number-1))+1

    return `

                        <div class="blog-card">
                    
                            <input type="radio" name="select${n}" id="tap-${n}" checked>
                            <input type="radio" name="select${n}" id="tap-${n+1}">
                            <input type="radio" name="select${n}" id="tap-${n+2}">
                            <input type="checkbox" id="imgTap">
                    
                            <div class="sliders">
                                <label for="tap-${n}" class="tap tap-${n}"></label>
                                <label for="tap-${n+1}" class="tap tap-${n+1}"></label>
                                <label for="tap-${n+2}" class="tap tap-${n+2}"></label>
                            </div>
                    
                            <div class="inner-part">
                                <div class='${css}'>
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
                                <div class='card_left'>
                                    <label for="imgTap" class="img">
                                        <img class="img-${n}" src='${episode.imgurl[0]}'>
                                    </label>
                                </div>
                            </div>
                    
                            <div class="inner-part">
            <div class='${css}'>
                <div class="content content-${n+1}" style="width: 100%;">
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
                    <div class="content content-${n+2}">
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

                        function appendEpisodes(episodes) {
    const episodesEl = document.querySelector(".viewport .scene3D");
                        let episodesNodes = [];

                        for (episode of episodes) {
                            let index = episodes.indexOf(episode);
        //                 if (index % 2 == 0) {
        //                     // if even as it is
        //                     let css = "card";
        //                 episodesNodes.push(createEpisodeItem2(episode, css));
        // } else {
                            let css = "card_inverted";
                        episodesNodes.push(createEpisodeItem(episode, css));
        }
    // }

                        episodesEl.innerHTML = episodesNodes.join(" ");
}


