
const postFormHandler = async (e) => {
  e.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const text = document.querySelector('#post-text').value.trim();

  console.log(title, text)

  const response = await fetch('/api/post/new', {
    method: 'POST',
    body: JSON.stringify({ 
      title, 
      text 
    }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Error in creating new post");
  }
}

document 
  .querySelector('.post-button')
  .addEventListener('click', postFormHandler)