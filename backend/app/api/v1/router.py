from fastapi import APIRouter

from app.api.v1.endpoints import intake

api_router = APIRouter()
api_router.include_router(intake.router, prefix="/intake", tags=["intake"])
