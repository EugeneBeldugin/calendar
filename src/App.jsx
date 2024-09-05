import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ModalDialog from "./components/Dialog.jsx"; // Ваш компонент модалки

const localizer = momentLocalizer(moment);

const defaultEvents = [
    {
        id: 0,
        title: 'Event',
        start: new Date(2024, 8, 5, 11, 0),
        end: new Date(2024, 8, 5, 11, 30),
    },
];

function App() {
    const [events, setEvents] = useState(defaultEvents);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

    const handleOpenModal = (x, y) => {
        setModalPosition({ x, y });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSelectSlot = (slotInfo) => {
        const { clientX, clientY } = slotInfo.box;
        handleOpenModal(clientX, clientY);
    };

    return (
        <>
            <ModalDialog
                isOpen={isModalOpen}
                position={modalPosition}
                onClose={handleCloseModal}
            >
                <p>Modal content goes here.</p>
                <button onClick={handleCloseModal}>Close</button>
            </ModalDialog>

            <div className="App">
                <h2>Calendar View</h2>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, margin: '50px' }}
                    selectable
                    onSelectSlot={handleSelectSlot}
                />
            </div>
        </>
    );
}

export default App;
