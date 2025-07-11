function updateDiscographyPage(list) {
    list.map(each => {
        let description = '';
        each.description.map(text => { description += `<p class='album-description'>${text}</p>`; });
        let contributors = '';
        each.contributors.map(contributor => { contributors += `<div class='album-contributor'><b class='contributor-role'>${contributor.jobDone}</b>: <span class='contributor-name'>${contributor.name}</span></div>`; });
        document.getElementById(each.id).innerHTML =
            `<div class='album-title'>${each.title}</div>
            <div class='album-date'>${each.date}</div>
            <div class='album-description'>${description}</div>
            <div class='album-contributors'>${contributors}</div>`;
    });
}


fetch('../discography.json').then(response => response.json())
    .then(data => {
        updateDiscographyPage(Object.values(data['en']));
        window.addEventListener('localeChange', e => {
            updateDiscographyPage(Object.values(data[e.detail]));
        });
    });


