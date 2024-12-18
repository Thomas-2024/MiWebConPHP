// Function to handle form submission
export async function sendPosts(event) {
    event.preventDefault(); // Prevent the form from refreshing the page on submit

    // Collect form values
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    // Validation: make sure the fields aren't empty
    if (!title.trim() && !body.trim()) { // trim() removes leading/trailing spaces. If the user hasn't typed anything (just spaces), trim() returns an empty string.
        document.getElementById("message").innerHTML = "<p style='color: red;'>All fields are empty</p>";
        
    } else {
        document.getElementById('message').innerHTML = '<p>Sending data...</p>';
    }

    // Create an object with the data to send
    const data = {
        title: title,
        body: body,
    }

    const url = 'https://15ae3c60-8a0f-41a4-881e-4cfb04cee66a-00-1b59wa1rxre21.janeway.replit.dev/backend/manage.php'; // Replace with your backend URL;
    console.log(url);

    try {
        const response = await fetch(url, {
            method: 'POST',  // Use the POST method to send the data
            headers: {
                'Content-Type': 'application/json',  // Indicate that we are sending JSON data
            },
            body: JSON.stringify(data)  // Convert the data object to JSON
        });

        // Log the raw response from the server for debugging purposes
        const rawResponse = await response.text();  // Use text() to see the raw response
        console.log("Raw Response: ", rawResponse);

        // Check if the response is successful (status 200)
        if (!response.ok) {
            throw new Error("Error: " + response.status + " " + response.statusText);
        }

        // Try to parse the JSON if the response is valid
        const responseData = JSON.parse(rawResponse);  // Manually parse the response

        // Display the success message with the response data
        document.getElementById('message').innerHTML = `
            <p>Post sent successfully!</p>
            <h3>Id: ${responseData.id}</h3>
            <p><strong>Title:</strong> ${responseData.title}</p>
            <p><strong>Body:</strong> ${responseData.body}</p>`;
        location.reload();
    } catch (error) {
        document.getElementById('message').innerHTML = `Error: ${error.message}`;
    }
}