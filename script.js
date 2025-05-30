const input = document.getElementById("userInput");
const form = document.querySelector("form");
const card = document.getElementById("card");
const photoElement = document.querySelector(".photo");
const followersElement = document.querySelector(".followers");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const username = input.value.trim();
  if (!username) return;
  
  try {
    // Show loading state
    card.classList.remove("hidden");
    photoElement.innerHTML = '<p>Loading...</p>';
    followersElement.innerHTML = '<p>Loading user data...</p>';
    
    // Using fetch instead of XMLHttpRequest
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Update UI with data
    photoElement.innerHTML = 
      `<img class="image" src="${data.avatar_url}" alt="${data.name || username}'s profile picture" />`;
    
    followersElement.innerHTML = `
      <div style="width: 100%; overflow-wrap: break-word; word-break: break-word;">
      <p><strong>Name:</strong> ${data.name || 'Not Available'}</p>
      <p><strong>Address:</strong> ${data.location || 'Not Given'}</p>
      <p><strong>Followers:</strong> ${data.followers}</p>
      <p><strong>About:</strong> ${data.bio || 'No bio available'}</p>
      </div>
      <div aria-label="GitHub Stats" style="width: 100%; display: flex; justify-content: center; flex-direction: column; align-items: center;">
      <h3>GitHub Stats:</h3>
      <iframe 
        src="https://github-readme-stats.vercel.app/api?username=${data.login}&show_icons=true&theme=radical" 
        width="100%" 
        max-width="400px"
        height="200" 
        frameborder="0" 
        scrolling="no"
        title="${data.login}'s GitHub statistics"
        loading="lazy"
        style="max-width: 100%;">
      </iframe>
      </div>`;
    
    input.value = "";
  } catch (error) {
    followersElement.innerHTML = `<p class="error">Error fetching user data: ${error.message}</p>`;
  }
});
