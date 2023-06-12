document.addEventListener("DOMContentLoaded", function () {
  var sendButton = document.getElementsByClassName("send-button")[0];
  var messageInput = document.getElementsByClassName("message-input")[0];
  var messageList = document.getElementsByClassName("message-list")[0];

  function sendMessage() {
    var messageText = messageInput.value.trim();

    if (messageText !== "") {
      var messageDiv = document.createElement("div");
      messageDiv.className = "message";

      var senderImage = document.createElement("img");
      senderImage.src = "https://theoita.com/wp-content/uploads/2019/09/00111217_008-1.jpg";
      senderImage.alt = "User1";

      var senderPhotoDiv = document.createElement("div");
      senderPhotoDiv.className = "sender-photo";
      senderPhotoDiv.appendChild(senderImage);

      var senderDiv = document.createElement("div");
      senderDiv.className = "sender right";
      senderDiv.appendChild(senderPhotoDiv);

      var contentDiv = document.createElement("div");
      contentDiv.className = "content";
      contentDiv.textContent = messageText;

      var sameSenderMessages = messageList.getElementsByClassName("same-sender");
      if (sameSenderMessages.length > 0) {
        var lastSameSenderMessage = sameSenderMessages[sameSenderMessages.length - 1];
        var senderDiv = lastSameSenderMessage.querySelector(".sender");
        senderDiv.style.display = "none";
      }

      messageDiv.appendChild(senderDiv);
      messageDiv.appendChild(contentDiv);
      messageList.appendChild(messageDiv);
      messageInput.value = "";
      messageList.scrollTop = messageList.scrollHeight;
    }
  }

  messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

  sendButton.addEventListener("click", function () {
    sendMessage();

    var messageText = messageInput.value.trim();

    fetch("/get_variable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageText }),
    })
      .then((response) => response.json())
      .then((data) => {
        var messageDiv = document.createElement("div");
        messageDiv.className = "answer";

        var senderImage = document.createElement("img");
        senderImage.src = "https://example.com/user2.jpg"; // User2の画像のURLを設定
        senderImage.alt = "User2";

        var senderPhotoDiv = document.createElement("div");
        senderPhotoDiv.className = "sender-photo";
        senderPhotoDiv.appendChild(senderImage);

        var senderDiv = document.createElement("div");
        senderDiv.className = "sender left";
        senderDiv.appendChild(senderPhotoDiv);

        var contentDiv = document.createElement("div");
        contentDiv.className = "content";
        contentDiv.textContent = data.variable;

        messageDiv.appendChild(senderDiv);
        messageDiv.appendChild(contentDiv);
        messageList.appendChild(messageDiv);
        messageInput.value = "";
        messageList.scrollTop = messageList.scrollHeight;
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
});
