<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $usr = $_POST['registerUsername'];
    $email = $_POST['registerEmail'];
    $pwd = $_POST['registerPassword'];

    validateUserInfo($usr, $pwd);

    try {
        require_once "dbh.inc.php";
        require_once "../models/User.php";

        $user = new User($pdo);

        $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

        $user->createUser($usr, $email, $hashedPwd);

        $pdo = null;
        if (sendRegistrationEmail($email)) {
            echo "Email sent successfully.";
        } else {
            echo "Error while sending email.";
        }
        
        header("Location: ../index.html?success=registered");
        exit();
    } catch (PDOException $e) {
        die("Query failed: " . $e->getMessage());
    }
} else {
    header("Location: ../index.html");
}

function sendRegistrationEmail($toEmail)
{
    $subject = "Registration";
    $message = "You successfully registered into Melody Mind. Get ready to learn playing the piano with us!";
    $headers = "From: wcourse87@gmail.com";

    return mail($toEmail, $subject, $message, $headers);
}

function validateUserInfo($username, $password) {
    $errors = false;

    if (strlen($username) < 6 || strlen($password) < 6) {
        $errors = true;
    }

    if (!preg_match('/[A-Z]/', $password)) {
        $errors = true;
    }

    if (!preg_match('/[0-9]/', $password)) {
        $errors = true;
    }

    if ($errors) {
        header("Location: ../index.html?success=error");
        exit();
    }
}