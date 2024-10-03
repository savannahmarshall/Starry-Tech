// document.addEventListener('DOMContentLoaded', () => {
//     const newPostForm = document.getElementById('new-post-form');
//     const postContainer = document.querySelector('.user-posts');
//     const newPostBtn = document.getElementById('new-post-btn');

//     // Initially hide the new post form
//     newPostForm.style.display = 'none';

//     // Show/hide the new post form
//     newPostBtn.addEventListener('click', () => {
//         newPostForm.style.display = newPostForm.style.display === 'none' ? 'block' : 'none';
//     });

//     // Handle new post submission via AJAX
//     newPostForm.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         const title = document.getElementById('title').value;
//         const content = document.getElementById('content').value;

//         const response = await fetch('/posts', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ title, content }),
//         });

//         if (response.ok) {
//             const newPost = await response.json();
//             addPostToDOM(newPost);
//             newPostForm.reset();
//             newPostForm.style.display = 'none'; // Hide the form after submission
//         } else {
//             alert('Error creating post.');
//         }
//     });

//     // Add new post to the DOM
//     const addPostToDOM = (post) => {
//         const postElement = document.createElement('div');
//         postElement.classList.add('post');
//         postElement.innerHTML = `
//             <h3>${post.title}</h3>
//             <p>${post.content}</p>
//             <button data-id="${post.id}" class="edit-btn">Edit</button>
//             <button data-id="${post.id}" class="delete-btn">Delete</button>
//         `;
//         postContainer.appendChild(postElement);

//         // Attach event listeners to the new buttons
//         postElement.querySelector('.edit-btn').addEventListener('click', () => {
//             editPost(post.id);
//         });

//         postElement.querySelector('.delete-btn').addEventListener('click', () => {
//             deletePost(post.id);
//         });
//     };

//     // Handle post deletion via AJAX
//     const deletePost = async (postId) => {
//         const response = await fetch(`/posts/${postId}`, {
//             method: 'DELETE',
//         });

//         if (response.ok) {
//             document.querySelector(`button[data-id="${postId}"]`).parentElement.remove();
//         } else {
//             alert('Error deleting post.');
//         }
//     };

//     // Handle post editing (AJAX)
//     const editPost = async (postId) => {
//         const newTitle = prompt('Enter new title');
//         const newContent = prompt('Enter new content');

//         const response = await fetch(`/posts/${postId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ title: newTitle, content: newContent }),
//         });

//         if (response.ok) {
//             const postElement = document.querySelector(`button[data-id="${postId}"]`).parentElement;
//             postElement.querySelector('h3').textContent = newTitle;
//             postElement.querySelector('p').textContent = newContent;
//         } else {
//             alert('Error editing post.');
//         }
//     };
// });