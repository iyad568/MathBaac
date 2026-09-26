from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class CamelModel(BaseModel):
    """Base for schemas exposed as camelCase JSON to match the frontend's field naming."""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)
