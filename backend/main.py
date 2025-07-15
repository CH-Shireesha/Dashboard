import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from dotenv import load_dotenv
import certifi

# Load .env
env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(env_path)

MONGO_URI = os.getenv("MONGO_URI")

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
try:
    client = MongoClient(MONGO_URI, tlsCAFile=certifi.where(), serverSelectionTimeoutMS=5000)
    db = client.get_database("dashboard")
    collection = db.get_collection("records")  # make sure this is the correct collection name
    # Force ping to test connection
    client.admin.command("ping")
    print("✅ Connected to MongoDB Atlas")
except Exception as e:
    print("❌ MongoDB connection failed:", e)
    collection = None

@app.get("/data")
def get_data():
    if collection is None:
        return {"error": "No database connection"}
    data = list(collection.find({}, {"_id": 0}))
    return data
