// Post new comment
const commentFormHandler = async (e) => {
  try {
    if (e.target.hasAttribute('data-id')) {
      e.preventDefault();
      const postId = e.target.getAttribute('data-id');
      const comment = document.querySelector('#comment-text').value.trim();
  
      const response = await fetch('/api/comment/new', {
        method: 'POST',
        body: JSON.stringify({ postId, comment }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        throw new Error("Error when posting comment");
      }
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// Delete post
const deletePost = async (e) => {
  try {
    if (e.target.hasAttribute('data-id')) {
      e.preventDefault();
      const postId = e.target.getAttribute('data-id');
    
      const response = await fetch(`/api/post/delete/${postId}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        throw new Error("Error when deleting post");
      }
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// Update post
const updatePost = async (e) => {
  try {
    if (e.target.hasAttribute('data-id')) {
      e.preventDefault();
      const postId = e.target.getAttribute('data-id');
      const title = document.querySelector('#post-title').value.trim();
      const text = document.querySelector('#post-text').value.trim();
    
      const response = await fetch(`/api/post/update/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, text }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        throw new Error("Error when updating post");
      }
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

document 
  .querySelector('#comment-button')
  .addEventListener('click', commentFormHandler);

document
  .querySelector('#delete-post-button')
  .addEventListener('click', deletePost);

document
  .querySelector('#update-post-button')
  .addEventListener('click', updatePost);
