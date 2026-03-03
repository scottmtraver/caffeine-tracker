from datetime import date

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.caffeine_intake import CaffeineIntake
from app.repositories import intake_repository
from app.schemas.caffeine_intake import IntakeCreate


async def create_intake(db: AsyncSession, intake_in: IntakeCreate) -> CaffeineIntake:
    return await intake_repository.create(db, intake_in)


async def list_intakes(
    db: AsyncSession, start_date: date, end_date: date
) -> list[CaffeineIntake]:
    return await intake_repository.get_by_date_range(db, start_date, end_date)
