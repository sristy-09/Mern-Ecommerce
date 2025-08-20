import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsynError.js";
import APIFunctionality from "../utils/apiFunctionality.js";

//Creating Products
export const createProducts = handleAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get all Products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultsPerPage = 4;
  const apiFeatures = new APIFunctionality(Product.find(), req.query)
    .search()
    .filter();

  //Getting filtered query before pagination
  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();

  //Calculate totalPages based on filtered count
  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(req.query.page) || 1;

  if (page > totalPages && productCount > 0) {
    return next(new HandleError("This Page doesn't exist", 404));
  }

  //Apply pagination
  apiFeatures.pagination(resultsPerPage);
  const products = await apiFeatures.query;

  if (!products || products.length === 0) {
    return next(new HandleError("No Product  Found", 404));
  }

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultsPerPage,
    totalPages,
    currentPage: page,
  });
});

//Update Product
export const updateProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new HandleError("Product Not Found", 500));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product
export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new HandleError("Product Not Found", 500));
  }

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

//Accessing Single Product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new HandleError("Product Not Found", 500));
  }

  return res.status(200).json({
    success: true,
    product,
  });
});

// Creating and Updating Review
// This function allows users to:
// Add a new review to a product (if they haven't reviewed it before)
// Update their existing review (if they already reviewed it)
export const createReviewForProducts = handleAsyncError(
  async (req, res, next) => {
    // This extracts data from the request body (what the user sent):
    const { rating, comment, productId } = req.body;

    // This creates a review object with all the necessary information.
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
      productId,
    };

    //  Finding the Product
    const product = await Product.findById(productId);

    if (!product) {
      return next(new HandleError("Product Not found", 400));
    }

    // This checks if the current user has already reviewed this product by:

    // Going through all existing reviews
    // Comparing the user ID of each review with the current user's ID
    // .toString() converts IDs to text for comparison
    const reviewExists = product.reviews.find(
      (review) => review.user.toString() === req.user.id.toString()
    );

    // If review exists (user already reviewed):
    //     Goes through all reviews
    // Finds the user's existing review
    // Updates the rating and comment

    // If no review exists (new review):
    // Adds the new review to the product's reviews array
    if (reviewExists) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user.id.toString()) {
          (review.rating = rating), (review.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);
    }

    product.numOfReviews = product.reviews.length;

    let sum = 0;
    product.reviews.forEach((review) => {
      sum += review.rating;
    });
    product.ratings =
      product.reviews.length > 0 ? sum / product.reviews.length : 0;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      product,
    });
  }
);

// Getting Reviews
export const getProductReviews = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new HandleError("Product Not found", 400));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Deleting Reviews
export const deleteReviews = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new HandleError("Product not found", 400));
  }

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  let sum = 0;
  reviews.forEach((review) => {
    sum += review.rating;
  });
  const ratings = reviews.length > 0 ? sum / reviews.length : 0;
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Review Deleted Successfully",
  });
});

// Admin - Getting all products
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});
