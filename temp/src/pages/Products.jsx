import { useState, useEffect, useContext } from "react";
import FlipDeckGallery from "../components/FlipDeckGallery"; // Use new flip deck gallery
import AuthContext from "../context/AuthContext";

const CategoryFilter = ({ setSelectedCategory }) => {
  const categoryData = {
    Desert: ["Cacti", "Succulents", "Dry Flowers"],
    Mountain: ["Evergreens", "Alpine Flowers"],
    Tropical: ["Palms", "Orchids", "Ferns"],
    Forest: ["Maples", "Pine", "Birch"]
  };

  const [selectedCategory, setCategory] = useState("");
  const [selectedSubcategory, setSubcategory] = useState("");

  return (
    <>

      <select onChange={(e) => { setCategory(e.target.value); setSelectedCategory(e.target.value); }}>
        <option value="">Select Category</option>
        {Object.keys(categoryData).map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {selectedCategory && (
        <select onChange={(e) => setSubcategory(e.target.value)}>
          <option value="">Select Subcategory</option>
          {categoryData[selectedCategory].map(subcat => (
            <option key={subcat} value={subcat}>{subcat}</option>
          ))}
        </select>
      )}
    </>
  );
};

const Products = () => {
  const { token } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Purchase list state
  const [purchaseList, setPurchaseList] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(`/api/products?category=${selectedCategory}`, { headers });
      const data = await response.json();
      setProducts(data.length > 0 ? data : []);
      if (data.length > 0) setSelectedProduct(data[0]);
      else setSelectedProduct(null);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedProduct) {
      setTotalPrice(selectedProduct.price * selectedQty);
    } else {
      setTotalPrice(0);
    }
  }, [selectedProduct, selectedQty]);

  // Add selected product and quantity to purchase list
  const addToPurchaseList = () => {
    if (!selectedProduct) return;

    setPurchaseList((prevList) => {
      const existing = prevList.find(item => item.product._id === selectedProduct._id);
      if (existing) {
        // Update quantity and total price
        return prevList.map(item =>
          item.product._id === selectedProduct._id
            ? { ...item, quantity: item.quantity + selectedQty }
            : item
        );
      } else {
        return [...prevList, { product: selectedProduct, quantity: selectedQty }];
      }
    });
  };

  // Calculate total cost of purchase list
  const calculateTotalCost = () => {
    return purchaseList.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);
  };

  // Remove product from purchase list
  const removeFromPurchaseList = (productId) => {
    setPurchaseList((prevList) => prevList.filter(item => item.product._id !== productId));
  };

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-main)', fontSize: 'var(--font-size-titles)' }} className="my-8">
        Product Gallery
      </h1>

      <CategoryFilter setSelectedCategory={setSelectedCategory} />

      {loading ? <p>Loading products...</p> : null}

      <div className="max-w-[1300px] mx-auto px-[10vw]">
        <div className="flex flex-row justify-between gap-8 mt-8 w-full">
          {/* Left column: Product info and navigation */}
          <div
            className="flex flex-col items-start border-2 border-green-900 rounded-lg p-6"
            style={{ background: "#e6e9bf", width: "350px", }}

          >
            {products.length > 0 && (
              <>
                <h2>{products[currentProductIndex].name}</h2>
                <p>
                  Category: {products[currentProductIndex].category} / {products[currentProductIndex].subcategory}
                </p>
                <p>Price: ${products[currentProductIndex].price.toFixed(2)}</p>

                <label htmlFor="qty-select">Quantity:</label>
                <select
                  id="qty-select"
                  value={selectedQty}
                  onChange={(e) => setSelectedQty(Number(e.target.value))}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>

                <p>
                  Total Price: ${(products[currentProductIndex].price * selectedQty).toFixed(2)}
                </p>

                {/* Product navigation */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      if (currentProductIndex > 0) {
                        setCurrentProductIndex(currentProductIndex - 1);
                        setCurrentImageIndex(0);
                      }
                    }}
                    disabled={currentProductIndex === 0}
                  >
                    Previous Product
                  </button>
                  <button
                    onClick={() => {
                      if (currentProductIndex < products.length - 1) {
                        setCurrentProductIndex(currentProductIndex + 1);
                        setCurrentImageIndex(0);
                      }
                    }}
                    disabled={currentProductIndex === products.length - 1}
                  >
                    Next Product
                  </button>
                </div>
                <button className="mt-7" onClick={addToPurchaseList}>Add to Cart</button>
              </>
            )}

            {/* Purchase List (unchanged) */}
            {purchaseList.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <h2>Purchase List</h2>
                <ul>
                  {purchaseList.map(({ product, quantity }) => (
                    <li key={product._id}>
                      {product.name} - Qty: {quantity} - Price: ${(product.price * quantity).toFixed(2)}
                      <button onClick={() => removeFromPurchaseList(product._id)} style={{ marginLeft: "10px" }}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <h3>Total Cost: ${calculateTotalCost()}</h3>
              </div>
            )}
          </div>
          {/* Right column: FlipDeckGallery and image navigation */}
          <div
            className="flex flex-col items-center justify-center self-center border-2"
            style={{
              background: "#e6e9bf", width: "350px",
              // Nudge the image to the right by adding marginLeft to the gallery container
              paddingLeft: 8,
            }}
          >
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginLeft: "4%" }}>
              <FlipDeckGallery
                products={products}
                currentProductIndex={currentProductIndex}
                setCurrentProductIndex={setCurrentProductIndex}
                currentImageIndex={currentImageIndex}
                setCurrentImageIndex={setCurrentImageIndex}
              />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Products;
