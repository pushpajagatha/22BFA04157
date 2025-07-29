import { useState } from "react";
//import { Log } from "../utils/logger";

export default function ShortenerPage() {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [shortcode, setShortcode] = useState("");
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
      validity: validity ? parseInt(validity) : 30,
      shortcode: shortcode || undefined,
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
      <input type="number" placeholder="Validity (minutes)" value={validity} onChange={(e) => setValidity(e.target.value)} />
      <input type="text" placeholder="Custom shortcode (optional)" value={shortcode} onChange={(e) => setShortcode(e.target.value)} />
      <button onClick={handleSubmit}>Shorten</button>
      {error && <div className="error">{error}</div>}

      {shortenedUrls.map((item, index) => (
        <div key={index} className="result">
          <p><strong>Original:</strong> {item.original}</p>
          <p><strong>Short:</strong> {item.short}</p>
          <p><strong>Expires in:</strong> {item.validity} mins</p>
        </div>
      ))}
    </div>
  );
}