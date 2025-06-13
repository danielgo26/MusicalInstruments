<?php
class User
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function findUserByUsername($username)
    {
        $stmt = $this->pdo->prepare('SELECT * FROM users WHERE username = :username');
        $stmt->execute(['username' => $username]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findUserByUsernameAndPassword($username, $password)
    {
        $stmt = $this->pdo->prepare('SELECT * FROM users WHERE username = :username');
        $stmt->execute(['username' => $username]);
        $userDataList = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($userDataList as $userData) {
            if (password_verify($password, $userData['password'])) {
                return $userData;
            }
        }

        return null;
    }

    public function createUser($username, $email, $password)
    {
        $stmt = $this->pdo->prepare('INSERT INTO users (username, email, password) VALUES (:username, :email, :password)');
        return $stmt->execute(['username' => $username, 'email' => $email, 'password' => $password]);
    }
}
?>
