document.querySelectorAll('.comment-form').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const content = form.querySelector('textarea[name="content"]').value.trim();
      const post_id = form.querySelector('input[name="post_id"]').value;
  
      if (content) {
        const response = await fetch('/comments', {
          method: 'POST',
          body: JSON.stringify({ content, post_id }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.reload(); 
        } else {
          alert('Failed to post comment');
        }
      }
    });
  });