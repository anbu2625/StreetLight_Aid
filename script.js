const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const statusText = document.getElementById('status-text');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const voiceCheck = document.getElementById('voice');
const vibrateCheck = document.getElementById('vibrate');
const noiseLevelDisplay = document.getElementById('noise-level');
const noiseThreshold = document.getElementById('noise-threshold');

let detectionInterval;
let audioStream;
let analyser, microphone, dataArray;

startBtn.addEventListener('click', startDetection);
stopBtn.addEventListener('click', stopDetection);

function startDetection() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        video.srcObject = stream;
        audioStream = stream;

        const audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        detectionInterval = setInterval(detectLightAndNoise, 500);
        startBtn.disabled = true;
        stopBtn.disabled = false;
    })
    .catch(err => {
        alert("Error: " + err);
    });
}

function stopDetection() {
    clearInterval(detectionInterval);
    if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
    }
    startBtn.disabled = false;
    stopBtn.disabled = true;
    statusText.textContent = "Stopped";
    statusText.style.color = "#fff";
}

function detectLightAndNoise() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = frame.data;

    let redCount = 0, greenCount = 0, yellowCount = 0;

    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
        if (r > 150 && g < 100 && b < 100) redCount++;
        if (g > 150 && r < 100 && b < 100) greenCount++;
        if (r > 150 && g > 150 && b < 100) yellowCount++;
    }

    let detected = "Unknown";
    let color = "#ff0";

    if (redCount > greenCount && redCount > yellowCount) {
        detected = "STOP - Red Light";
        color = "red";
    } else if (greenCount > redCount && greenCount > yellowCount) {
        detected = "GO - Green Light";
        color = "lime";
    } else if (yellowCount > redCount && yellowCount > greenCount) {
        detected = "CAUTION - Yellow Light";
        color = "yellow";
    }

    statusText.textContent = detected;
    statusText.style.color = color;

    // Noise Detection
    analyser.getByteFrequencyData(dataArray);
    let values = 0;
    for (let i = 0; i < dataArray.length; i++) values += dataArray[i];
    let average = values / dataArray.length;
    noiseLevelDisplay.textContent = average.toFixed(1);

    if (average > noiseThreshold.value) {
        console.log("High noise detected");
    }

    // Voice + Haptic Feedback
    if (voiceCheck.checked) {
        const utterance = new SpeechSynthesisUtterance(detected);
        speechSynthesis.speak(utterance);
    }
    if (vibrateCheck.checked && navigator.vibrate) {
        navigator.vibrate([200]);
    }
}
