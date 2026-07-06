import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# API routes
@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/test_data")
def get_test_data():
    return {"data": ["item1", "item2", "item3"]}

# Serve frontend build if it exists
frontend_build_path = "frontend/build"
if os.path.isdir(frontend_build_path):
    app.mount("/static", StaticFiles(directory=os.path.join(frontend_build_path, "static")),
              name="static")

    @app.get("/{*path}")
    def serve_frontend(path: str = ""):
        # This route handles all requests not matching API routes
        # and serves the index.html for the React app.
        return FileResponse(os.path.join(frontend_build_path, "index.html"))

else:
    # If frontend build is not found, provide a fallback or raise an error
    # For testing purposes, we'll just let FastAPI handle missing routes
    # or you could add a placeholder HTML response here.
    pass
