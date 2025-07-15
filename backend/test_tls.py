from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

uri = os.getenv("MONGO_URI")
print("📡 Connecting to MongoDB...")

try:
    client = MongoClient(uri, serverSelectionTimeoutMS=5000)
    client.admin.command("ping")
    print("✅ Successfully connected to MongoDB Atlas!")
except Exception as e:
    print("❌ Connection failed:", e)