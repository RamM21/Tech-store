import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCategoryPage from "../pages/Products";

const mockProducts = [
  {
    id: 1,
    name: "Aurora Wireless Headphones",
    price: 129,
    maker: "NordicSound",
    rating: 4.6,
    category: "Electronics",
    productGroup: "Audio",
    image: "img1"
  },
  {
    id: 2,
    name: "Frostbite Gaming Mouse",
    price: 59,
    maker: "GlacierTech",
    rating: 4.3,
    category: "Electronics",
    productGroup: "Gaming",
    image: "img2"
  },
  {
    id: 3,
    name: "IcePeak Smartwatch",
    price: 199,
    maker: "PolarTech",
    rating: 4.5,
    category: "Electronics",
    productGroup: "Wearables",
    image: "img3"
  }
];

function setup() {
  return render(
    <MemoryRouter>
      <ProductCategoryPage products={mockProducts} category="Electronics" />
    </MemoryRouter>
  );
}

describe("ProductCategoryPage", () => {
  test("renders category title", () => {
    setup();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
  });

  test("renders all products initially", () => {
    setup();
    expect(screen.getByText("Aurora Wireless Headphones")).toBeInTheDocument();
    expect(screen.getByText("Frostbite Gaming Mouse")).toBeInTheDocument();
    expect(screen.getByText("IcePeak Smartwatch")).toBeInTheDocument();
  });

  test("filters by name search", () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText("Search by name..."), {
      target: { value: "mouse" }
    });

    expect(screen.getByText("Frostbite Gaming Mouse")).toBeInTheDocument();
    expect(screen.queryByText("Aurora Wireless Headphones")).toBeNull();
    expect(screen.queryByText("IcePeak Smartwatch")).toBeNull();
  });

  test("filters by productGroup", () => {
    setup();
    fireEvent.change(screen.getByDisplayValue("All Groups"), {
      target: { value: "Gaming" }
    });

    expect(screen.getByText("Frostbite Gaming Mouse")).toBeInTheDocument();
    expect(screen.queryByText("Aurora Wireless Headphones")).toBeNull();
    expect(screen.queryByText("IcePeak Smartwatch")).toBeNull();
  });

  test("filters by maker", () => {
    setup();
    fireEvent.change(screen.getByDisplayValue("All Makers"), {
      target: { value: "PolarTech" }
    });

    expect(screen.getByText("IcePeak Smartwatch")).toBeInTheDocument();
    expect(screen.queryByText("Aurora Wireless Headphones")).toBeNull();
    expect(screen.queryByText("Frostbite Gaming Mouse")).toBeNull();
  });

  test("filters by price", () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Max Price/i), {
      target: { value: "100" }
    });

    expect(screen.getByText("Frostbite Gaming Mouse")).toBeInTheDocument();
    expect(screen.queryByText("Aurora Wireless Headphones")).toBeNull();
    expect(screen.queryByText("IcePeak Smartwatch")).toBeNull();
  });

  test("combined filters work together", () => {
    setup();

    fireEvent.change(screen.getByDisplayValue("All Makers"), {
      target: { value: "GlacierTech" }
    });

    fireEvent.change(screen.getByLabelText(/Max Price/i), {
      target: { value: "100" }
    });

    fireEvent.change(screen.getByPlaceholderText("Search by name..."), {
      target: { value: "mouse" }
    });

    expect(screen.getByText("Frostbite Gaming Mouse")).toBeInTheDocument();
    expect(screen.queryByText("Aurora Wireless Headphones")).toBeNull();
    expect(screen.queryByText("IcePeak Smartwatch")).toBeNull();
  });
});
