async function updatePost(event) {
    event.preventDefault();
    
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    const title = document.querySelector('#update-title').value.trim();
    const content = document.querySelector('#update-content').value.trim();
    
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ 
            title, 
            content
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response);

    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert("Failed to update post");
    }
}
document.querySelector("#updatePost").addEventListener("submit", updatePost);