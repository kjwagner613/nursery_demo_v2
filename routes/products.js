router.post("/products", async (req, res) => {
  const { title, description, price } = req.body;
  const newProduct = new Product({ title, description, price });
  await newProduct.save();
  res.json(newProduct);
});

router.post("/upload/:productId", async (req, res) => {
  // Handle Cloudinary image upload logic here
});

router.put("/products/:productId", async (req, res) => {
  const { images } = req.body;
  await Product.findByIdAndUpdate(req.params.productId, { images });
  res.json({ message: "Images updated" });
});