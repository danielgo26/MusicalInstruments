<?php
class User {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function findUserByUsername($username) {
        $stmt = $this->pdo->prepare('SELECT * FROM  users WHERE username = :username');
        $stmt->execute(['username' => $username]);
        return $stmt->fetch();
    }

    public function createUser($username, $email, $password) {
        $stmt = $this->pdo->prepare('INSERT INTO users (username, email, password) VALUES (:username, :email, :password)');
        return $stmt->execute(['username' => $username, 'email' => $email, 'password' => $password]);
    }
}
?>
