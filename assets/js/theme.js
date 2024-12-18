export function toggleTheme() {
    const currentTheme = localStorage.getItem("theme") || "light";// Obtiene el tema actual o usa 'light' como predeterminado
    const newTheme = currentTheme === "light" ? "dark": "light";// Cambia entre light y dark

    // Aplica el nuevo tema
    document.body.classList.remove(currentTheme + "-theme");
    document.body.classList.add(newTheme + "-theme");
    const sections = document.getElementsByTagName("section");
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove(currentTheme + "-section");
        sections[i].classList.add(newTheme + "-section");
    }

    // Guarda la preferencia del tema en localStorage
    localStorage.setItem("theme", newTheme);

    // Actualiza el texto del boton
    document.getElementById("toggleTheme").textContent = newTheme == "light" ? "Cambiar a modo oscuro": "Cambiar a modo claro";
}

export function initializeTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.add(savedTheme + "-theme");
    const sections = document.getElementsByTagName("section");
    for (let i = 0; i < sections.length; i++) {
        sections[i].className = savedTheme + "-section";
    }
    document.getElementById("toggleTheme").textContent = savedTheme === "light" ? "Cambiar a modo oscuro": "Cambiar a modo claro";
}