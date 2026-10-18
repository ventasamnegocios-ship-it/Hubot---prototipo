const form = document.querySelector("#chat-form");
const input = document.querySelector("#message");
const sendButton = document.querySelector("#send");
const messages = document.querySelector("#messages");
const welcome = document.querySelector("#welcome");
const errorBox = document.querySelector("#error");
let sessionId = null;
let busy = false;

function showConversation() {
  welcome.hidden = true;
  messages.hidden = false;
}
function addMessage(role, text) {
  showConversation();
  const row = document.createElement("div");
  row.className = `message ${role}`;
  if (role === "assistant") {
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.innerHTML = 'H<span>•</span>';
    const content = document.createElement("div");
    content.className = "message-content";
    const label = document.createElement("div");
    label.className = "message-label";
    label.textContent = "HUBot · Asesor virtual";
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;
    content.append(label, bubble);
    row.append(avatar, content);
  } else {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;
    row.append(bubble);
  }
  messages.append(row);
  row.scrollIntoView({ behavior: "smooth", block: "nearest" });
  return row;
}
function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
}
async function sendMessage(text) {
  const clean = text.trim();
  if (!clean || busy) return;
  busy = true;
  errorBox.hidden = true;
  sendButton.disabled = true;
  input.disabled = true;
  addMessage("user", clean);
  input.value = "";
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.textContent = "HUBot está analizando tu consulta…";
  messages.append(typing);
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: clean, sessionId })
    });
    const data = await response.json().catch(() => ({}));
    typing.remove();
    if (!response.ok) throw new Error(data.error || "No se pudo completar la consulta.");
    sessionId = data.sessionId;
    addMessage("assistant", data.answer || "No recibí una respuesta. Intenta nuevamente.");
  } catch (error) {
    typing.remove();
    showError(error.message || "Ocurrió un error de conexión. Intenta nuevamente.");
  } finally {
    busy = false;
    sendButton.disabled = false;
    input.disabled = false;
    input.focus();
  }
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(input.value);
});
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});
document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => sendMessage(button.dataset.prompt));
});
