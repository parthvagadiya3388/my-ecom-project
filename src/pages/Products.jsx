// src/pages/Products.jsx
import React, { useState, useMemo } from "react";
import { Container, Row, Col, Form, Pagination } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

export default function Products() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 9;

  // Unique categories (memoized)
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category || "Other")));
    return ["all", ...cats];
  }, []);

  // Filter + sort logic
  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.description || "").toLowerCase().includes(query.toLowerCase())
    );

    if (category !== "all") list = list.filter((p) => p.category === category);

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return list;
  }, [query, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  // ensure current page valid when filters change
  React.useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  return (
    <Container className="" style={{ marginTop: 10 }}>
      {/* Controls: search, category, sort */}
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-4 gap-3">
        <Form.Control
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          style={{ maxWidth: 420 }}
        />

        <div className="d-flex gap-2 w-full" style={{ minWidth: 260 }}>
          <Form.Select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            style={{ minWidth: 140 }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Categories" : c}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            style={{ minWidth: 180 }}
          >
            <option value="">Sort</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </Form.Select>
        </div>
      </div>

      {/* Grid */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {pageItems.length ? (
          pageItems.map((p) => (
            <Col key={p.id}>
              <ProductCard product={p} />
            </Col>
          ))
        ) : (
          <div className="text-center w-100 py-8">No products found.</div>
        )}
      </Row>

      {/* Footer: count + pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div className="text-muted">{filtered.length} products found</div>

        <Pagination className="mb-0">
          <Pagination.Prev disabled={page === 1} onClick={() => setPage((s) => Math.max(1, s - 1))} />
          {/* show up to 7 pages with ellipsis if needed */}
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1;
            // simplify: show all if <=7 pages, else show smart range
            if (totalPages <= 7) {
              return (
                <Pagination.Item key={pageNumber} active={pageNumber === page} onClick={() => setPage(pageNumber)}>
                  {pageNumber}
                </Pagination.Item>
              );
            }
            // smart pagination
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= page - 1 && pageNumber <= page + 1) ||
              (page <= 3 && pageNumber <= 4) ||
              (page >= totalPages - 2 && pageNumber >= totalPages - 3)
            ) {
              return (
                <Pagination.Item key={pageNumber} active={pageNumber === page} onClick={() => setPage(pageNumber)}>
                  {pageNumber}
                </Pagination.Item>
              );
            }
            // otherwise show ellipsis once per gap (we'll render a disabled item)
            return null;
          })}
          {totalPages > 7 && page < totalPages - 2 && (
            <Pagination.Ellipsis onClick={() => setPage(Math.min(totalPages, page + 3))} />
          )}
          <Pagination.Next disabled={page === totalPages} onClick={() => setPage((s) => Math.min(totalPages, s + 1))} />
        </Pagination>
      </div>
    </Container>
  );
}
