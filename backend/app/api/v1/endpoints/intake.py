from datetime import date, timedelta

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.caffeine_intake import IntakeCreate, IntakeResponse
from app.services import intake_service

router = APIRouter()


@router.post("/", status_code=201, response_model=IntakeResponse)
async def create_intake(
    intake_in: IntakeCreate,
    db: AsyncSession = Depends(get_db),
):
    return intake_service.create_intake(db, intake_in)


@router.get("/", response_model=list[IntakeResponse])
async def list_intakes(
    start_date: date = Query(default_factory=lambda: date.today() - timedelta(days=14)),
    end_date: date = Query(default_factory=lambda: date.today()),
    db: AsyncSession = Depends(get_db),
):
    return await intake_service.list_intakes(db, start_date, end_date)
