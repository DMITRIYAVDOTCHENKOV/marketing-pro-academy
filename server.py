#!/usr/bin/env python3
"""Local-only launcher and file storage for Marketing PRO Academy."""

import argparse
import json
import os
import threading
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent
DATA_FILE = ROOT / "data" / "user_state.json"
MAX_BODY = 10 * 1024 * 1024


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def _json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/health":
            return self._json(200, {"ok": True, "storage": str(DATA_FILE.relative_to(ROOT))})
        if path == "/api/state":
            try:
                state = json.loads(DATA_FILE.read_text(encoding="utf-8")) if DATA_FILE.exists() else {}
                if not isinstance(state, dict):
                    state = {}
                return self._json(200, {"ok": True, "state": state})
            except (OSError, json.JSONDecodeError) as exc:
                return self._json(500, {"ok": False, "error": str(exc)})
        if path == "/":
            self.path = "/index.html"
        return super().do_GET()

    def do_POST(self):
        if urlparse(self.path).path != "/api/state":
            return self._json(404, {"ok": False, "error": "Not found"})
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > MAX_BODY:
                return self._json(413, {"ok": False, "error": "Invalid payload size"})
            state = json.loads(self.rfile.read(length).decode("utf-8"))
            if not isinstance(state, dict):
                return self._json(400, {"ok": False, "error": "State must be an object"})
            DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
            temporary = DATA_FILE.with_suffix(".tmp")
            temporary.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")
            os.replace(temporary, DATA_FILE)
            return self._json(200, {"ok": True})
        except (ValueError, UnicodeDecodeError, json.JSONDecodeError, OSError) as exc:
            return self._json(400, {"ok": False, "error": str(exc)})

    def log_message(self, fmt, *args):
        print(f"[Marketing PRO] {self.address_string()} — {fmt % args}")


def main():
    parser = argparse.ArgumentParser(description="Marketing PRO Academy local server")
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--no-browser", action="store_true")
    args = parser.parse_args()
    os.chdir(ROOT)
    server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    url = f"http://127.0.0.1:{args.port}/"
    print(f"Marketing PRO Academy запущена: {url}")
    print(f"Данные сохраняются: {DATA_FILE}")
    print("Для остановки нажмите Ctrl+C.")
    if not args.no_browser:
        threading.Timer(0.7, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nСервер остановлен.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
