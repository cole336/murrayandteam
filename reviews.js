(function () {

  const container = document.getElementById("cm-google-reviews");
  if (!container) return;

  // ---- CONFIG ----
  const placeId = "ChIJtQuRYeGr3IgR3b0lniVBwMM";
  const apiKey = "AIzaSyAiLLcwEE7aAOb7s1GHdoCJz1jQIuIHguE"; // <-- replace this

  // Loading state
  container.innerHTML = `
    <div style="padding:40px;text-align:center;font-family:Arial;">
      Loading reviews...
    </div>
  `;

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating&key=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {

      const reviews = data?.result?.reviews;

      if (!reviews || reviews.length === 0) {
        container.innerHTML = `
          <div style="padding:40px;text-align:center;font-family:Arial;">
            No reviews available.
          </div>
        `;
        return;
      }

      const html = `
        <section style="padding:60px 20px;background:#f6f6f6;">
          <div style="max-width:1100px;margin:auto;text-align:center;">

            <h2 style="font-size:32px;margin-bottom:10px;color:#1f4f46;">
              What Clients Are Saying
            </h2>

            <p style="color:#666;margin-bottom:40px;">
              Real Google reviews from past clients
            </p>

            <div style="
              display:grid;
              grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
              gap:20px;
            ">

              ${reviews.slice(0, 6).map(r => `
                <div style="
                  background:#fff;
                  padding:20px;
                  border-radius:12px;
                  box-shadow:0 10px 25px rgba(0,0,0,0.08);
                  text-align:left;
                  font-family:Arial;
                ">

                  <div style="color:#f5b50a;margin-bottom:10px;">
                    ${"★".repeat(r.rating || 5)}
                  </div>

                  <p style="font-size:14px;line-height:1.6;color:#333;">
                    ${r.text || ""}
                  </p>

                  <div style="margin-top:12px;font-weight:bold;color:#1f4f46;">
                    — ${r.author_name || "Client"}
                  </div>

                </div>
              `).join("")}

            </div>

            <div style="margin-top:40px;">
              <a href="https://search.google.com/local/reviews?placeid=${placeId}"
                 target="_blank"
                 style="
                   display:inline-block;
                   padding:12px 24px;
                   background:#1f4f46;
                   color:#fff;
                   text-decoration:none;
                   border-radius:6px;
                   font-weight:bold;
                 ">
                Read More Reviews on Google
              </a>
            </div>

          </div>
        </section>
      `;

      container.innerHTML = html;

    })
    .catch(err => {
      console.error("Google Reviews Error:", err);
      container.innerHTML = `
        <div style="padding:40px;text-align:center;color:red;">
          Failed to load reviews.
        </div>
      `;
    });

})();
