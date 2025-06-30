<?php
class Library{

    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function findSongByTitle($title)
    {
        $stmt = $this->pdo->prepare('SELECT notes FROM songs WHERE title = :title');
        $stmt->execute(['title' => $title]);
        $song = $stmt->fetch(PDO::FETCH_ASSOC);

         return $song ? $song['notes'] : null;
    }

    public function loadSongs()
    {
        $stmt = $this->pdo->prepare('SELECT * FROM songs');
        $stmt->execute(); 
        $songs = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $songs;
    }
}

?>
