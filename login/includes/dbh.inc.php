<?php
$host = 'localhost';
$dbname = 'pianodb';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host", $username, $password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

    $pdo->exec("USE `$dbname`");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            username VARCHAR(20),
            email VARCHAR(30) NOT NULL,
            password VARCHAR(255),
            PRIMARY KEY (username, email)
        )
    ");

     $pdo->exec("
        CREATE TABLE IF NOT EXISTS songs (
            title VARCHAR(20) NOT NULL UNIQUE,
            notes TEXT NOT NULL,
            PRIMARY KEY (title)
        )
    ");

    $pdo->exec("
         INSERT IGNORE INTO songs (title, notes) VALUES
            ('Reality', '[{\"note\":\"C1\",\"time\":0},{\"note\":\"D1\",\"time\":0.3093333333333703},{\"note\":\"E1\",\"time\":0.7493333333334249},{\"note\":\"F1\",\"time\":1.141333333333364},{\"note\":\"G1\",\"time\":1.5706666666667388},{\"note\":\"A1\",\"time\":1.9200000000000728},{\"note\":\"B1\",\"time\":2.2613333333333685},{\"note\":\"C2\",\"time\":2.589333333333343},{\"note\":\"D2\",\"time\":2.9306666666667525},{\"note\":\"E2\",\"time\":3.301333333333332},{\"note\":\"F2\",\"time\":3.608000000000061},{\"note\":\"G2\",\"time\":3.941333333333432}]'),
            ('Falling For You', '[{\"note\":\"F4\",\"time\":0},{\"note\":\"G4\",\"time\":0.3013333333333321},{\"note\":\"A4\",\"time\":0.6079999999999472},{\"note\":\"B4\",\"time\":0.8933333333334303},{\"note\":\"C5\",\"time\":1.2159999999998945}]'),
            ('Umbrella', '[{\"note\":\"F4\",\"time\":0},{\"note\":\"G4\",\"time\":0.31199999999989814}]');
    ");
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
