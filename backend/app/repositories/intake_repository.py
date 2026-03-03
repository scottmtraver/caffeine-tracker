from datetime import date, datetime, time, timedelta

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.caffeine_intake import CaffeineIntake
from app.schemas.caffeine_intake import IntakeCreate


async def create(db: AsyncSession, obj_in: IntakeCreate) -> CaffeineIntake:
    intake = CaffeineIntake(**obj_in.model_dump())
    db.add(intake)
    await db.flush()
    await db.refresh(intake)
    return intake


async def get_by_date_range(
    db: AsyncSession, start_date: date, end_date: date
) -> list[CaffeineIntake]:
    start_dt = datetime.combine(start_date, time.min)
    end_dt = datetime.combine(end_date + timedelta(days=1), time.min)
    result = await db.execute(
        select(CaffeineIntake)
        .where(CaffeineIntake.intake_datetime >= start_dt)
        .where(CaffeineIntake.intake_datetime < end_dt)
        .order_by(CaffeineIntake.intake_datetime.desc())
    )
    return list(result.scalars().all())
