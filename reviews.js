(function () {
  const placeId = "ChIJtQuRYeGr3IgR3b0lniVBwMM";
  const apiKey = "YOUR_GOOGLE_API_KEY";

  const container = document.getElementById("cm-google-reviews");

  fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
  )
    .then(res => res.json())
    .then(data => {
      const reviews = data.result.reviews || [];

      let html = `
        <div style="display:grid;gap:20px;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));">
      `;

      reviews.slice(0, 6).forEach(r => {
        html += `
          <div style="background:#fff;padding:20px;border-radius:12px;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
            <div style="color:#f5b50a;">${"★".repeat(r.rating)}</div>
            <p>${r.text}</p>
            <strong>${r.author_name}</strong>
          </div>
        `;
      });

      html += `</div>`;

      container.innerHTML = html;
    });
})();
