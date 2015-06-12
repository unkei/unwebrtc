WebRTC trial
============
WebRTC on browser with simple signalling

1. running a simple node websocket server to signal SDP and ICE candidates.
2. run `python -m SimpleHTTPServer` in ./www
3. run `node signalling.js` in ./
4. open two browsers with the same URL, http://localhost:8000/.
5. press **Start video** button in both browsers
6. press **Connect** button in both browsers
7. SDP and ICE candidates were exchanged via web socket and web rtc started!!

reference
---------
- [WebRTC初心者でも簡単にできる！Node.jsで仲介（シグナリング）を作ってみよう | HTML5Experts.jp](https://html5experts.jp/mganeko/5349/)

---
[Markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
