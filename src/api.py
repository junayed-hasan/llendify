from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from .analysis_pipeline import summarize_text, consolidate_summary
import os
import logging

# Configure logging for debugging
logging.basicConfig(level=logging.ERROR)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_pdf(file: UploadFile):
    try:
        # Save the uploaded file temporarily
        temp_path = "temp_statement.pdf"
        with open(temp_path, "wb") as f:
            f.write(await file.read())

        # Run the analysis pipeline
        chunk_summaries = summarize_text(temp_path)
        final_report = consolidate_summary(chunk_summaries)

        # Return the analysis as a JSON response
        return JSONResponse(content={"report": final_report})
    except Exception as e:
        logging.error(f"Error during analysis: {str(e)}")  # Log the error
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    finally:
        # Cleanup the temporary file
        if os.path.exists(temp_path):
            os.remove(temp_path)
