<?php
$host = 'localhost';
$dbname = 'pianodb';
$username = 'root';
$password = '';

try {
    //;dbname=$dbname
    $pdo = new PDO("mysql:host=$host", $username, $password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

    // Step 3: Connect to the newly created database
    $pdo->exec("USE `$dbname`");

     $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            username VARCHAR(20),
            email VARCHAR(30) NOT NULL,
            password VARCHAR(255),
            PRIMARY KEY (username, email)
        )
    ");

    echo "Connected successfully";
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>

