document.addEventListener('DOMContentLoaded', function () {
    const departmentSelect = document.getElementById('departmentSelect');
    const doctorSelect = document.getElementById('doctorSelect');
    const appointmentForm = document.getElementById('appointmentForm');
  
    // Fetch and populate departments
    fetch('/api/department')
      .then(response => response.json())
      .then(data => {
        data.forEach(department => {
          const option = document.createElement('option');
          option.value = department._id;
          option.textContent = department.name;
          departmentSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching departments:', error));
  
    // Fetch and populate doctors based on selected department
    departmentSelect.addEventListener('change', function () {
      const departmentId = this.value;
      doctorSelect.innerHTML = '<option value="">Select Doctors</option>'; // Clear previous options
  
      if (departmentId) {
        fetch(`/api/doctor?department=${departmentId}`)
          .then(response => response.json())
          .then(data => {
            data.forEach(doctor => {
              const option = document.createElement('option');
              option.value = doctor._id;
              option.textContent = `${doctor.username} - ${doctor.specialization}`;
              doctorSelect.appendChild(option);
            });
          })
          .catch(error => console.error('Error fetching doctors:', error));
      }
    });

    // Handle form submission
    appointmentForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission

      const formData = new FormData(appointmentForm);
      const jsonData = {};
      formData.forEach((value, key) => jsonData[key] = value);

      const token = localStorage.getItem('token');

      fetch('/api/appointment/book', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`, // Include the token in the Authorization header
          },
          body: JSON.stringify(jsonData),
      })
      .then(response => response.json())
      .then(data => {
          // Redirect to confirmation page or display a success message
          window.location.href = '/confirmation';
      })
      .catch(error => console.error('Error creating appointment:', error));
  });
})
