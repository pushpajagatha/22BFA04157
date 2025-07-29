import { useState } from "react";


export default function ShortenerPage() {
  const [url, setUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!url || !url.startsWith("http")) {
      setError("Please enter a valid URL");
      
      return;
    }

    const payload = {
      url,
    };

    try {
     // public API for demonstration
      const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (data.ok) {
        setShortenedUrls((prev) => [
          ...prev,
          { original: url, short: data.result.full_short_link }
        ]);
        setError("");
       
      } else {
        setError("Failed to shorten URL");

      }
    } catch (e) {
      setError("Failed to shorten URL");
    
    }
  };

  return (
    <div className="container">
      <h2>URL Shortener</h2>
      <input type="text" placeholder="Enter long URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <input type="text" placeholder="Shortened URL will appear here" value={shortenedUrls.map(item => item.short).join(", ")} readOnly />
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