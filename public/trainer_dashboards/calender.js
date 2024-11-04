document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    // Retrieve stored events from localStorage
    var storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];

    // Initialize the FullCalendar
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: storedEvents // Load events from localStorage
    });

    calendar.render();

    // Functionality for adding events
    const addEventButton = document.getElementById('add-event-btn');
    const eventTitleInput = document.getElementById('event-title');
    const eventDateInput = document.getElementById('event-date');

    addEventButton.addEventListener('click', function () {
        const eventTitle = eventTitleInput.value;
        const eventDate = eventDateInput.value;

        if (eventTitle && eventDate) {
            const newEvent = {
                title: eventTitle,
                start: eventDate
            };

            // Add the event to the calendar
            calendar.addEvent(newEvent);

            // Store the new event in localStorage
            storedEvents.push(newEvent);
            localStorage.setItem('calendarEvents', JSON.stringify(storedEvents));

            // Clear input fields after adding
            eventTitleInput.value = '';
            eventDateInput.value = '';
        } else {
            alert('Please enter both an event title and a date.');
        }
    });
});
