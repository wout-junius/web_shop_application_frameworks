import { InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { BackTop, Button, Card, Segmented } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";

export default function BrowsePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <BackTop />
      <Segmented
        options={[
          {label: "Alles", value: 0},
          {label: "groenten", value: 1},
          {label: "fruit", value: 2},
          {label: "bouw", value: 3}
        ]}
      />
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
        {genCardList("Appels")}
      </div>
    </div>
  );

  function genCardList(name: string) {
    var loading = false;
    return Array.from({ length: 30 }).map(() => (
      <Card
        key={Math.random()}
        style={{
          margin: "1em",
        }}
        loading={loading}
        hoverable
      >
        <Meta
          title={name}
          style={{
            marginBottom: ".5rem",
          }}
        />
        <b>Beschrijving:</b> Alstom <br />
        <b>Prijs:</b> 5$/kg <br />
      </Card>
    ));
  }
}
