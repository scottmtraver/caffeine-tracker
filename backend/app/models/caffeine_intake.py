from sqlalchemy import Integer, DateTime, CheckConstraint, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class CaffeineIntake(Base):
    __tablename__ = "caffeine_intake"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    intake_datetime: Mapped[DateTime] = mapped_column(DateTime, nullable=False, index=True)
    amount_mg: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime, server_default=func.now(), onupdate=func.now()
    )

    __table_args__ = (CheckConstraint("amount_mg > 0"),)
