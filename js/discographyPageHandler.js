function sortByYear(array) {
    return array.slice().sort((a, b) => a.date - b.date);
}


function updateDiscographyPage(list) {
    let sortedList = sortByYear(list);
    let elementsList = '';
    sortedList.map(each => {
        let description = '';
        each.description.map(text => { description += `<p class='album-description'>${text}</p>`; });
        let contributors = '';
        each.contributors.map(contributor => { contributors += `<p class='album-contributor'><span class='contributor-role'>${contributor.jobDone}</span>: <span class='contributor-name'>${contributor.name}</span></p>`; });
        elementsList =
            `<div class='event-container'>
            <div class='event-date'>${each.date}</div>
            <div class='event-title'>${each.title}</div>
            <div class='event-description'>${description}</div>
            <div class='event-contributors'>${contributors}</div>
            </div>` + elementsList;
    });
    document.getElementById('albums-container').innerHTML = elementsList;
}


fetch('../discography.json').then(response => response.json())
    .then(data => {
        updateDiscographyPage(Object.values(data['en']));
        window.addEventListener('localeChange', e => {
            updateDiscographyPage(Object.values(data[e.detail]));
        });
    });


