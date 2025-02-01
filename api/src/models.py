from typing import Annotated, List, Optional
from pydantic import BaseModel, BeforeValidator
from pydantic.fields import Field
from enums import ProductType, SkinType

PyObjectId = Annotated[str, BeforeValidator(str)]

class ProductModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    brand: str
    name: str
    active_ingredients: List[str]
    skin_type: SkinType
    product_type: ProductType
    price: float

    class Config:
        use_enum_values = True

class UpdateProductModel(BaseModel):
    brand: str
    name: str
    active_ingredients: List[str]
    skin_type: SkinType
    product_type: ProductType
    price: float

    class Config:
        use_enum_values = True

