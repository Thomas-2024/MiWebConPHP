export function hadleContactFormSubmit(event) {
    // Handle the form submission
    event.preventDefault(); // Prevent the default form submission
    const name = document.getElementById('name').value;

    if (name) {
        alert('Thank you for your message, ' + name + '!');
    } else {
        alert('Please enter your name.');
    }
    event.target.submit();
}