const ENV = "development"; // development || production || testing ngrok
const PUBLIC_URL =
  ENV === "development" ? "http://localhost:3000" : "https://api.example.com";

document.getElementById("image-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("image-upload").files[0];
  const urlInput = document.getElementById("image-url");
  const apiSelect = document.getElementById("api-select");
  const resultDiv = document.getElementById("result");
  const captionContainer = document.getElementById("caption-container");
  const loadingOverlay = document.getElementById("loading-overlay");
  let response;

  loadingOverlay.classList.remove("d-none");

  try {
    const apiChoice = apiSelect.value;

    if (fileInput) {
      response = await callAnalysePictureAPI(fileInput, apiChoice);
    } else if (urlInput.value) {
      response = await callAnalysePictureAPI(urlInput.value, apiChoice, true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please upload an image or provide a URL.!",
      });
      return;
    }

    captionContainer.innerHTML = resultDataHtml(response);
    resultDiv.classList.remove("d-none");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        error.message ||
        "An unexpected error occurred. Please try again later.",
    });
  } finally {
    loadingOverlay.classList.add("d-none");
  }
});

document.getElementById("input-switch").addEventListener("change", (event) => {
  const isUrlMode = event.target.checked;
  const uploadContainer = document.getElementById("upload-container");
  const urlContainer = document.getElementById("url-container");

  if (isUrlMode) {
    uploadContainer.classList.add("d-none");
    urlContainer.classList.remove("d-none");
    document.getElementById("image-upload").value = "";
  } else {
    uploadContainer.classList.remove("d-none");
    urlContainer.classList.add("d-none");
    document.getElementById("image-url").value = "";
  }
});

async function callAnalysePictureAPI(imageData, apiChoice, isUrl = false) {
  try {
    let body = new FormData();
    body.append("typeServices", apiChoice);
    if (isUrl) {
      body.append("imageUrl", imageData);
    } else {
      body.append("imageFile", imageData);
    }

    const response = await fetch(`${PUBLIC_URL}/api/analyze`, {
      method: "POST",
      body: body,
    });

    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      throw new Error(
        data.errors?.map((e) => e.msg).join(", ") ||
          "Error processing the request"
      );
    }
  } catch (error) {
    throw error;
  }
}

function resultDataHtml(data) {
  return data
    .map((item) => {
      const progressClass =
        item.confidence >= 85
          ? "bg-success"
          : item.confidence >= 79
          ? "bg-warning"
          : "bg-danger";

      const confidencePercentage = Number(item.confidence);

      return `
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Name: ${item.name}</h5>
            <p class="card-text">
              Confidence: <strong>${confidencePercentage}%</strong>
            </p>
            <div class="progress">
              <div 
                class="progress-bar ${progressClass}" 
                role="progressbar" 
                style="width: ${confidencePercentage}%" 
                aria-valuenow="${confidencePercentage}" 
                aria-valuemin="0" 
                aria-valuemax="100">
                ${confidencePercentage}%
              </div>
            </div>
          </div>
        </div>
    `;
    })
    .join("");
}
