const keyBoard = new Map([
  ["q", "C1"],
  ["1", "Db1"], //b
  ["w", "D1"],
  ["2", "Eb1"], //b
  ["e", "E1"],
  ["3", "Gb1"], //b
  ["r", "F1"],
  ["t", "G1"],
  ["4", "Ab1"], //b
  ["y", "A1"],
  ["5", "Bb1"], //b
  ["u", "B1"],
  ["6", "Db2"], //b
  ["i", "C2"],
  ["o", "D2"],
  ["7", "Eb2"], //b
  ["p", "E2"],
  ["8", "Gb2"], //b
  ["[", "F2"],
  [`9`, "Ab2"], //b
  [`]`, "G2"],
]);

const pianoKeys = document.querySelectorAll(".piano-keys .key"),
  keysCheckbox = document.querySelector(".keys-checkbox input"),
  importMusicFile = document.getElementById("importMusicFile"),
  greeter = document.querySelector("#history #greeter"),
  clearHistory = document.querySelector("#clear-history"),
  clearLesson = document.querySelector("#clear-lesson"),
  chooseFile = document.querySelector("#chooseFile");
lesson = document.querySelector("#lessons");

const keys = document.querySelectorAll(".key");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const destination = audioContext.createMediaStreamDestination();
const mediaRecorder = new MediaRecorder(destination.stream);
const pianoNum = document.getElementById("piano-num");

const history = document.querySelector("#history");
const lessonsHistory = document.querySelector("#lessons-history");

let recordedChunks = [];
let recordedKeys = [];
let startTime = 0;
let allKeys = [];

//lessons logic

lesson.addEventListener("click", (ev) => {
  fileSource = "lessons";
  ev.preventDefault();
  clearHistory.click();
  clearLesson.click();
  importMusicFile.click();
});

//import music file logic

let fileSource = null;

chooseFile.addEventListener("click", (ev) => {
  fileSource = "chooseFile";
  ev.preventDefault();
  importMusicFile.click();
});

importMusicFile.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (file.type === "application/json") {
    if (fileSource == "chooseFile") {
      importRecordedKeys(file);
    }
    if (fileSource == "lessons") {
      importRecordedKeysForRead(file);
    }

    fileSource = null;
    importMusicFile.value = "";
  }
});

const importRecordedKeys = (file) => {
  const reader = new FileReader();
  reader.onload = (ev) => {
    const recordedKeys = JSON.parse(ev.target.result);
    replayRecordedKeys(recordedKeys);
  };

  reader.readAsText(file);
};

function playSound(note) {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  } else if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  const audio = new Audio(`../music_sounds/${note}.mp3`);
  const sound = audioContext.createMediaElementSource(audio);
  sound.connect(audioContext.destination);
  sound.connect(destination);

  const clickedKey = document.querySelector(`[data-note="${note}"]`);
  if (clickedKey) {
    clickedKey.classList.add("active");
    setTimeout(() => {
      clickedKey.classList.remove("active");
    }, 150);
  }

  audio.play();
};

function replayRecordedKeys(recordedKeys) {
  if (recordedKeys.length === 0) return;

  recordedKeys.forEach((key) => {
    setTimeout(() => {
      playSound(key.note);
    }, key.time * 1000);
  });
};

function playLibSong(notes) {
    const recordedKeys = JSON.parse(notes);
    replayRecordedKeys(recordedKeys);
}

const importRecordedKeysForRead = (file) => {
  const reader = new FileReader();

  reader.onload = (ev) => {
    const keys = JSON.parse(ev.target.result);
    recordedKeys = keys;

    if (keys.length === 0) return;

    lessonsHistory.innerText = "Notes: ";
    keys.forEach((key) => {
      lessonsHistory.innerText += ` ${key.note} `;
    });
  };

  reader.readAsText(file);
};

//piano keys logic (mouse + keyboard)

pianoKeys.forEach((key) => {
  allKeys.push(key.getAttribute("data-note"));

  key.addEventListener("click", () => {
    if (recordedKeys.length === 0) {
      greeter.innerHTML = "";
    }
    playSound(key.getAttribute("data-note"));
  });
});

keys.forEach((div) => {
  div.addEventListener("click", (event) => {
    if (recordedKeys.length === 0) {
      startTime = audioContext.currentTime;
    }
    recordedKeys.push({
      note: `${div.getAttribute("data-note")}`,
      time: audioContext.currentTime - startTime,
    });

    history.innerText += ` ${div.getAttribute("data-note")} `;

    playSound(div.getAttribute("data-note"));
  });
});

document.addEventListener("keydown", (ev) => {
  if (ev.repeat) return;

  if (ev.key == "ArrowLeft") {
    prev.click();
  } else if (ev.key == "ArrowRight") {
    next.click();
  } else {
    const key = keyBoard.get(ev.key);

    if (key) {
      playSound(key);

      if (recordedKeys.length === 0) {
        history.innerHTML = "";
      }
      recordedKeys.push({
        note: key,
        time: audioContext.currentTime - startTime,
      });

      history.innerText += ` ${key} `;
    }
  }
});

let audio;

//show keys button logic

const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

keysCheckbox.addEventListener("click", showHideKeys);

clearHistory.addEventListener("click", () => {
  history.innerText = "";
  recordedKeys = [];
  startTime = 0;
});

clearLesson.addEventListener("click", () => {
  lessonsHistory.innerText = "";
});

//file exporting logic

document.querySelector("#export").onclick = () => {
  mediaRecorder.stop();
  exportRecordedKeys();
};

function exportRecordedKeys() {
  const blob = new Blob([JSON.stringify(recordedKeys)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const newElement = document.createElement("a");

  newElement.style.display = "none";
  newElement.href = url;

  const fileName = window.prompt("Save file as:");

  if (fileName === null || fileName.trim() === "") {
    return;
  }
  newElement.download = fileName;

  document.body.appendChild(newElement);
  newElement.click();
  window.URL.revokeObjectURL(url);
}

//music preview logic

document.querySelector("#preview").onclick = () => {
  if (recordedKeys.length === 0) {
    history.innerText = "Nothing for preview!";
    return;
  }

  recordedKeys.forEach((key) => {
    setTimeout(() => {
      playSound(key.note);
    }, key.time * 1000);
  });
};

//music recording logic

mediaRecorder.ondataavailable = (event) => {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
  }
};

mediaRecorder.onstop = () => {
  const blob = new Blob(recordedChunks, { type: "audio/webm" });
  recordedChunks = [];
  const audioURL = URL.createObjectURL(blob);
  const audioElement = document.createElement("audio");
  audioElement.controls = true;
  audioElement.src = audioURL;
  document.body.appendChild(audioElement);
};

//piano keyboards change logic

let id = 1;
document.getElementById(`piano-${id}`).classList.add("active");

const next = document.getElementById("next");
const prev = document.getElementById("prev");

next.addEventListener("click", (ev) => {
  const previousKeyBoard = document.getElementById(`piano-${id}`);
  previousKeyBoard.classList.remove("active");

  id = id == 4 ? 1 : ++id;

  pianoNum.innerText = `Piano ${id}`;
  changePiano(id);
});

prev.addEventListener("click", (ev) => {
  const previous = document.getElementById(`piano-${id}`);
  previous.classList.remove("active");

  id = id == 1 ? 4 : --id;

  document.getElementById(`piano-${id}`).classList.add("active");
  pianoNum.innerText = `Piano ${id}`;
  changePiano(id);
});

function changePiano(pos) {
  document.getElementById(`piano-${pos}`).classList.add("active");
  const visibleArr = Array.from(document.querySelectorAll(`#piano-${pos} div`));
  const keys = Array.from(keyBoard.keys());

  let lastKeyBoardIndex = 0;
  visibleArr.forEach((el, index) => {
    if (index < keys.length)
      keyBoard.set(keys[index], el.getAttribute("data-note"));
    ++lastKeyBoardIndex;
  });

  while (lastKeyBoardIndex < keys.length) {
    keyBoard.set(keys[lastKeyBoardIndex++], undefined);
  }
}
