import { BackTop, Segmented } from "antd";
import { SegmentedLabeledOption } from "antd/lib/segmented";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Product } from '../Entities/Product';

export default function BrowsePage() {
  const [productsToShow, setProductsToShow] = useState([]);
  const [products, setProducts] = useState([]);
  const [tagsSegment, setTagsSegment] = useState<SegmentedLabeledOption[]>([]);

  const getData = () => {
    fetch("/product")
      .then((res) => res.json())
      .then((products) => {
        setProductsToShow(products);
        setProducts(products);
      });
    fetch("/tag")
      .then((res) => res.json())
      .then((tags) => {
        let tempSegment: SegmentedLabeledOption[] = [
          {
            label: "All",
            value: 0,
          },
        ];
        tags.forEach((tag: { name: string }) => {
          tempSegment.push({
            label: tag.name,
            value: tag.name,
          });
        });
        setTagsSegment(tempSegment);
      });
  };

  useEffect(() => {
    getData();
  }, []);


  const filterTags = (value: string | number) => {
    if (value === 0) {
      setProductsToShow(products);
    } else {
      setProductsToShow(
        products.filter((product: Product) => {
          return product.tags?.some((tag: { name: string }) => tag.name === value);
        })
      );
    }
  }


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <BackTop />
      <Segmented defaultValue={0} options={tagsSegment} onChange={filterTags} />
      <div
        className="CardList"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          width: "100%",
          padding: "1em",
        }}
      >
        {productsToShow.map((product: Product) => (
          <ProductCard product={product} loading={false} key={product.id} />
        ))}
      </div>
    </div>
  );
}
