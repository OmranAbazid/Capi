import React from "react";
import Products from "./Products";
import { Card } from "antd";

export default function Home() {
  return (
    <Card bordered={false}>
      <Products />
    </Card>
  );
}
