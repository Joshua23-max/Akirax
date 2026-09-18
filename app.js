const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const chat = document.getElementById("chat");
const typing = document.getElementById("typing");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");

  input.value = "";

  typing.style.display = "block";

  setTimeout(() => {
    typing.style.display = "none";

    const reply = getAkiraReply(text);

    addMessage(reply, "ai");

  }, 1000);
});

function addMessage(text, type) {

  const message = document.createElement("div");

  message.className = `message ${type}`;

  const bubble = document.createElement("div");

  bubble.className = "bubble";

  bubble.textContent = text;

  message.appendChild(bubble);

  chat.appendChild(message);

  chat.scrollTop = chat.scrollHeight;
}

function getAkiraReply(message) {

  const text = message.toLowerCase();

  if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
    return "Heyyy! ✨ I was waiting for you! What's up?";
  }

  if (text.includes("name")) {
    return "I'm Akira! Your little AI companion. ✨";
  }

  if (text.includes("how are you")) {
    return "I'm doing great! 🌟 What about you?";
  }

  if (text.includes("bored")) {
    return "Bored?! 😤 Nope, we're fixing that. Tell me something random!";
  }

  if (text.includes("anime")) {
    return "Anime? Now you're speaking my language! 👀✨";
  }

  return "Hmm... that's interesting. Tell me more! ✨";
}
