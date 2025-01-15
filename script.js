// DOM Manipulation Helpers
function appendMessage(message) {
  const logDiv = document.getElementById("log");
  const messagePara = document.createElement("p");
  messagePara.textContent = message;
  logDiv.appendChild(messagePara);
  logDiv.scrollTop = logDiv.scrollHeight; // Auto-scroll to latest message
}

function updateBoxScore() {
  const tableCount = document.getElementById("table-count");
  const floorCount = document.getElementById("floor-count");

  tableCount.textContent = brooks.bitsOnTable;
  floorCount.textContent = brooks.bitsOnFloor;

  if (brooks.isComplying) {
    tableCount.className = "score after-rule";
    floorCount.className = "score after-rule";
  } else {
    tableCount.className = "score before-rule";
    floorCount.className = "score before-rule";
  }
}

// Brooks' Behavior Logic
const brooks = {
  bitsOnTable: 0,
  bitsOnFloor: 0,
  isThrowingBitsFromTable: true,
  isComplying: false,

  spitOntoTable() {
    this.bitsOnTable++;
    appendMessage(
      `Brooks spits a bit onto the table. 🍽️ Bits on table: ${this.bitsOnTable} 🥒`
    );
    updateBoxScore();
  },

  throwBitsFromTableToFloor() {
    if (this.bitsOnTable > 0) {
      this.bitsOnTable--;
      this.bitsOnFloor++;
      appendMessage(
        `Brooks throws a bit from the table onto the floor. 🍴 Bits on floor: ${this.bitsOnFloor} 😅`
      );
      updateBoxScore();
    } else {
      appendMessage("No bits on the table to throw! 🤷‍♂️");
    }
  },

  spitDirectlyOntoFloor() {
    this.bitsOnFloor++;
    appendMessage(
      `Brooks spits a bit directly onto the floor, complying with Mom's request. 🙌 Bits on floor: ${this.bitsOnFloor} ✅`
    );
    updateBoxScore();
  },

  complyWithMom() {
    this.isThrowingBitsFromTable = false;
    this.isComplying = true;
    appendMessage(
      "Brooks complies with Mom's rule: No throwing bits from the table to the floor. 🙅‍♂️"
    );
    updateBoxScore();
  },
};

// Event Listeners
document.getElementById("give-cucumber").addEventListener("click", () => {
  if (brooks.isComplying) {
    brooks.spitDirectlyOntoFloor();
  } else {
    brooks.spitOntoTable();
    setTimeout(() => {
      brooks.throwBitsFromTableToFloor();
    }, 1000); // Simulates the delay between actions
  }
});

document.getElementById("intervene").addEventListener("click", () => {
  brooks.complyWithMom();
});
