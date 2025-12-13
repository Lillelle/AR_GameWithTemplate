// ===== Global state & helpers =====
// const ambientAudio = document.getElementById("ambientAudio");
// const voiceToggle  = document.getElementById("voiceToggle");
const titleEl      = document.getElementById("title");
const storyEl      = document.getElementById("storyText");
const buttonsEl    = document.getElementById("buttonsContainer");
const gameWrap     = document.getElementById("gameContainer");

let soundEnabled = false;
let narrationUtterance = null;
let currentStage = "intro";

// ===== Stage data =====
const STAGES = {
  intro: {
    title: "The Craftsmen of Archaic Korkyra",
    text: `Learn about the ancient world of Corfu through the eyes of skilled artisans.<br> Click <b>"continue"</b> once you are ready.`,
    buttons: [
      { label: "Continue", action: () => {
          buttonsEl.innerHTML = "";
          const contBtn = document.createElement("button");
          contBtn.textContent = "Continue";
          contBtn.addEventListener("click", () => goTo("role"));
          buttonsEl.appendChild(contBtn);
      }}
    ]
  },

  role: {
    title: "Your Quest",
    text: `Search and scan the markers scattered around the museum to unlock different customers.<br> Complete their requests to earn <b>coins</b>!`,
    buttons: [
      { label: "Continue", action: () => goTo("Main_Screen") },
      { label: "Game Instructions", action: () => goTo("instructions") }
    ]
  },

  Main_Screen: {
    title: "Main Hub",
    text: `Click "Go!" to enter AR Mode and start looking for markers.\n Once you have collected enough <b>coins</b>, click "Finish Task" to complete the experience.`,
    buttons: [
      { label: "Go!", action: () => {
          
          enterARMode()
      }},
      { label: "Finish Task", action: () => goTo("end") },
      { label: "Back", action: () => goTo("role") }
    ]
  },

  instructions: {
    title: "How to Play — Overview",
    text: `
      • You play as different types of craftsmen & artisans of the Archaic Era.<br>
      • Use your device camera to scan AR markers hidden in the environment.<br>
      • Each marker reflects a different customer, based on the different casts of the time<br>
      • Choose the correct type of craftsman to fit your customer's needs, and make the propper item combinations<br>
      • If in doubt, read up info about the items requested by tapping on them!<br>
    `,
    buttons: [
      { label: "Back", action: () => goTo("role") }
    ]
  },

  // ——— Minimal edits so the end "has meaning" ———
  end: {
  title: "Congratulations!",
  text: `You have mastered the crafts of the Archaic Era.<br> Would you like to play again;`,
  buttons: [
    { label: "Play Again", action: () => goTo("intro", true) }
  ]
}
};

// ===== Sound / Narration =====
function enableSound() {
  soundEnabled = true;
  voiceToggle.classList.add("active");
  voiceToggle.textContent = "🔊";
}

function disableSound() {
  soundEnabled = false;
  voiceToggle.classList.remove("active");
  voiceToggle.textContent = "🔇";
  cancelNarration();
  stopAmbient();
}

function playAmbient() {
  if (!soundEnabled) return;
  ambientAudio.volume = 0.4;
  ambientAudio.play().catch(() => {});
}

function stopAmbient() { ambientAudio.pause(); }
/*
function cancelNarration() {
  try {
    if (speechSynthesis.speaking || speechSynthesis.pending) speechSynthesis.cancel();
  } catch {}
}

function speak(text) {
  cancelNarration();
  if (!soundEnabled) return;
  let plainText = text.replace(/<a[^>]*>.*?<\/a>/gi, "");
  plainText = plainText.replace(/(<([^>]+)>)/gi, "");
  plainText = plainText.replace(/&[a-z]+;/gi, " ");
  plainText = plainText.replace(/\s+/g, " ").trim();
  const u = new SpeechSynthesisUtterance(plainText);
  u.lang = "en-GB";
  u.rate = 1.05;
  u.pitch = 1.0;
  narrationUtterance = u;
  speechSynthesis.speak(u);
}

voiceToggle.addEventListener("click", () => {
  if (soundEnabled) {
    disableSound();
  } else {
    enableSound();
    playAmbient();
    if (STAGES[currentStage]) speak(STAGES[currentStage].text);
  }
});
*/
// ===== Navigation =====
function goTo(stage, resetAll = false) {
  // If called as Restart with resetAll=true, do a soft reset so the action έχει νόημα
  if (resetAll === true) {
    cancelNarration();
    stopAmbient();
    disableSound();               // επιστρέφει το σύστημα σε «σίγαση»
    try { history.replaceState({}, "", location.pathname); } catch {}
  }

  currentStage = stage;
  const s = STAGES[stage];
  if (!s) return;

  if (s.bg) gameWrap.style.backgroundImage = `url('${s.bg}')`;
  titleEl.textContent = s.title || "";
  storyEl.innerHTML = s.text || "";

  buttonsEl.innerHTML = "";
  (s.buttons || []).forEach(b => {
    const btn = document.createElement("button");
    btn.textContent = b.label;
    btn.addEventListener("click", b.action);
    buttonsEl.appendChild(btn);
  });

  if (soundEnabled) speak(s.text || "");
}

// ===== Init =====
window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);
  const section = params.get("section");
  if (section && STAGES[section]) {
    goTo(section);
  } else {
    goTo("intro");
  }
});

// =========================================
// AR & UNITY INTEGRATION LOGIC
// =========================================

const arLayer = document.getElementById('ar-layer');
const gameContainer = document.getElementById('gameContainer');
const arScene = document.querySelector('a-scene');
const unityContainer = document.getElementById('unity-container');
const unityIframe = document.getElementById('unity-iframe');
const statusText = document.getElementById('status-text');

let arSystem = null;
let pendingMissionId = null;

// 1. Enter AR Mode
function enterARMode() {
  // Hide Story, Show AR
  gameContainer.style.display = 'none';
  arLayer.style.display = 'block';

  // Initialize AR System if not ready
  if (!arSystem && arScene.systems['mindar-image-system']) {
      arSystem = arScene.systems['mindar-image-system'];
  }
  
  // Start the Camera
  if (arSystem) {
      arSystem.start(); 
  }
}

// 2. Exit AR Mode (Back to Story)
document.getElementById('ar-back-button').addEventListener('click', () => {
  // Stop Camera
  if (arSystem) {
      arSystem.stop(); 
  }

  // Hide AR, Show Story
  arLayer.style.display = 'none';
  gameContainer.style.display = 'flex'; 
  
  
});

// 3. Unity Logic (Triggered by Targets)
arScene.addEventListener('loaded', () => {
    // Listen for Target 0
    const t0 = document.getElementById('target-0');
    if(t0) t0.addEventListener('targetFound', () => launchUnity(1));

    // Listen for Target 1
    const t1 = document.getElementById('target-1');
    if(t1) t1.addEventListener('targetFound', () => launchUnity(2));
});

function launchUnity(missionID) {
    statusText.innerText = "Loading Simulation...";
    
    // Pause AR processing to save performance
    stopAmbient();
    if (arSystem) arSystem.pause();
    
    // Hide AR Camera UI (Video)
    const video = document.querySelector('video');
    if(video) video.style.display = 'none';

    // Show Unity
    unityContainer.style.display = 'block';

    // Send Message
    pendingMissionId = missionID;
    attemptUnityHandshake();
}

function attemptUnityHandshake() {
    if (unityIframe.contentWindow && unityIframe.contentWindow.unityInstance) {
        unityIframe.contentWindow.unityInstance.SendMessage('GameManager', 'LoadMission', pendingMissionId);
    } else {
        setTimeout(attemptUnityHandshake, 500);
    }
}

// 4. Close Unity (Called from Unity Button)
window.closeUnity = function() {
   unityContainer.style.display = 'none';
   
   const video = document.querySelector('video');
   if(video) video.style.display = 'block';
   
   if (arSystem) arSystem.unpause();
   
   statusText.innerText = "Scan next card...";

   playAmbient();
};

// Also listen for message events just in case
window.addEventListener("message", (event) => {
    if (event.data === "MissionComplete") {
        window.closeUnity();
    }
});
