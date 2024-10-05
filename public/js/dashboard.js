// Show the new post form when clicking the "Create a New Post" button
const newPostBtn = document.querySelector('#new-post-btn');
const newPostFormContainer = document.querySelector('#new-post-form-container');

newPostBtn.addEventListener('click', () => {
  newPostFormContainer.style.display = 'block';
});

// // Handle form submission to create a new post
// const newPostForm = document.querySelector('#new-post-form');
// newPostForm.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const title = document.querySelector('#title').value.trim();
//   const content = document.querySelector('#content').value.trim();

//   if (title && content) {
//     const response = await fetch('/posts', {
//       method: 'POST',
//       body: JSON.stringify({ title, content }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//       // Redirect back to the dashboard after successful post
//       document.location.replace('/dashboard');
//     } else {
//       alert('Failed to create post');
//     }
//   }
// });

// // Handle deletion of posts
// document.querySelectorAll('.delete-btn').forEach(button => {
//   button.addEventListener('click', async (event) => {
//     const id = event.target.getAttribute('data-id');
    
//     const response = await fetch(`/posts/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/dashboard');
//     } else {
//       alert('Failed to delete post');
//     }
//   });
// });

// // Handle post edit (you can extend this logic if necessary)
// document.querySelectorAll('.edit-btn').forEach(button => {
//   button.addEventListener('click', (event) => {
//     const id = event.target.getAttribute('data-id');
//     location.href = `/posts/${id}/edit`;
//   });
// });