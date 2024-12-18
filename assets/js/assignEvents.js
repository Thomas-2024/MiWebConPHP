import { fetchPosts } from "./fetchposts.js";
import { sendPosts } from "./sendposts.js";
import { hadleContactFormSubmit } from "./handleContactFormSubmit.js";
import { autocomplete } from "./autocomplete.js";
import { toggleTheme, initializeTheme } from "./theme.js";

export function assignEvents() {
    const elements = {
        contactForm: document.getElementById("contactForm"),
        postsForm: document.getElementById("postForm"),
        nameInput: document.getElementById("name"),
        toggleThemeButton: document.getElementById("toggleTheme")
    }

    const { contactForm, loadPostsBtn, postsForm, nameInput, toggleThemeButton } = elements;

    initializeTheme();
    autocomplete(nameInput);
    contactForm.addEventListener("submit", function(event) {hadleContactFormSubmit(event)});
    fetchPosts();
    postsForm.addEventListener('submit', function (event){ sendPosts(event)})
    toggleThemeButton.addEventListener("click", toggleTheme);
}