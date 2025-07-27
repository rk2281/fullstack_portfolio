from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from typing import List, Optional

app = FastAPI(title="Rachit Kapoor Portfolio API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ProjectInfo(BaseModel):
    id: str
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None

# Sample data for projects
PROJECTS_DATA = [
    {
        "id": "music-player",
        "title": "Music Player",
        "description": "A PHP-MySQL based system for music playback with features like mute, volume control, and user login functionality.",
        "technologies": ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
        "github_url": "https://github.com/rk2281",
        "demo_url": None,
        "image_url": None
    },
    {
        "id": "food-ordering",
        "title": "Food Ordering Website",
        "description": "A fully responsive HTML/CSS-based food delivery platform with comprehensive user registration system.",
        "technologies": ["HTML", "CSS", "JavaScript", "Bootstrap", "Responsive Design"],
        "github_url": "https://github.com/rk2281",
        "demo_url": None,
        "image_url": None
    },
    {
        "id": "roll-a-die-game",
        "title": "Roll A Die Game",
        "description": "An interactive dice rolling game built with engaging user interface and game mechanics.",
        "technologies": ["HTML", "CSS", "JavaScript", "Game Development"],
        "github_url": "https://github.com/rk2281",
        "demo_url": "https://rk2281.github.io/roll_a_die_game/",
        "image_url": None
    }
]

TECHNOLOGIES_DATA = [
    {"name": "React", "category": "Frontend", "level": "Advanced"},
    {"name": "PHP", "category": "Backend", "level": "Advanced"},
    {"name": "JavaScript", "category": "Programming", "level": "Advanced"},
    {"name": "MySQL", "category": "Database", "level": "Intermediate"},
    {"name": "Bootstrap", "category": "CSS Framework", "level": "Advanced"},
    {"name": "HTML", "category": "Markup", "level": "Expert"},
    {"name": "CSS", "category": "Styling", "level": "Advanced"},
    {"name": "Python", "category": "Programming", "level": "Intermediate"},
    {"name": "GitHub", "category": "Version Control", "level": "Advanced"},
    {"name": "AWS Cloud Services", "category": "Cloud", "level": "Intermediate"},
    {"name": "UI/UX Design", "category": "Design", "level": "Intermediate"},
    {"name": "Streamlit", "category": "Framework", "level": "Intermediate"},
    {"name": "CodeIgniter", "category": "Framework", "level": "Intermediate"},
    {"name": "OpenCV", "category": "AI/ML", "level": "Intermediate"},
    {"name": "Numpy", "category": "AI/ML", "level": "Intermediate"},
    {"name": "Pandas", "category": "AI/ML", "level": "Intermediate"},
    {"name": "MySQL Workbench", "category": "Database Tools", "level": "Intermediate"},
    {"name": "phpMyAdmin", "category": "Database Tools", "level": "Advanced"},
    {"name": "Email on Acid", "category": "Email Tools", "level": "Intermediate"},
    {"name": "Putsmail", "category": "Email Tools", "level": "Intermediate"},
    {"name": "Python Colab", "category": "Development Tools", "level": "Advanced"},
    {"name": "Jupyter Notebook", "category": "Development Tools", "level": "Advanced"},
    {"name": "VS Code", "category": "Development Tools", "level": "Expert"},
    {"name": "AI Tools", "category": "AI/ML", "level": "Intermediate"}
]

@app.get("/")
async def root():
    return {"message": "Rachit Kapoor Portfolio API", "status": "active"}

@app.get("/api/projects")
async def get_projects():
    """Get all projects"""
    return {"projects": PROJECTS_DATA}

@app.get("/api/projects/{project_id}")
async def get_project(project_id: str):
    """Get a specific project by ID"""
    project = next((p for p in PROJECTS_DATA if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"project": project}

@app.get("/api/technologies")
async def get_technologies():
    """Get all technologies"""
    return {"technologies": TECHNOLOGIES_DATA}

@app.post("/api/contact")
async def submit_contact(contact: ContactMessage):
    """Submit a contact form message"""
    # In a real application, you would save this to a database or send an email
    print(f"Contact message received from {contact.name} ({contact.email})")
    print(f"Subject: {contact.subject}")
    print(f"Message: {contact.message}")
    
    return {
        "status": "success",
        "message": "Thank you for your message! I'll get back to you soon."
    }

@app.get("/api/profile")
async def get_profile():
    """Get profile information"""
    return {
        "profile": {
            "name": "Rachit Kapoor",
            "title": "Front-End Developer",
            "bio": "Proficient Front-End Developer with hands-on experience in full-stack development. Passionate about Generative AI and continuous learning.",
            "photo_url": "https://drive.google.com/uc?export=view&id=1435Jiu-4FbjKJ67-XVBj11Kt1_FXESP7",
            "resume_url": "https://drive.google.com/file/d/1LNp08GZwL9EPKHrzIPsKVUcHe6CbHNcl/view",
            "contact": {
                "email": "rachitkapoor2281@gmail.com",
                "github": "https://github.com/rk2281",
                "linkedin": "https://www.linkedin.com/in/rachitkapoor1/"
            }
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)