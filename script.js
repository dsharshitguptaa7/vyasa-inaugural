/**
 * ==========================================================================
 * VYASA-N RESEARCH ECOSYSTEM — INAUGURAL CONTROLLER
 * CHHATRAPATI SHAHU JI MAHARAJ UNIVERSITY, KANPUR
 * RESEARCH & DEVELOPMENT CELL
 * ==========================================================================
 */

// ==========================================================================
// CONFIGURATION & DESTINATION
// ==========================================================================
/**
 * Destination URL of the existing VYASA Research Ecosystem deployment.
 * Change this single constant if the underlying URL changes.
 */
const VYASA_URL = "https://vyasa-n.csjmu.ac.in"; // Update this if the underlying VYASA URL changes

/**
 * Unique localStorage namespace for inaugural status.
 * Ensures no interference with any auth or session keys of the underlying app.
 */
const INAUGURAL_STORAGE_KEY = "vyasa_inauguration_seen";

/**
 * DEVELOPMENT HELPER:
 * To reset the inaugural experience for testing or demonstration, run in console:
 * localStorage.removeItem("vyasa_inauguration_seen");
 */
// localStorage.removeItem("vyasa_inauguration_seen");

// Transition duration parameters in milliseconds
const CINEMATIC_TRANSITION_DURATION_MS = 1600;
const REDUCED_MOTION_TRANSITION_DURATION_MS = 350;

// ==========================================================================
// FIRST VISIT / RETURNING USER CHECK
// ==========================================================================
(function checkFirstVisit() {
  try {
    const hasSeenInauguration = localStorage.getItem(INAUGURAL_STORAGE_KEY);
    // If user has already completed the inauguration, redirect immediately
    if (hasSeenInauguration === "true") {
      window.location.replace(VYASA_URL);
      return;
    }
  } catch (err) {
    // Graceful fallback if localStorage is unavailable / blocked
    console.warn("Storage check bypassed:", err);
  }
})();

// ==========================================================================
// DOM INITIALIZATION & EVENT LISTENERS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initSubtleParticles();
  initEnterCTA();
});

/**
 * Generate 28-32 restrained, microscopic ambient knowledge particles.
 * They represent research nodes softly floating in academic space.
 */
function initSubtleParticles() {
  const container = document.getElementById("particlesContainer");
  if (!container) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return; // Respect accessibility

  const PARTICLE_COUNT = 30;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement("div");
    particle.className = "subtle-particle";

    // Random coordinates across full viewport
    const leftPos = Math.random() * 100;
    const topPos = 15 + Math.random() * 75; // Concentrate in middle/lower horizon
    const size = 1.8 + Math.random() * 2.4; // 1.8px - 4.2px
    const duration = 9 + Math.random() * 12; // 9s - 21s (very slow)
    const delay = Math.random() * 8; // Staggered entry
    const maxOpacity = (0.2 + Math.random() * 0.35).toFixed(2);

    particle.style.left = `${leftPos}%`;
    particle.style.top = `${topPos}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `-${delay}s`;
    particle.style.setProperty("--particle-max-opacity", maxOpacity);

    // Alternate tiny hues between gold and institutional cyan
    if (i % 3 === 0) {
      particle.style.backgroundColor = "#76c2eb";
      particle.style.boxShadow = "0 0 6px rgba(118, 194, 235, 0.4)";
    }

    fragment.appendChild(particle);
  }

  container.appendChild(fragment);
}

/**
 * Configure the Primary CTA button and orchestrate the cinematic sequence
 */
function initEnterCTA() {
  const enterBtn = document.getElementById("enterBtn");
  if (!enterBtn) return;

  let isTriggered = false;

  const executeCinematicEntry = () => {
    if (isTriggered) return;
    isTriggered = true;

    // Check motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const transitionTime = prefersReduced 
      ? REDUCED_MOTION_TRANSITION_DURATION_MS 
      : CINEMATIC_TRANSITION_DURATION_MS;

    // Record that inauguration has been completed
    try {
      localStorage.setItem(INAUGURAL_STORAGE_KEY, "true");
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }

    // Step 1 - 7: Apply the cinematic transition state
    document.body.classList.add("cinematic-transitioning");
    enterBtn.setAttribute("disabled", "true");

    // Optional audio cue can be added here if ever requested in future

    // Step 8: Navigate directly to the VYASA application
    setTimeout(() => {
      window.location.href = VYASA_URL;
    }, transitionTime);
  };

  enterBtn.addEventListener("click", executeCinematicEntry);

  // Keyboard accessibility: Enter or Space
  enterBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      executeCinematicEntry();
    }
  });
}
