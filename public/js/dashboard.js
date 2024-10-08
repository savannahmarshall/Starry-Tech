// Show the new post form when the button is clicked
document.getElementById('new-post-btn').addEventListener('click', () => {
  document.getElementById('new-post-form-container').style.display = 'block';
});

// Handle new post submission
document.getElementById('new-post-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
      document.location.reload();
  } else {
      alert('Failed to create post');
  }
});

// Handle deletion of posts
document.querySelectorAll('.delete-btn').forEach(button => {
  button.addEventListener('click', async (event) => {
      const confirmDelete = confirm('Are you sure you want to delete this post?');
      if (!confirmDelete) return;

      const id = event.target.getAttribute('data-id');

      try {
          const response = await fetch(`/api/posts/${id}`, {
              method: 'DELETE',
          });

          if (response.ok) {
              document.location.replace('/dashboard');
          } else {
              const errorResponse = await response.json();
              alert(`Failed to delete post: ${errorResponse.message || 'Unknown error'}`);
          }
      } catch (error) {
          alert('Failed to delete post: ' + error.message);
      }
  });
});

// Handle post edit
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const titleInput = document.getElementById('edit-title');
const contentInput = document.getElementById('edit-content');
const closeModal = document.querySelector('.modal-close');

// Add event listeners to each edit button
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const id = event.target.getAttribute('data-id');
        const postTitle = event.target.parentElement.querySelector('h3 a').innerText;
        const postContent = event.target.parentElement.querySelector('p').innerText;

        // Set the form action for PUT request
        editForm.setAttribute('data-id', id); 
        titleInput.value = postTitle;
        contentInput.value = postContent;

        // Show the modal
        editModal.style.display = 'block';
    });
});

// Handle edit post submission with PUT request
editForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = editForm.getAttribute('data-id'); 
    const title = titleInput.value;
    const content = contentInput.value;

    try {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT', 
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.reload();  
        } else {
            alert('Failed to update post');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error updating post');
    }
});

// Clicking on 'x' to close the modal
closeModal.onclick = function() {
    editModal.style.display = 'none';
}

// Clicking outside the modal closes it
window.onclick = function(event) {
    if (event.target === editModal) {
        editModal.style.display = 'none';
    }
}