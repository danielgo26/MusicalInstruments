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
  clear = document.querySelector("#clear"),
  chooseFile = document.querySelector("#chooseFile");
lesson = document.querySelector("#lessons");

const keys = document.querySelectorAll(".key");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const destination = audioContext.createMediaStreamDestination();
const mediaRecorder = new MediaRecorder(destination.stream);
const pianoNum = document.getElementById("piano-num");

const history = document.querySelector("#history");

let recordedChunks = [];
let recordedKeys = [];
let startTime = 0;
let allKeys = [];

const pressedKey = (e) => {
  if (allKeys.includes(e.keyCode)) {
    playSound(keyBoard[e.keyCode]);
    history.innerText += ` ${keyBoard[e.key]} `;
  }
};

//lessons logic

lesson.addEventListener("click", (ev) => {
  fileSource = "lessons";
  ev.preventDefault();
  clear.click();
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

const replayRecordedKeys = (recordedKeys) => {
  if (recordedKeys.length === 0) return;

  recordedKeys.forEach((key) => {
    setTimeout(() => {
      playSound(key.note);
    }, key.time * 1000);
  });
};

const importRecordedKeysForRead = (file) => {
  const reader = new FileReader();

  reader.onload = (ev) => {
    const keys = JSON.parse(ev.target.result);
    recordedKeys = keys;

    if (keys.length === 0) return;

    keys.forEach((key) => {
      history.innerText += ` ${key.note} `;
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
    recordedKeys.push({
      note: `${div.getAttribute("data-note")}`,
      time: audioContext.currentTime - startTime,
    });

    history.innerText += ` ${div.getAttribute("data-note")} `;

    playSound(div.getAttribute("data-note"));
  });
});

let audio;

const playSound = (note) => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  } else if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  audio = new Audio(`../music_sounds/${note}.mp3`);
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

document.querySelector('#preview').onclick = () => {
    if (recordedKeys.length == 0) {
        return;
    }

    startTime = recordedKeys[0].time;

    recordedKeys.forEach(key => {
        key.time -= startTime;
        setTimeout(() => {
            playSound(key.note)
        }, key.time * 1000);
    });
}
//show keys button logic

const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

keysCheckbox.addEventListener("click", showHideKeys);

clear.addEventListener("click", () => {
  history.innerText = "";
  recordedKeys = [];
  startTime = 0;
});

//file exporting logic

document.querySelector("#export").onclick = () => {
  mediaRecorder.stop();

  exportRecordedKeys();
document.querySelector('#export').onclick = () => {
    mediaRecorder.stop();
    console.log('Recording stopped');

    recordedKeys.forEach((key) => {
        key.time -= recordedKeys[0].time;
    });
  recordedKeys.forEach((key) => {
    key.time = recordedKeys[0].time;
  });

    exportRecordedKeys();
}

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

  recordedKeys = [];
}

//music preview logic

document.querySelector("#preview").onclick = () => {
  if (recordedKeys.length === 0) return;

  if (!startTime || startTime === 0) {
    startTime = recordedKeys[0].time ?? audioContext.currentTime;
  }

  recordedKeys.forEach((key) => {
    key.time -= startTime;
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
