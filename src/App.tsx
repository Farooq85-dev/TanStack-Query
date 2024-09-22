import { useQuery } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import "./app.css";
import { useState } from "react";

type ItemType = {
  id: number;
  title: string;
  image: string;
  price: number;
};

function App() {
  const [page, setPage] = useState<number>(5);
  const { data, isLoading } = useQuery({
    queryKey: ["products", { page }],
    queryFn: async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=${page}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader size={50} />
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {page <= 5 ? (
          ""
        ) : (
          <button onClick={() => setPage((prev) => prev - 5)}>
            Previous Five Items
          </button>
        )}
        <button>Current {page} Items</button>
        {page === 20 ? (
          ""
        ) : (
          <button onClick={() => setPage((prev) => prev + 5)}>
            Next Five Items
          </button>
        )}
      </div>

      <div className="product-list">
        {data.map((product: ItemType) => (
          <div key={product.id} className="card">
            <img
              src={product.image}
              alt={product.title}
              className="card-image"
              loading="lazy"
            />
            <h2 className="card-title">{product.title}</h2>
            <p className="card-price">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
