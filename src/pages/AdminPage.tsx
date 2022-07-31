import { Divider } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProductForm from "../components/forms/AddProductForm";
import AddTagForm from "../components/forms/AddTagForm";
import ProductTable from "../components/tables/ProductTable";
import TagTable from "../components/tables/TagTable";
import { AuthContext } from "../context/AuthContext";
import { Product } from "../Entities/Product";
import { ITag } from "../Entities/Tag";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsTags, setProductsTags] = useState<ITag[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const getData = () => {
    fetch("/product")
      .then((res) => res.json())
      .then((products) => {
        products.map((product: any) => {
          product.key = product.id;
          return product;
        });
        console.log(products);

        setProducts(products);
      });
    fetch("/tag")
      .then((res) => res.json())
      .then((tags) => {
        setTags(tags);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const AddProduct = ({
    productName,
    description,
    price,
  }: {
    productName: string;
    description: string;
    price: number;
  }) => {
    fetch("/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ctx.user?.token}`,
      },
      body: JSON.stringify({
        name: productName,
        description: description,
        price: price,
        tags: productsTags,
      }),
    })
      .then((res) => res.json())
      .then((product) => {
        if(product.error) expiredLogin();
        setProducts([...products, product]);
      });
  };

  const deleteItem = (id: number, type: string) => {
    fetch(`/${type}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ctx.user?.token}`,
      },
    }).then((res) => {
      if(res.status === 403) expiredLogin();
      if (type === "product") {
        setProducts(products.filter((product) => product.id !== id));
      } else {
        setTags(tags.filter((tag) => tag.id !== id));
      }
    });
  };

  const addTag = ({ tagName }: { tagName: string }) => {
    fetch("/tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ctx.user?.token}`,
      },
      body: JSON.stringify({
        name: tagName,
      }),
    })
      .then((res) => res.json())
      .then((tag) => {
        if(tag.error) expiredLogin();
        setTags([...tags, tag]);
      });
  };
  const onTagsChange = (tags: string[]) => {
    setProductsTags(tags.map((tag) => ({ name: tag, id: tags.indexOf(tag) })));
  };

  const expiredLogin = () => {
    ctx.logout();
    navigate("/login")
  }

  return (
    <>
      <ProductTable products={products} deleteItem={deleteItem} />
      <AddProductForm
        onFinish={AddProduct}
        tags={tags}
        onTagsChange={onTagsChange}
      />
      <Divider />
      <TagTable tags={tags} deleteItem={deleteItem} />
      <AddTagForm onFinish={addTag} />
    </>
  );
}
