<?php


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();

    $usr = $_POST['loginUsername'];
    $pwd = $_POST['loginPassword'];

    try {
        require_once "dbh.inc.php";
        require_once "../models/User.php";

        $user = new User($pdo);
        $userData = $user->findUserByUsername($usr);
        
        if ($userData && password_verify($pwd, $userData['password'])) {
            $_SESSION['user_id'] = $userData['id'];
            $_SESSION['username'] = $userData['username'];
            $_SESSION['password'] = $userData['password'];
            
            header("Location: ../../front_end/index.php");
            
            exit();
        } else {
            
            header("Location: ../login.html?error=invalidcredentials");
            exit();
        }
    } catch (PDOException $e) {
        die("Query failed: " . $e->getMessage());
    }
} else {
    header("Location: ../login.html");
    exit();
}
?>