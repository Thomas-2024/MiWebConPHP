import { buildposts, addAditionalPosts } from './buildposts.js';

// Asynchronous function to fetch posts
export async function fetchPosts(postId = null) {
    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "Loading posts...";  // Loading message

    const url = postId 
        ? `https://15ae3c60-8a0f-41a4-881e-4cfb04cee66a-00-1b59wa1rxre21.janeway.replit.dev/backend/manage.php/${postId}` 
        : "https://15ae3c60-8a0f-41a4-881e-4cfb04cee66a-00-1b59wa1rxre21.janeway.replit.dev/backend/manage.php";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts = await response.json();
        console.log(posts);
        
        if (postId === null) {
            postsContainer.innerHTML = '';
            buildposts(posts);
            addAditionalPosts(posts, postsContainer);
        } else {
            return { id: posts[0].id, title: posts[0].title, body: posts[0].body };  // Directly return post info
        }
    } catch (error) {
        console.error(error); 
        postsContainer.innerHTML = `<p style="color: red;">Algo salió mal al cargar los posts. Intenta de nuevo más tarde. Error: ${error.message}</p>`;    
    }
}