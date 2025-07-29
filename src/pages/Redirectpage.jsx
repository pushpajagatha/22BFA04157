import React, { useState } from "react";
import "./ShortenerPage.css"; // for your vanilla CSS

const ShortenerPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!longUrl.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // logging middleware simulation
      console.log("Sending URL to backend:", longUrl);

      const response = await fetch("http://20.244.56.144/url/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();
      setShortUrl(data.shortUrl); // assuming the API returns { shortUrl: "..."}
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Short URL copied!");
  };

  return (
    <div className="shortener-container">
      <h2>URL Shortener</h2>

      <input
        type="text"
        value={longUrl}
        placeholder="Enter long URL"
        onChange={(e) => setLongUrl(e.target.value)}
      />

      <button onClick={handleShorten} disabled={loading}>
        {loading ? "Shortening..." : "Shorten"}
      </button>

      {error && <p className="error">{error}</p>}

      {shortUrl && (
        <div className="result">
          <p>Short URL: <a href={shortUrl}>{shortUrl}</a></p>
          <button onClick={handleCopy}>Copy</button>
        </div>
      )}
    </div>
  );
};

export default ShortenerPage;