from datetime import datetime

from pydantic import BaseModel, Field, ConfigDict


class IntakeCreate(BaseModel):
    intake_datetime: datetime
    amount_mg: int = Field(gt=0)


class IntakeResponse(BaseModel):
    id: int
    intake_datetime: datetime
    amount_mg: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
