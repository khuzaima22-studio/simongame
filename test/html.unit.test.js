const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// These are the unit tests of HTML file in which we're testing that the individual compenents (Like Start Button, score box etc) exists..
// We also check that the 4 different colours of the game exist by doing the Unit testing. 
describe("HTML File Tests", () => {
  let dom;
  let document;

  // Load the HTML file before each test
  beforeEach(() => {
    try {
      const htmlPath = path.resolve(__dirname, "../index.html");
      if (!fs.existsSync(htmlPath)) {
        throw new Error("index.html file not found!");
      }
      const html = fs.readFileSync(htmlPath, "utf-8");
      dom = new JSDOM(html);
      document = dom.window.document;
    } catch (error) {
      console.error("Error loading HTML file:", error.message);
    }
  });

  //Test 1: "This test will ensure that the 'Start' button exists"
  test('Check if the "Start" button exists', () => {
    const startButton = document.getElementById("start");
    expect(startButton).not.toBeNull();
    expect(startButton.textContent.trim()).toBe("Start");
  });

  // Test 2: "This test will ensures that all Simon game colour buttons exist"
  test("Check if Simon game buttons exist", () => {
    const colors = ["green", "red", "yellow", "blue"];
    colors.forEach((color) => {
      const button = document.getElementById(color);
      expect(button).not.toBeNull();
    });
  });

  // Test 3: Check if the game instructions exist
  test("Check if game instructions are present", () => {
    const instructions = document.querySelector(".instructions");
    expect(instructions).not.toBeNull();
    expect(instructions.textContent).toContain("Welcome to the Simon Game!");
  });

  // Test 4: "This test will ensures that the score element exists"
  test("Check if score display exists", () => {
    const score = document.getElementById("score");
    expect(score).not.toBeNull();
    expect(score.textContent).toContain("Score:");
  });

  // Test 5: "This test will ensures that the Javascript file is linked properly"
  test("Check if script.js is linked", () => {
    const script = document.querySelector("script[src='script.js']");
    expect(script).not.toBeNull();
  });
});
