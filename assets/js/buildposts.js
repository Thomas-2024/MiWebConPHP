import {deletePosts} from "./deleteposts.js";
import {modifyPosts} from "./modifyposts.js";


// Example of using the spread operator to combine arrays
function addPosts(postArray, ...newPosts) {
    return [...postArray, ...newPosts];  // Combine both arrays
}

// Example call with additional posts
const additionalPosts = [
    { title: "Additional post 1", body: "This is an additional post." },
    { title: "Additional post 2", body: "This is another additional post." }
];

export function buildposts(posts) {
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <button id='deleteBtn${post.id}'>Eliminar</button>
            <button id='modifyBtn${post.id}'>Editar</button>
        `;
        postsContainer.append(postElement);
        document.getElementById(`deleteBtn${post.id}`).addEventListener('click', function() {
            deletePosts(post.id);
        });
        document.getElementById(`modifyBtn${post.id}`).addEventListener('click', function() {
            modifyPosts(post.id);
        }); 
    })
}

export function addAditionalPosts(posts, postsContainer) {
    const additionalPostsButton = document.createElement("button");
    additionalPostsButton.innerHTML = "Add additional posts";
    postsContainer.append(additionalPostsButton);

    additionalPostsButton.addEventListener("click", function () {
        postsContainer.innerHTML = '';
        const postsCombined = addPosts(posts, ...additionalPosts);
        buildposts(postsCombined);  
    })
}