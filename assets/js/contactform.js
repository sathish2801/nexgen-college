
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(this);

    // Convert form data to an object
    const data = Object.fromEntries(formData.entries());

    // Send the data to the backend using fetch
    fetch('http://192.168.2.14:1000/forms/college/detail/cud/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        const modalMessage = document.getElementById('modalMessage');
        const modalLabel = document.getElementById('messageModalLabel');
        if (response.ok) {
            modalLabel.textContent = 'Success';
            modalMessage.textContent = 'Your message has been sent successfully!';
            this.reset(); // Reset the form after successful submission
        } else {
            modalLabel.textContent = 'Error';
            modalMessage.textContent = 'Failed to send message. Please try again.';
        }
        const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
        messageModal.show();
    })
    .catch(error => {
        console.error('Error:', error);
        const modalMessage = document.getElementById('modalMessage');
        const modalLabel = document.getElementById('messageModalLabel');
        modalMessage.textContent = 'An error occurred: ' + error.message;
        modalLabel.textContent = 'Error';
        const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
        messageModal.show();
    });
});

