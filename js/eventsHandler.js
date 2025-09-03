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
    let element = '';
    list.map(each => {
        if (isTodayOrFuture(each.date)) {
            element =
                `<div class='event-container'>
            <div class='event-title'>${each.title}</div>
            <div class='event-date'>${each.date}</div>
            </div>`+ element;
        }
    });
    if (element.length > 0) {
        document.getElementById('events-container').innerHTML = element;
    } else {
        let shortList = list.slice(list.length - 3);
        shortList.map(each => {
            element =
                `<div class='event-container'>
                <div class='event-title'>${each.title}</div>
                <div class='event-date'>${each.date}</div>
                </div>`+ element;
        });
        document.getElementById('events-container').innerHTML = element;
    }
}


// Set default language
let userLangEvents = sessionStorage.getItem('preferredLanguage');
if (!userLangEvents) {
    userLangEvents = navigator.language || navigator.userLangEventsuage;
}
if (userLangEvents.startsWith('fr')) {
    userLangEvents = 'fr';
} else if (userLangEvents.startsWith('el')) {
    userLangEvents = 'el';
} else {
    userLangEvents = 'en';
};

fetch('../events.json').then(response => response.json())
    .then(data => {
        updateEventsPage(Object.values(data[userLangEvents]));
        window.addEventListener('localeChange', e => {
            updateEventsPage(Object.values(data[e.detail]));
        });
    });


