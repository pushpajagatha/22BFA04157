import { useState } from "react";
// import { Log } from "../utils/logger"; // Make sure to import Log if you use it

export default function ShortenerPage() {
  const [url, setUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!url || !url.startsWith("http")) {
      setError("Please enter a valid URL");
      // Log("ShortenerPage", "error", "Validation", "Invalid URL entered"); // Uncomment if Log is defined
      return;
    }

    const payload = {
      url,
    };

    try {
      // Example using shrtco.de public API for demonstration
      const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (data.ok) {
        setShortenedUrls((prev) => [
          ...prev,
          { original: url, short: data.result.full_short_link }
        ]);
        setError("");
        // Log("ShortenerPage", "info", "URLShortener", "Shortened URL successfully"); // Uncomment if Log is defined
      } else {
        setError("Failed to shorten URL");
        // Log("ShortenerPage", "error", "URLShortener", "Shorten failed"); // Uncomment if Log is defined
      }
    } catch (e) {
      setError("Failed to shorten URL");
      // Log("ShortenerPage", "error", "URLShortener", "Shorten failed"); // Uncomment if Log is defined
    }
  };

  return (
    <div className="container">
      <h2>URL Shortener</h2>
      <input type="text" placeholder="Enter long URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={handleSubmit}>Shorten</button>
      {error && <div className="error">{error}</div>}

      {shortenedUrls.map((item, index) => (
        <div key={index} className="result">
          <p><strong>Original:</strong> {item.original}</p>
          <p><strong>Short:</strong> {item.short}</p>
        </div>
      ))}
    </div>
  );
}