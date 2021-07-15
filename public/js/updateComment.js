async function updateComment(event) {
    event.preventDefault();
    
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    const text = document.querySelector('#update-text').value.trim();
    
    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ 
            text
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response);

    if (response.ok) {
        document.location.replace(`/comment/${id}`)
    } else {
        alert("Failed to update comment");
    }
}
document.querySelector("#updateComment").addEventListener("submit", updateComment);