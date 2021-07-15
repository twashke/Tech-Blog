async function newCommentFormHandler(event) {
    event.preventDefault();

    const post_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    const text = document.querySelector('#comment-text').value.trim();

    const response = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({
                text,
                post_id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);
    
    if (response.ok) {
        document.location.reload("/homepage");
    } else {
        alert(response.statusText);
    }
}

document.querySelector("#addComment").addEventListener("submit", newCommentFormHandler);
