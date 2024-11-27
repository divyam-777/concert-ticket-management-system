// Global variables
const queue = [];
const userMap = new Map(); // Map for fast lookups by unique ID

// Add user to queue
function addToQueue() {
  const userName = document.getElementById('userName').value.trim();
  const userId = document.getElementById('userId').value.trim();
  const userType = document.getElementById('userType').value;

  if (!userName || !userId) {
    alert("Please enter both a name and a unique ID.");
    return;
  }

  if (userMap.has(userId)) {
    alert("This unique ID is already in the queue.");
    return;
  }

  const user = { id: userId, name: userName, type: userType };

  if (userType === "vvip") {
    queue.unshift(user); // Add VVIPs to the front of the queue
  } else {
    queue.push(user);
  }

  userMap.set(userId, user); // Add to Map for quick lookup
  updateQueueDisplay();
  document.getElementById('userName').value = ""; // Clear inputs
  document.getElementById('userId').value = "";
}

// Issue next ticket
function issueTicket() {
  if (queue.length === 0) {
    alert("No users in the queue.");
    return;
  }

  const nextUser = queue.shift();
  userMap.delete(nextUser.id); // Remove from Map
  document.getElementById('issuedTicket').innerText = `Name: ${nextUser.name}, ID: ${nextUser.id}, Type: ${nextUser.type}`;
  updateQueueDisplay();
}

// Withdraw ticket
function withdrawTicket() {
  const withdrawId = document.getElementById('withdrawId').value.trim();

  if (!withdrawId) {
    alert("Please enter a valid unique ID.");
    return;
  }

  if (!userMap.has(withdrawId)) {
    alert("No user found with this unique ID.");
    return;
  }

  // Find and remove user from the queue
  const userIndex = queue.findIndex(user => user.id === withdrawId);
  if (userIndex !== -1) {
    queue.splice(userIndex, 1);
    userMap.delete(withdrawId); // Remove from Map
    alert(`User with ID ${withdrawId} has been withdrawn from the queue.`);
    updateQueueDisplay();
  }
}

// Update the waiting list display
function updateQueueDisplay() {
  const waitingList = document.getElementById('waitingList');
  waitingList.innerHTML = "";

  if (queue.length === 0) {
    waitingList.innerHTML = "<li>No one in the queue yet. Be the first!</li>";
    return;
  }

  queue.forEach(user => {
    const li = document.createElement('li');
    li.innerText = `Name: ${user.name}, ID: ${user.id} (${user.type})`;
    if (user.type === "vvip") li.classList.add('vvip');
    waitingList.appendChild(li);
  });
}
