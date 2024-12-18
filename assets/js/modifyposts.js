import { fetchPosts } from "./fetchposts.js";

export async function modifyPosts(postId) {
  const url = `https://15ae3c60-8a0f-41a4-881e-4cfb04cee66a-00-1b59wa1rxre21.janeway.replit.dev/backend/manage.php/${postId}`;

  if (confirm("Estas seguro de editar este post?")) {
    const postInfo = await fetchPosts(postId);

    const modifyData = await modifyForm(postInfo, url);
  } else {
    alert("Operacion cancelada");
  }
}

async function modifyForm(post, url) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
  const titleInput = document.getElementById("modifyTitle");
  const bodyInput = document.getElementById("modifyBody");

  titleInput.value = post.title;
  bodyInput.value = post.body;

  return new Promise((resolve) => {
    const modifyForm = document.getElementById("modifyForm");
    modifyForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'  // Especificamos que enviamos JSON
          },
          body: JSON.stringify(modifyData)
        });

        // Log para ver el tipo de respuesta que llega
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        const responseText = await response.text();  // Usar text() primero para ver el contenido
        console.log('Response body (text):', responseText);

        // Intentamos analizarlo como JSON solo si el texto parece un JSON
        let responseData;
        try {
          responseData = JSON.parse(responseText);  // Intentar parsear manualmente
          console.log('Parsed responseData:', responseData);
        } catch (err) {
          console.error('Error parsing JSON:', err);
          alert('Error al procesar la respuesta del servidor. Revise la consola para más detalles.');
        }

        if (responseData && responseData.message) {
          alert(responseData.message);
          location.reload();
        }

      } catch (error) {
        alert("Error: " + error.message);
      }
      const modifyData = {
        title: titleInput.value,
        body: bodyInput.value
      }
      return (modifyData);
    });
  })
}