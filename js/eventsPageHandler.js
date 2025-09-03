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

function removeDay(dateStr) {
    // Split the date string by "/"
    const parts = dateStr.split("/");
    // Check if the format is correct
    if (parts.length !== 3) {
        throw new Error("Invalid date format. Use DD/MM/YYYY");
    }
    // Return MM/YYYY
    return `${parts[1]}/${parts[2]}`;
}

function updateEventsPage(list) {
    let upComingEventsElement = '';
    let pastEventsElement = '';
    list.map(each => {
        if (isTodayOrFuture(each.date)) {
            upComingEventsElement =
                `<div class='event-container'>
            <div class='event-date'>${each.date}</div>
            <div class='event-location'>${each.location}</div>
            <div class='event-title'>${each.title}</div>
            </div>` + upComingEventsElement;
        } else {
            pastEventsElement =
                `<div class='event-container'>
            <div class='event-date'>${removeDay(each.date)}</div>
            <div class='event-location'>${each.location}</div>
            <div class='event-title'>${each.title}</div>
            </div>` + pastEventsElement;
        }
    });
    if (upComingEventsElement.length > 0) {
        document.getElementById('upcoming-events-container').innerHTML = upComingEventsElement;
    }
    document.getElementById('past-events-container').innerHTML = pastEventsElement;
}

// Set default language
let userLangEventsPage = sessionStorage.getItem('preferredLanguage');
if (!userLangEventsPage) {
    userLangEventsPage = navigator.language || navigator.userLangEventsPageuage;
}
if (userLangEventsPage.startsWith('fr')) {
    userLangEventsPage = 'fr';
} else if (userLangEventsPage.startsWith('el')) {
    userLangEventsPage = 'el';
} else {
    userLangEventsPage = 'en';
};


fetch('../events.json').then(response => response.json())
    .then(data => {
        updateEventsPage(Object.values(data[userLangEventsPage]));
        window.addEventListener('localeChange', e => {
            updateEventsPage(Object.values(data[e.detail]));
        });
    });

