from typing import Annotated, List, Optional
from pydantic import BaseModel, BeforeValidator
from pydantic.fields import Field
from enums import ProductType, SkinType

PyObjectId = Annotated[str, BeforeValidator(str)]

class TokenModel(BaseModel):
    access_token: str
    token_type: str

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

class UserModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    email: str
    first_name: str
    last_name: str
    password: str # will be hashed
    product_list: List[PyObjectId] = Field(alias="product_list", default=[])

class UpdateUserModel(BaseModel):
    email: str
    first_name: str
    last_name: str
    password: str
    product_list: List[PyObjectId] = Field(alias="product_list", default=[])

class LoginModel(BaseModel):
    email: str
    password: str
