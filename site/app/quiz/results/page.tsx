interface Answer {
    questionId: number;
    answer: string;
}

interface Product {
    id: string;
    brand: string;
    name: string;
    active_ingredients: string[];
    skin_type: string;
    product_type: string;
    price: number;
}

const ResultsPage = async ({ searchParams }: {searchParams: {answers: string}}) => {
    let parsed_answers: Answer[] = [];
    if (searchParams.answers) {
        try {
            // Decode the URL-encoded string and parse it as JSON
            parsed_answers = JSON.parse(decodeURIComponent(searchParams.answers));
        } catch (error) {
            console.error('Error parsing answers:', error);
        }
    }

    const response = await fetch('http://127.0.0.1:8000/products');
    const products: Product[] = await response.json();

    const filterProducts = (answers: Answer[], products: Product[]) => {
        return products.filter((product) => {
            // Filter by skin type
            const skinTypeAnswer = answers.find((answer) => answer.questionId === 1); // Skin type questionId
            const matchesSkinType = skinTypeAnswer ? product.skin_type.toLowerCase() === skinTypeAnswer.answer.toLowerCase(): true;

            // Filter by price range (assuming price range is questionId 3)
            const priceRangeAnswer = answers.find((answer) => answer.questionId === 3);
            const matchesPriceRange = priceRangeAnswer ? {
                "$25 - $50": product.price >= 25 && product.price <= 50,
                "$50 - $100": product.price >= 50 && product.price <= 100,
                "$100 - $200": product.price >= 100 && product.price <= 200,
                "$0 - $25": product.price >= 0 && product.price <= 25,
            }[priceRangeAnswer.answer] : true;

            // Filter by product type (e.g., cleanser, moisturizer)
            const productTypeAnswer = answers.find((answer) => answer.questionId === 2); // Product type questionId
            const matchesProductType = productTypeAnswer ? product.product_type.toLowerCase() === productTypeAnswer.answer.toLowerCase() : true;

            // Combine the filters
            return matchesSkinType && matchesPriceRange && matchesProductType;
        });
    };

    const filteredProducts = filterProducts(parsed_answers, products);
    console.log(filteredProducts);

    return (
        <div> 
            <h1>Quiz Results</h1>
            <h2>Your Answers:</h2>
            <ul>
                {parsed_answers.map((answer) => (
                    <li key={answer.questionId}>
                        Question {answer.questionId}: {answer.answer}
                    </li>
                ))}
            </ul>
            <h2>Recommended Products:</h2>
            <ul>
                {filteredProducts.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.brand} | ${product.price}
                    </li>
                ))}
            </ul>        
        </div>
    );
};

export default ResultsPage;
