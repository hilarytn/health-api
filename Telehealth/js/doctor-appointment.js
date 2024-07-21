// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    fetchAppointments();

    document.getElementById('reschedule-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const appointmentId = this.dataset.appointmentId;
        const date = document.getElementById('reschedule-date').value;
        const time = document.getElementById('reschedule-time').value;
        rescheduleAppointment(appointmentId, date, time);
    });
});

function fetchAppointments() {
    const token = localStorage.getItem('token');
    const doctorId = localStorage.getItem('_id');

    fetch(`/api/appointment/${doctorId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const appointmentsContainer = document.getElementById('appointments-container');
        appointmentsContainer.innerHTML = '';
        data.forEach(appointment => {
            const appointmentElement = createAppointmentElement(appointment);
            appointmentsContainer.appendChild(appointmentElement);
        });
    })
    .catch(error => {
        console.error('Error fetching appointments:', error);
    });
}

function createAppointmentElement(appointment) {
    const appointmentElement = document.createElement('div');
    appointmentElement.className = 'appointment';
    appointmentElement.innerHTML = `
        <h3>Appointment with ${appointment.fullname}</h3>
        <p>Department: ${appointment.department.name}</p>
        <p>Doctor: ${appointment.doctor.name}</p>
        <p>Date: ${new Date(appointment.date).toLocaleDateString()}</p>
        <p>Time: ${appointment.time}</p>
        <p>Phone: ${appointment.phoneNumber}</p>
        <p>Message: ${appointment.message}</p>
        <p>Status: ${appointment.status}</p>
        <div class="actions">
            <button onclick="acceptAppointment('${appointment._id}')">Accept</button>
            <button onclick="showRescheduleModal('${appointment._id}')">Reschedule</button>
            <button onclick="cancelAppointment('${appointment._id}')">Cancel</button>
        </div>
    `;
    return appointmentElement;
}

function acceptAppointment(appointmentId) {
    const token = localStorage.getItem('token');

    fetch(`/api/appointment/${appointmentId}/accept`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        fetchAppointments();
    })
    .catch(error => {
        console.error('Error accepting appointment:', error);
    });
}

function showRescheduleModal(appointmentId) {
    const modal = document.getElementById('reschedule-modal');
    modal.style.display = 'block';
    document.getElementById('reschedule-form').dataset.appointmentId = appointmentId;
}

function closeModal() {
    const modal = document.getElementById('reschedule-modal');
    modal.style.display = 'none';
}

function rescheduleAppointment(appointmentId, date, time) {
    const token = localStorage.getItem('token');

    fetch(`/api/appointment/${appointmentId}/reschedule`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ date, time })
    })
    .then(response => response.json())
    .then(data => {
        closeModal();
        fetchAppointments();
    })
    .catch(error => {
        console.error('Error rescheduling appointment:', error);
    });
}

function cancelAppointment(appointmentId) {
    const token = localStorage.getItem('token');

    fetch(`/api/appointment/${appointmentId}/cancel`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        fetchAppointments();
    })
    .catch(error => {
        console.error('Error canceling appointment:', error);
    });
}