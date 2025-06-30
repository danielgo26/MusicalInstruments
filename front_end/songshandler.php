<?php
require_once "../login/includes/dbh.inc.php";
require_once "../login/models/Library.php";

$library = new Library($pdo);
$songs = $library->loadSongs();

if (count($songs) > 0) {
    foreach ($songs as $row) {
        $currNotes = $row["notes"];
        $notesJs = htmlspecialchars(json_encode($currNotes), ENT_QUOTES);
        echo "<div><button onclick='playLibSong($notesJs)'>" . htmlspecialchars($row["title"]) . "</button></div>";
    }
} else {
    echo "<div>No songs in the database.</div>";
}
