from enum import Enum

class ProductType(Enum):
    CLEANSER = "cleanser"
    MOISTURIZER = "moisturizer"
    TONER = "toner"
    SERUM = "serum"
    SPOT = "spot treatment"

class SkinType(Enum):
    DRY = "dry"
    OILY = "oily"
    COMBINATION = "combo"
