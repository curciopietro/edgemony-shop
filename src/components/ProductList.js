import { PropTypes } from "prop-types";
import Product from "./Product";
import Search from "./Search";

import "./ProductList.css";
import CategoriesFilter from "./CategoriesFilter";

import { useHistory, useLocation } from "react-router-dom";

function ProductList({ products, categories }) {
  // const [searchTerm, setSearchTerm] = useState();
  // const [selectedCategories, setSelectedCategories] = useState([]);

  const location = useLocation();

  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const searchTerm = searchParams.get("q") || "";

  function updateSearchTerm(term) {
    if (term) {
      searchParams.set("q", term);
    } else {
      searchParams.delete("q");
    }
    history.push({ search: "?" + searchParams.toString() });
  }

  const selectedCategoriesParam = searchParams.get("categories");
  const selectedCategories = selectedCategoriesParam
    ? selectedCategoriesParam.split(",")
    : [];

  function updateCategories(categories) {
    // setSelectedCategories(categories);
    const selectedParam = categories.join(",");

    if (categories.length === 0) {
      searchParams.delete("categories");
    } else {
      searchParams.set("categories", selectedParam);
    }
    // location.search = "?" + newParams.toString();
    history.push({ search: "?" + searchParams.toString() });
  }

  const termRegexp = new RegExp(searchTerm, "i");
  const filteredProducts = products.filter(
    (product) =>
      product.title.search(termRegexp) !== -1 &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category))
  );

  return (
    <div className="ProductList">
      <div className="ProductList__filters">
        <Search onSearch={updateSearchTerm} />
        <CategoriesFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectCategory={updateCategories}
        />
      </div>
      <div className="ProductList__products">
        {filteredProducts.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

export default ProductList;
