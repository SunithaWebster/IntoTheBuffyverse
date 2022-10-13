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

// Create a "card_inverted" element (appears on left)
function createEpisodeItem(episode, id, css) {
  return `
        <div id='${id}' class='${css}'>
            <div class='card_left'>
                <img src='${episode.imgurl[0]}'>
            </div>
            <div class='card_right'>
                <h2>${episode.title}</h2>
                <div class='card_right__details'>
                    <ul>
                        <li><b>Season:</b> ${episode.season}</li>
                        <li><b>Episode:</b> ${episode.episode_number}</li>
                    </ul>
                    <ul>
                        <li><b>Air date:</b> ${dateformat(
                          episode.air_date
                        )}</li>
                        <li><b>Lore year:</b> ${dateyear(
                          episode.lore_year
                        )}</li>
                    </ul>
                    <ul>
                        <li><b>Director:</b> ${episode.director}</li>
                    </ul>
                    <ul>
                        <li><b>Writers:</b> ${episode.writers}</li>
                    </ul>
                    <div class='card_right__review'>
                    <p><b>Synopsis:</b> ${episode.plot}</p>
                        <a href='${
                          episode.imdb_url
                        }' target='_blank'>Read more</a>
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
    if (index % 2 == 0) {
      // even numbered index card creates card
      let css = "card";
      let id = itemZ;
      episodesNodes.push(createEpisodeItem2(episode, id, css));
    } else {
      // odd numbered index card creates card_inverted
      let css = "card_inverted";
      let id = itemZ;
      episodesNodes.push(createEpisodeItem(episode, id, css));
    }
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
  title.innerText = `S${episode.season}E${episode.episode_number}: ${
    episode.title
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