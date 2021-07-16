async function updateComment(event) {
    event.preventDefault();
    
    if(event.target.hasAttribute("data-id")) {
    // Save post_id to reload previous page
    const post = event.target.getAttribute("data-id");
    console.log(post);
    // Save id by taking the comment number of the window.location
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
        document.location.replace(`/posts/${post}`)
    } else {
        alert("Failed to update comment");
    }
    }
};


document.querySelector("#updateComment").addEventListener("submit", updateComment);
