let episodes = [];

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

        document.addEventListener("DOMContentLoaded", function() {
        axios
            .get("https://buffy-the-vampire-slayer-api.herokuapp.com/episode/season/1")
            .then(function(response) {
            episodes = response.data;
            appendEpisodes(episodes);
            window.addEventListener("scroll", moveCamera);
            window.addEventListener("mousemove", moveCameraAngle);
            setSceneHeight();
            })
            .catch(function(error) {
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

        function createEpisodeItem(episode) {
        return `<div>
            <h2 class = "eventtitle">${episode.title}</h2>
            <div>
                <p><b>Episode:</b> ${episode.episode_number} <b>Season:</b> ${episode.season}</p>
                <p><b>Air date:</b> ${episode.air_date}</p>
                <p><b>Director:</b> ${episode.director}</p>
                <p><b>Writers:</b> ${episode.writers}</p>
                <p><b>Sinopsis:</b> ${episode.plot}</p>
                <p><b>Trivia:</b> ${episode.trivia}</p>
                <p><b>Link to IMBD:</b> <a href = ${episode.imdb_url} target = new >${episode.imdb_url}</a></p>
            </div>
        </div>`;
        }

        function appendEpisodes(episodes) {
        const episodesEl = document.querySelector(".viewport .scene3D");
        let episodesNodes = [];

        for (episode of episodes) {
            episodesNodes.push(createEpisodeItem(episode));
        }

        episodesEl.innerHTML = episodesNodes.join(" ");
        }