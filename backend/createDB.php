<?php
$dbFile = '../database/my_database.sqlite'; // La base de datos estará en la carpeta 'database'

try {
    // Conexión a la base de datos SQLite
    $db = new PDO('sqlite:' . $dbFile);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Crear la tabla si no existe
    $db->exec("CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        body TEXT
    )");

} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>