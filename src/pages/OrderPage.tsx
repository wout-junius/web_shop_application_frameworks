import React, { useContext, useEffect, useState } from "react";
import SaleTable from "../components/tables/SaleTable";
import { AuthContext } from "../context/AuthContext";
import { ISale } from "../Entities/ISale";

export default function OrderPage() {
    const ctx = useContext(AuthContext);
    const [sales, setSales] = useState<ISale[]>([]);
    const getData = () => {
        fetch(`/sale/${ctx.user?.sub}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ctx.user?.token}`,
            },
        })
          .then((res) => res.json())
          .then((sales) => {
            setSales(sales);
          });
      };
    
      useEffect(() => {
        getData();
      }, []);
  return (
    <>
      <div>Your orders</div>
      <SaleTable sales={sales} />
    </>
  );
}
