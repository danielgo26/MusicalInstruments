<?php
    
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $usr = $_POST['registerUsername'];
    $email = $_POST['registerEmail'];
    $pwd = $_POST['registerPassword'];
    
    try {
        require_once "dbh.inc.php";
        require_once "../models/User.php";

        $user = new User($pdo);

        $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

        $user->createUser($usr, $email, $hashedPwd);

        $pdo = null;
        header("Location: ../index.html?success=registered");
        exit();
    }catch(PDOException $e) {
        die("Query failed: " . $e->getMessage());
    }
}
else {
    header("Location: ../index.html");
}