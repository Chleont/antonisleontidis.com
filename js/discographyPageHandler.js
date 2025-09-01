function updateDiscographyPage(list) {
    list.map(each => {
        let description = '';
        each.description.map(text => { description += `<p class='album-description'>${text}</p>`; });
        let contributors = '';
        each.contributors.map(contributor => { contributors += `<div class='album-contributor'><b class='contributor-role'>${contributor.jobDone}</b>: <span class='contributor-name'>${contributor.name}</span></div>`; });
        let tracks = '';
        if (each.tracks) {
            each.tracks.map(track => {
                tracks += `<a class='album-track' target='_blank' href='${track.link}'><b>${track.title}</b></a>`;
            });
        }
        let youtube = '';
        let spotify = '';
        if (each.youtube && each.youtube != null) {
            youtube = `<a href=${each.youtube} target="_blank" class="social-youtube"><span
                class="ti-youtube"></span></a>`;
        }
        if (each.spotify && each.spotify != null) {
            spotify = `<a href=${each.spotify} target="_blank"
                class="social-spotify"><span class="bi-spotify"></span></a>`;
        }
        document.getElementById(each.id).innerHTML =
            `<div class='album-title'>${each.title}</div>
            <div class='album-date'>${each.date}</div>
            <div class='album-description'>${description}</div>
            <div class='album-contributors'>${contributors}</div>
            <div class='album-tracks'>${tracks}</div>
            `;
    });
}

fetch('../discography.json').then(response => response.json())
    .then(data => {
        updateDiscographyPage(Object.values(data['en']));
        window.addEventListener('localeChange', e => {
            updateDiscographyPage(Object.values(data[e.detail]));
        });
    });


