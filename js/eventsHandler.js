function updateEventsPage(list) {
    let element = '';
    list.map(each => {
        if (each.displayInEvents) {
            element +=
                `<div class='event-container'>
            <div class='event-title'>${each.title}</div>
            <div class='event-date'>${each.date}</div>
            <div class='event-description'>${each.description}</div>
            </div>`;
        }
    });
    document.getElementById('events-container').innerHTML = element;
}


fetch('../events.json').then(response => response.json())
    .then(data => {
        console.log(data);
        updateEventsPage(Object.values(data['en']));
        window.addEventListener('localeChange', e => {
            updateEventsPage(Object.values(data[e.detail]));
        });
    });


