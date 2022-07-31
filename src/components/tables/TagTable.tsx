import { Button, Table } from "antd";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ITag } from "../../Entities/Tag";

export default function TagTable({tags, deleteItem}: { tags: ITag[], deleteItem: (id: number, type: string) => void }) {
  const ctx = useContext(AuthContext);

  return (
      <Table dataSource={tags}
      >
        <Table.Column title="Name" dataIndex="name" />
        <Table.Column
          title="Actions"
          render={(_: any, record: ITag) => (
            <Button
              type="primary"
              onClick={() => deleteItem(record.id, "tag")}
            >
              Delete
            </Button>
          )}
        />
      </Table>
  );
}
