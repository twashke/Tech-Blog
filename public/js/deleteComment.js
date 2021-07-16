async function deleteComment(event) {
    if (event.target.hasAttribute("data-id")) {
        // Save post_id to reload previous page
        const post = event.target.getAttribute("data-id");
         // Save id by taking the comment number of the window.location
        const id = window.location.toString().split("/")[
            window.location.toString().split("/").length - 1];
        
        const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
    });
        console.log(response);
    if (response.ok) {
        document.location.replace(`/posts/${post}`)
    } else {
        alert("Failed to delete comment");
        }
    }
};

document.querySelector("#deleteComment").addEventListener("click", deleteComment);

