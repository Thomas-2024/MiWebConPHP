export async function deletePosts(postId) {
  const url = `https://15ae3c60-8a0f-41a4-881e-4cfb04cee66a-00-1b59wa1rxre21.janeway.replit.dev/backend/manage.php/${postId}`; // Replace with your backend URL;
  if(confirm("Estas seguro de eliminar este post?")){
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'  // Especificamos que enviamos JSON
          }
        })

        if(!response.ok){
          throw new Error("Error: " + response.status + " " + response.statusText);
        }

        const responseData = await response.json();
        alert(responseData.message);
        location.reload();
      }catch(error){
        alert("Error: "+error.message);
      }
  }else {
    alert("Operacion cancelada");
  }
}