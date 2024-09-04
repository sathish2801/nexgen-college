document.getElementById('applicationForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(this);

    // Convert form data to a URL-encoded string if required by the backend
    const data = Object.fromEntries(formData.entries());

    // Send the data to the backend using fetch
    fetch('http://treasurebackend.roririsoft.com/forms/nexgen/cud/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Adjust header as needed
        },
        body: JSON.stringify(data), // Convert data to JSON format
    })
        .then(response => {
            const modalMessage = document.getElementById('modalMessage');
            const modalLabel = document.getElementById('messageModalLabel');
            if (response.ok) {
                modalLabel.textContent = 'Success';
                modalMessage.textContent = 'Application submitted successfully!';
                // Reset the form after successful submission
                document.getElementById('applicationForm').reset();
            } else {
                modalLabel.textContent = 'Error';
                modalMessage.textContent = 'Failed to submit application. Please try again.';
            }
            // Show the modal popup
            new bootstrap.Modal(document.getElementById('messageModal')).show();
        })
        .catch(error => {
            console.error('Error:', error);
            const modalMessage = document.getElementById('modalMessage');
            const modalLabel = document.getElementById('messageModalLabel');
            modalMessage.textContent = 'An error occurred. Please try again.';
            modalLabel.textContent = 'Error';
            // Show the modal popup
            new bootstrap.Modal(document.getElementById('messageModal')).show();
        });
});
