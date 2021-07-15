async function deleteComment(event) {
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");
        const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
    });
        console.log(response);
    if (response.ok) {
        document.location.replace(`/`)
    } else {
        alert("Failed to delete comment");
        }
    }
}

document.querySelector("#deleteComment").addEventListener("click", deleteComment);