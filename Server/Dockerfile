# server/Dockerfile

FROM python:3.11-slim

# Set workdir
WORKDIR /app

# Install dependencies
COPY Server/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY Server/ .

# Run FastAPI app using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
