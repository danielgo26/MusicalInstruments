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
        $userDataList = $user->findUserByUsername($usr);

        $matchedUser = null;
        foreach ($userDataList as $userData) {
            if (password_verify($pwd, $userData['password'])) {
                $matchedUser = $userData;
                break;
            }
        }

        if ($matchedUser && password_verify($pwd, $matchedUser['password'])) {
            $_SESSION['username'] = $matchedUser['username'];

            header("Location: ../../front_end/index.php");

            exit();
        } else {
            header("Location: ../index.html?error=invalidcredentials");
            exit();
        }
    } catch (PDOException $e) {
        die("Query failed: " . $e->getMessage());
    }
} else {
    header("Location: ../index.html");
    exit();
}
