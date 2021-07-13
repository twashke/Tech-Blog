async function deletePost(event) {
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");
        const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        window.location.reload();
    } else {
        alert("Failed to delete post");
        }
    }
}

document.querySelector("#delete").addEventListener("click", deletePost);