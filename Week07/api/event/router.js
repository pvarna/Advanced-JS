const router = require('express').Router();

let eventCounter = 0;
let bookingCounter = 1000;
const events = new Map();
const bookings = new Map();
const events_x_bookings = new Map();
const freeSeatsPerEvent = new Map();

router.post("/", (req, res) => {
    const eventToAdd = req.body;
    const id = ++eventCounter;

    events.set(id, eventToAdd);
    freeSeatsPerEvent.set(id, +eventToAdd.capacity);
    events_x_bookings.set(id, []);
    res.status(201).send(eventToAdd);
});

router.get("/", (_, res) => {
    let result = "All events: ";

    for (const event of events.values()) {
        result += JSON.stringify(event);
        result += " ";
    }

    res.status(200).send(result);
});

router.get("/:id", (req, res) => {
    const id = +req.params.id;
    const event = events.get(id);

    if (!event) {
        res.status(404).send(`Event with id ${id} not found!`);
    }

    res.status(200).send(`Event with id ${id}: ${JSON.stringify(event)}`);
});

router.delete("/:id", (req, res) => {
    const id = +req.params.id;
    const eventToDelete = events.get(id);
    events.delete(id);
    freeSeatsPerEvent.delete(id);
    events_x_bookings.delete(id);

    res.send(eventToDelete);
});

router.post("/:id/booking", (req, res) => {
    const bookingToAdd = req.body;
    const eventId = +req.params.id;

    const event = events.get(eventId);

    if (!event) {
        res.status(404).send(`Event with id ${eventId} not found!`);
        return;
    }

    const freeSeats = freeSeatsPerEvent.get(eventId);

    if (freeSeats === 0) {
        res.status(400).send(`There aren't any free seats for this event!`);
        return;
    }

    freeSeatsPerEvent.set(eventId, freeSeats - 1);
    const bookingId = ++bookingCounter;
    bookings.set(bookingId, bookingToAdd);
    events_x_bookings.get(eventId).push(bookingId);
 
    res.status(201).send((freeSeats - 1).toString());
});

router.get("/:id/booking", (req, res) => {
    const eventId = +req.params.id;

    let result = `All bookings for event with id ${eventId}: `;

    const event = events.get(eventId);
    if (!event) {
        res.status(404).send(`Event with id ${eventId} not found!`);
    }

    for (const bookingId of events_x_bookings.get(eventId)) {
        result += JSON.stringify(bookings.get(bookingId));
        result += " ";
    }

    res.status(200).send(result);
});

router.get("/:id/booking/:bookingId", (req, res) => {
    const eventId = +req.params.id;

    if (!events.get(eventId)) {
        res.status(404).send(`Event with id ${eventId} not found!`);
        return;
    }

    const bookingId = +req.params.bookingId;
    const bookingsForEvent = events_x_bookings.get(eventId);
    const booking = bookingsForEvent.find(id => id === bookingId);

    if (!booking) {
        res.status(404).send(`Booking with id ${bookingId} not found!`);
        return;
    }

    res.status(200).send(booking);
});

router.delete("/:id/booking/:bookingId", (req, res) => {
    const eventId = +req.params.id;

    if (!events.get(eventId)) {
        res.status(404).send(`Event with id ${eventId} not found!`);
        return;
    }

    const bookingId = +req.params.bookingId;
    const bookingToDelete = bookings.get(bookingId);
    bookings.delete(bookingId);
    events_x_bookings.get(eventId).filter(id => id !== bookingId);

    res.send(bookingToDelete);
});

module.exports = router;