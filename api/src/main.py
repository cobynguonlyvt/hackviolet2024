from datetime import datetime, timedelta, timezone
from bson.objectid import ObjectId
import pymongo
import jwt
from fastapi import Depends, FastAPI, HTTPException, Request, Response
from models import ProductModel, UpdateProductModel, UserModel, LoginModel, UpdateUserModel, TokenModel
from passlib.context import CryptContext

SECRET_KEY = "3257947e5db6aadfa26588f657166dc1f1c4581e4bacee3754205a7fb4686f76"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
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
    product_dict = product.model_dump(by_alias=True)
    result = collection.insert_one(product_dict)

    return {
            "id": str(result.inserted_id)
    }

@app.post("/register")
async def register_user(user: UpdateUserModel):
    collection = db["users"]

    # store hashed password not raw text
    hashed_pw = pwd_context.hash(user.password)
    user_dict = user.model_dump(by_alias=True)
    user_dict["password"] = hashed_pw

    result = collection.insert_one(user_dict)
    return {
        "id": str(result.inserted_id)
    }

@app.post("/login")
async def login_user(response: Response, login_info: LoginModel):
    invalid = HTTPException(
                    status_code=401,
                    detail="Incorrect username or password",
                    headers={"WWW-Authenticate": "Bearer"})

    collection = db["users"]
    try:
        user = UserModel.model_validate(collection.find_one({"email": login_info.email}))
        if pwd_context.verify(login_info.password, user.password):
            token = create_access_token({"sub": str(user.id)})
            response.set_cookie(
                key="access_token",
                value=token,
                httponly=True,
                secure=True,
                samesite="lax"
            )

            return TokenModel(access_token=token, token_type="bearer")
            
        else:
            raise invalid

    except Exception as e:
        print(e)
        raise invalid

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expires = datetime.now(timezone.utc) + timedelta(ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expires})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(request: Request) -> UserModel:
    invalid = HTTPException(status_code=401, detail="Invalid")
    token = request.cookies.get("access_token")
    if not token:
        print("1")
        raise invalid

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            print("2")
            raise invalid

        collection = db["users"]
        user = UserModel.model_validate(collection.find_one({"_id": ObjectId(user_id)}))
        return user

    except Exception as e:
        print(e)
        raise invalid

@app.get("/profile")
async def get_profile(user: UserModel = Depends(get_current_user)):
    return {"user": user}

@app.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully"}

@app.get("/profile/products")
async def get_profile_products(user: UserModel = Depends(get_current_user)):
    collection = db["products"]
    products = []

    for id in user.product_list:
        products.append(ProductModel.model_validate(collection.find_one({"_id": ObjectId(id)})))

    return {"products": products}

@app.post("/profile/products")
async def post_profile_products(product_id: str, user: UserModel = Depends(get_current_user)):
    collection = db["users"]

    result = collection.update_one(
        {
            "_id": ObjectId(user.id)
        },
        {
                "$addToSet": {"product_list": ObjectId(product_id)}
        }
    )

    return {"message": "Added product"}

@app.delete("/profile/products")
async def delete_profile_products(product_id: str, user: UserModel = Depends(get_current_user)):
    collection = db["users"]

    result = collection.update_one(
        {
            "_id": ObjectId(user.id)
        },
        {
                "$pull": {"product_list": ObjectId(product_id)}
        }
    )

    return {"message": "Deleted product"}
