const logout = async () => {
    // Post Request when user logs out
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);

    // Return to homepage on logout
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

// Event Listener
document.querySelector('#logout').addEventListener('click', logout);