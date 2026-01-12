
function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

function summarizeText(text) {
  if (!text || text.trim() === "") {
    return "Please enter some text.";
  }

  const url = "https://api.openai.com/v1/chat/completions";

  const payload = {
    model: "gpt-4o-mini",

    messages: [
      {
        role: "user",
        content: "Summarize the following text clearly:\n\n" + text
      }
    ],
    temperature: 0.3
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "Authorization": "Bearer " + OPENAI_API_KEY
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText());

    return data.choices[0].message.content;
  } catch (e) {
    return "Error: " + e.message;
  }
}
