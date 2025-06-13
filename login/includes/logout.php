<?php
session_start();

$_SESSION = array();

if (ini_get("session.use_cookies")) {
    deleteSessionCookie();
}

session_destroy();

header("Location: ../index.html");
exit();

function deleteSessionCookie()
{
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}
