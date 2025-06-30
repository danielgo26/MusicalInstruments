<?php
session_start();

if ($_SESSION['username'] == null) {
    header("Location: ../login/index.html");
    exit();
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Melody Mind</title>
    <link rel="stylesheet" href="styles.css" />
</head>

<body>
    <div class="background">
        <div class="blurred">
            <header id="menu">
                <div class="logo">
                    <span>Melody Mind</span>
                </div>

                <nav class="navbar">
                    <a href="./library.html">Library</a>
                    <a href="../login/includes/logout.php">LogOut</a>
                </nav>

                <div class="floating-notes">
                    <span class="note">♪</span>
                    <span class="note">♬</span>
                    <span class="note">♩</span>
                    <span class="note">♫</span>
                    <span class="note">♯</span>
                    <span class="note">♪</span>
                </div>
            </header>

            <div class="try" id="history">
                <h2 id="greeter">Hello, <?php echo $_SESSION['username']; ?>!</h2>
            </div>
            <div class="try" id="lessons-history"></div>

            <div class="wrapper">
                <div id="piano-num">Piano 1</div>
                <footer>
                    <button class="btn" id="prev"><</button>
                   
                    <button class="btn" id="preview">Preview</button>
                    <button class="btn" id="export">Export current</button>
                    <button class="btn" id="clear-history">Clear history</button>
                    <button class="btn" id="clear-lesson">Clear lesson</button>
                    <button class="btn" href="#" id="chooseFile">Play file</button>
                    <input class="btn" type="file" id="importMusicFile" style="display:none;" />
                    <button class="btn" id="lessons">Lessons</button>
                    <div class="column keys-checkbox">
                        <span>Show Keys</span><input type="checkbox" checked>
                    </div>
                    
                    <button class="btn" id="next">></button>
                </footer>

                <div id="piano-1" class="piano-keys">
                    <div data-note="C1" class="key white"><span>c1</span></div>
                    <div data-note="Db1" class="key black"><span>dd1</span></div>
                    <div data-note="D1" class="key white"><span>d1</span></div>
                    <div data-note="Eb1" class="key black"><span>eb1</span></div>
                    <div data-note="E1" class="key white"><span>e1</span></div>
                    <div data-note="Gb1" class="key black"><span>gb1</span></div>
                    <div data-note="F1" class="key white"><span>f1</span></div>
                    <div data-note="G1" class="key white"><span>g1</span></div>
                    <div data-note="Ab1" class="key black"><span>ab1</span></div>
                    <div data-note="A1" class="key white"><span>a1</span></div>
                    <div data-note="Bb1" class="key black"><span>bb1</span></div>
                    <div data-note="B1" class="key white"><span>b1</span></div>
                    <div data-note="Db2" class="key black"><span>db1</span></div>
                    <div data-note="C2" class="key white"><span>c2</span></div>
                    <div data-note="D2" class="key white"><span>d2</span></div>
                    <div data-note="Eb2" class="key black"><span>eb2</span></div>
                    <div data-note="E2" class="key white"><span>e2</span></div>
                    <div data-note="Gb2" class="key black"><span>gb2</span></div>
                    <div data-note="F2" class="key white"><span>f2</span></div>
                    <div data-note="Ab2" class="key black"><span>ab2</span></div>
                    <div data-note="G2" class="key white"><span>g2</span></div>
                </div>

                <div id="piano-2" class="piano-keys">
                    <div data-note="A2" class="key white"><span>a2</span></div>
                    <div data-note="Bb2" class="key black"><span>bb2</span></div>
                    <div data-note="B2" class="key white"><span>b2</span></div>
                    <div data-note="Db3" class="key black"><span>db3</span></div>
                    <div data-note="C3" class="key white"><span>c3</span></div>
                    <div data-note="Eb3" class="key black"><span>eb3</span></div>
                    <div data-note="D3" class="key white"><span>d3</span></div>
                    <div data-note="E3" class="key white"><span>e3</span></div>
                    <div data-note="Gb3" class="key black"><span>gb3</span></div>
                    <div data-note="F3" class="key white"><span>f3</span></div>
                    <div data-note="Ab3" class="key black"><span>ab3</span></div>
                    <div data-note="G3" class="key white"><span>g3</span></div>
                    <div data-note="Bb3" class="key black"><span>bb3</span></div>
                    <div data-note="A3" class="key white"><span>a3</span></div>
                    <div data-note="B3" class="key white"><span>b3</span></div>
                    <div data-note="Db4" class="key black"><span>db4</span></div>
                    <div data-note="C4" class="key white"><span>c4</span></div>
                    <div data-note="Gb4" class="key black"><span>gb4</span></div>
                    <div data-note="D4" class="key white"><span>d4</span></div>
                    <div data-note="Eb4" class="key black"><span>eb4</span></div>
                    <div data-note="E4" class="key white"><span>e4</span></div>
                </div>

                <div id="piano-3" class="piano-keys">
                    <div data-note="F4" class="key white"><span>f4</span></div>
                    <div data-note="Ab4" class="key black"><span>ab4</span></div>
                    <div data-note="G4" class="key white"><span>g4</span></div>
                    <div data-note="Bb4" class="key black"><span>bb4</span></div>
                    <div data-note="A4" class="key white"><span>a4</span></div>
                    <div data-note="Db5" class="key black"><span>db5</span></div>
                    <div data-note="B4" class="key white"><span>b4</span></div>
                    <div data-note="C5" class="key white"><span>c5</span></div>
                    <div data-note="Eb5" class="key black"><span>eb5</span></div>
                    <div data-note="D5" class="key white"><span>d5</span></div>
                    <div data-note="Gb5" class="key black"><span>gb5</span></div>
                    <div data-note="E5" class="key white"><span>e5</span></div>
                    <div data-note="Ab5" class="key black"><span>ab5</span></div>
                    <div data-note="F5" class="key white"><span>f5</span></div>
                    <div data-note="G5" class="key white"><span>g5</span></div>
                    <div data-note="Bb5" class="key black"><span>bb5</span></div>
                    <div data-note="A5" class="key white"><span>a5</span></div>
                    <div data-note="Db6" class="key black"><span>dd6</span></div>
                    <div data-note="B5" class="key white"><span>b5</span></div>
                    <div data-note="Eb6" class="key black"><span>eb6</span></div>
                    <div data-note="C6" class="key white"><span>c6</span></div>
                </div>

                <div id="piano-4" class="piano-keys">
                    <div data-note="D6" class="key white"><span>d6</span></div>
                    <div data-note="Gb6" class="key black"><span>gb6</span></div>
                    <div data-note="E6" class="key white"><span>e6</span></div>
                    <div data-note="Ab6" class="key black"><span>ab6</span></div>
                    <div data-note="F6" class="key white"><span>f6</span></div>
                    <div data-note="Bb6" class="key black"><span>bb6</span></div>
                    <div data-note="G6" class="key white"><span>g6</span></div>
                    <div data-note="A6" class="key white"><span>a6</span></div>
                    <div data-note="Db7" class="key black"><span>db7</span></div>
                    <div data-note="B6" class="key white"><span>b6</span></div>
                    <div data-note="Eb7" class="key black"><span>eb7</span></div>
                    <div data-note="C7" class="key white"><span>c7</span></div>
                    <div data-note="Gb7" class="key black"><span>gb7</span></div>
                    <div data-note="D7" class="key white"><span>d7</span></div>
                    <div data-note="E7" class="key white"><span>e7</span></div>
                    <div data-note="Ab7" class="key black"><span>ab7</span></div>
                    <div data-note="F7" class="key white"><span>f7</span></div>
                    <div data-note="Bb7" class="key black"><span>bb7</span></div>
                    <div data-note="G7" class="key white"><span>g7</span></div>
                </div>
            </div>

            <script src="index.js"></script>
        </div>
    </div>
</body>

</html>