export function autocomplete(element) {
    try {
        const savedValue = localStorage.getItem("value");

        // Si hay un valor guardado, lo asignamos al campo
        if (savedValue !== null) {
            element.value = savedValue;
            element.style.border = "1px solid blue";
        }
    } catch (e) {
        console.error("Error al acceder a localStorage", e);
    }

    element.addEventListener("input", () => {
        try {
            const value = element.value;

            // Si el campo está vacío, limpiamos el valor guardado
            if (value.trim() === "") {
                localStorage.removeItem("value");
            } else {
                // Guardar el valor en localStorage
                localStorage.setItem("value", value);
            }
        } catch (e) {
            console.error("Error al guardar en localStorage", e);
        }
    });
}