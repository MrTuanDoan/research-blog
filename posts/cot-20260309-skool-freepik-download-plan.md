# /COT — Skool + Freepik Video Download Implementation Plan
Date: 2026-03-09

## Problem
yt-dlp fails on Skool community post URLs (Unsupported URL error).
Root cause: Skool uses Mux for video hosting. Community post URLs ≠ video URLs.
Need to extract Mux playback ID first, then download.

## Solution Architecture

### Pipeline 1 — Skool (via Mux)
```
Skool Post URL → Extract Mux playback_id → stream.mux.com/{id}.m3u8 → yt-dlp → MP4
```
3 approaches: Manual (DevTools), Semi-auto (OpenClaw), Full auto (Python script)

### Pipeline 2 — Freepik
```
Freepik Video URL + cookies → yt-dlp → MP4
```
Simpler — Freepik uses direct download links.

## Requirements
- yt-dlp v2024+ ✅
- ffmpeg (merge video+audio)
- cookies.txt Skool ✅ (auth valid until 2027)
- cookies.txt Freepik (need to export)
- Python 3.x (for automated script)

## Key Insight
Skool API endpoint: `/api/posts?slug={slug}&community={community}`
Returns JSON with `video.mux_playback_id`
Mux stream: `https://stream.mux.com/{playback_id}.m3u8`

## Files
- Script: D:\Skool-Downloads\skool_downloader.py
- Cookies: D:\Skool-Downloads\skool-cookies.txt ✅
- Output: D:\Skool-Downloads\ and D:\Freepik-Downloads\

## Next Actions
1. Manual: DevTools → filter "mux" → copy stream.mux.com URL → yt-dlp
2. Or: Attach Chrome tab to OpenClaw → auto-extract Mux URL
3. Build Python script for batch downloading
