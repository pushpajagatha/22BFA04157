import { useState } from "react";
//import { Log } from "../utils/logger";

export default function ShortenerPage() {
  const [url, setUrl] = useState("");
  // Removed validity and shortcode state
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!url || !url.startsWith("http")) {
      setError("Please enter a valid URL");
      Log("ShortenerPage", "error", "Validation", "Invalid URL entered");
      return;
    }

    const payload = {
      url,
      // Removed shortcode from payload
    };

    try {
      const res = await fetch("https://your-api-endpoint.com/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setShortenedUrls((prev) => [...prev, data]);
      setError("");
      Log("ShortenerPage", "info", "URLShortener", "Shortened URL successfully");
    } catch (e) {
      setError("Failed to shorten URL");
      Log("ShortenerPage", "error", "URLShortener", "Shorten failed");
    }
  };

  return (
    <div className="container">
      <h2>URL Shortener</h2>
      <input type="text" placeholder="Enter long URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      {/* Removed validity and custom shortcode input */}
      <button onClick={handleSubmit}>Shorten</button>
      {error && <div className="error">{error}</div>}

      {shortenedUrls.map((item, index) => (
        <div key={index} className="result">
          <p><strong>Original:</strong> {item.original}</p>
          <p><strong>Short:</strong> {item.short}</p>
          {/* Optionally remove or update the "Expires in" line if not needed */}
        </div>
      ))}
    </div>
    );
}