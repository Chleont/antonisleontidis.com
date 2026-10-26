
function parseEventDate(dateStr) {
    if (typeof dateStr !== 'string') return null;

    const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dateStr);
    if (!match) return null;

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);
    const date = new Date(year, month - 1, day);
    date.setFullYear(year);
    date.setHours(0, 0, 0, 0);

    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null;
    }

    return date;
}

function isTodayOrFuture(dateStr) {
    const eventDate = parseEventDate(dateStr);
    if (!eventDate) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return eventDate >= today;
}

function sortEventsByDate(events) {
    return [...events].sort((a, b) => {
        const aTime = parseEventDate(a.date)?.getTime() ?? -Infinity;
        const bTime = parseEventDate(b.date)?.getTime() ?? -Infinity;

        return aTime - bTime;
    });
}

function updateEventsPage(list) {
    const container = document.getElementById('events-container');
    if (!container) return;

    const sorted = sortEventsByDate(list);
    const upcoming = sorted.filter(event => isTodayOrFuture(event.date));
    const displayed = (upcoming.length ? upcoming : sorted.slice(-3)).reverse();

    // Use DOM text nodes so event titles entered through
    // the CMS are displayed safely.
    container.replaceChildren();

    displayed.forEach(event => {
        const wrapper = document.createElement('div');
        wrapper.className = 'event-container';

        const title = document.createElement('div');
        title.className = 'event-title';
        title.textContent = event.title;

        const date = document.createElement('div');
        date.className = 'event-date';
        date.textContent = event.date;

        wrapper.append(title, date);
        container.appendChild(wrapper);
    });
}

function normalizeEventLanguage(language) {
    const code = typeof language === 'string' ? language.toLowerCase() : '';

    if (code.startsWith('fr')) return 'fr';
    if (code.startsWith('el')) return 'el';

    return 'en';
}

// Set default language
let userLangEvents = normalizeEventLanguage(
    sessionStorage.getItem('preferredLanguage') ||
    navigator.language ||
    navigator.userLanguage
);

// Fetch events
fetch('../events.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to load events.json: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        function getLocalizedEvents(language) {
            const lang = normalizeEventLanguage(language);

            return data.map(event => ({
                id: event.id,
                date: event.date,
                title: event[lang]?.title || event.en?.title || '',
                location: event[lang]?.location || event.en?.location || ''
            }));
        }

        // Initial render
        updateEventsPage(getLocalizedEvents(userLangEvents));

        // Update events when language changes
        window.addEventListener('localeChange', event => {
            userLangEvents = normalizeEventLanguage(event.detail);
            updateEventsPage(getLocalizedEvents(userLangEvents));
        });
    })
    .catch(error => console.error('Could not load concert events:', error));
