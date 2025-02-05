const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// These are the integration tests in which we are testing that the compenets of Simon game are working together accurately...
describe("Simon Game Integration Tests", () => {
  let dom;
  let document;
  let window;
  let startButton, status, buttons, scoreElement;

  beforeEach(() => {
    // Load the HTML file
    const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;

    // Load the JavaScript file (Game Logic)
    const script = fs.readFileSync(path.resolve(__dirname, "../script.js"), "utf-8");
    const scriptEl = document.createElement("script");
    scriptEl.textContent = script;
    document.body.appendChild(scriptEl);

    // Ensure game variables are accessible
    window.gameSequence = [];
    window.playerSequence = [];
    window.level = 0;
    window.score = 0;

    // Get elements
    startButton = document.getElementById("start");
    status = document.getElementById("status");
    scoreElement = document.getElementById("score");
    buttons = {
      green: document.getElementById("green"),
      red: document.getElementById("red"),
      yellow: document.getElementById("yellow"),
      blue: document.getElementById("blue"),
    };
  });
  beforeEach(() => {
    jest.useFakeTimers(); // Enable fake timers before each test
});

afterEach(() => {
    jest.useRealTimers(); // Reset timers after each test
});


  // Test 1: "This test ensures that the game starts when "Start" button is clicked"
  test("Game starts when clicking the Start button", () => {
    startButton.click();
    expect(status.textContent).toContain("Level 1"); // Ensure game starts
  });
  //Test 2: "This test will ensures that the button flashes in a sequence"
  test("Button flashes when a sequence is played", () => {
    startButton.click();
    window.gameSequence = ["green"]; // Mock game sequence
    window.playSequence();

    setTimeout(() => {
      expect(buttons.green.style.opacity).toBe("1");
    }, 900);
  });

  
  //Test 3: "This test ensures that the score wil increases when player progress"
  test("Score updates when player progresses", () => {
    startButton.click();
    window.gameSequence = ["green"]; // Mock a level
    scoreElement.textContent = "Score: 0";

    buttons.green.click(); // Correct input
    setTimeout(() => {
      expect(scoreElement.textContent).toBe("Score: 10");
    }, 1100);
  });
});
