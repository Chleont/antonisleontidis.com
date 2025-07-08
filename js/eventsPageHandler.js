function isTodayOrFuture(dateStr) {
    if (dateStr) {
        // Split the input string "dd/mm/yyyy"
        const [day, month, year] = dateStr.split('/').map(Number);

        // Create a Date object from the input (set to midnight)
        const inputDate = new Date(year, month - 1, day);
        inputDate.setHours(0, 0, 0, 0); // Normalize time to midnight

        // Get today's date and normalize it to midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Compare dates
        return inputDate >= today;
    } else {
        return false;
    }

}


function updateEventsPage(list) {
    let upComingEventsElement = '';
    let pastEventsElement = '';
    list.map(each => {
        if (isTodayOrFuture(each.date)) {
            upComingEventsElement =
                `<div class='event-container'>
            <div class='event-title'>${each.title}</div>
            <div class='event-date'>${each.date}</div>
            </div>` + upComingEventsElement;
        } else {
            pastEventsElement =
                `<div class='event-container'>
            <div class='event-title'>${each.title}</div>
            <div class='event-date'>${each.date}</div>
            </div>` + pastEventsElement;
        }
    });
    if (upComingEventsElement.length > 0) {
        document.getElementById('upcoming-events-container').innerHTML = upComingEventsElement;
    }
    document.getElementById('past-events-container').innerHTML = pastEventsElement;
}


fetch('../events.json').then(response => response.json())
    .then(data => {
        updateEventsPage(Object.values(data['en']));
        window.addEventListener('localeChange', e => {
            updateEventsPage(Object.values(data[e.detail]));
        });
    });


