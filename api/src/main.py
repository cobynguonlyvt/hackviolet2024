import pymongo
from fastapi import FastAPI
from models import ProductModel, UpdateProductModel

client = pymongo.MongoClient("mongodb://localhost:27017")
db = client["skincare"]
print(client.list_database_names())

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello world!"}

@app.get("/products")
async def get_products():
    collection = db["products"]
    documents = collection.find()
    products = [ProductModel.model_validate(document) for document in documents]
    return products

@app.post("/products")
async def post_products(product: UpdateProductModel): # model validation happens automatically
    collection = db["products"]
    product_dict = product.dict(by_alias=True)
    result = collection.insert_one(product_dict)

    return {
            "id": str(result.inserted_id)
    }


