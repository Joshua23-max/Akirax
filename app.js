const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const chat = document.getElementById("chat");
const typing = document.getElementById("typing");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");

  input.value = "";
  input.disabled = true;

  typing.style.display = "block";

  try {
    const response = await fetch(
      "https://YOUR-VERCEL-BACKEND.vercel.app/api/chat",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message: text
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI request failed");
    }

    addMessage(data.reply, "ai");

  } catch (error) {

    console.error(error);

    addMessage(
      "Sorry 😭 Akira's AI connection isn't working right now.",
      "ai"
    );

  } finally {

    typing.style.display = "none";
    input.disabled = false;
    input.focus();

  }
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
