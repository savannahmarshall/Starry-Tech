//// Fetch and display comments for a specific post by its postId
async function fetchComments(postId) {
    try {
        const response = await fetch(`/api/comments/${postId}`); 
        if (!response.ok) {
            throw new Error(`Error fetching comments: ${response.statusText}`); 
        }

        const comments = await response.json();
        const commentsList = document.getElementById(`comments-list-${postId}`);

        if (commentsList) {
            commentsList.innerHTML = ''; 
            comments.forEach(comment => {
                const commentHTML = `
                    <div class="comment">
                        <p>${comment.content}</p>
                        <small>Comment by ${comment.user.username} on ${new Date(comment.created_at).toLocaleDateString()}</small>
                    </div>
                `;
                commentsList.insertAdjacentHTML('beforeend', commentHTML); 
            });
        } else {
            console.error(`Comments list for post ID ${postId} not found.`);
        }
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

// Attach event listeners to all comment forms
document.querySelectorAll('.comment-form').forEach(form => {
    form.addEventListener('submit', async function (e) {
        e.preventDefault(); 

        const postId = this.querySelector('input[name="post_id"]').value;
        const content = this.querySelector('textarea[name="content"]').value;

        try {
            // Send the comment via POST request to the server
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    post_id: postId,
                    content: content
                })
            });

            if (response.ok) {
                const newComment = await response.json();

                // After adding the new comment, fetch the updated comments
                await fetchComments(postId);

                // Clear the form after successful submission
                this.querySelector('textarea').value = '';
            } else {
                alert('Error: Could not add comment. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

// Fetch comments for each post on page load
document.querySelectorAll('.post').forEach(post => {
    const postId = post.querySelector('input[name="post_id"]').value;
    fetchComments(postId);
});