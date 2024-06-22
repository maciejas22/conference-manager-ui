"use client";

import { useRouter } from "next/navigation";

import { Conference } from "@/graphql/__types__/conference";

import { getFormattedDateTime } from "@/utils/date";

import { ColumnKey } from "./columns";

interface CellProps {
  item: Conference;
  columnKey: ColumnKey;
}

function Cell({ item, columnKey }: CellProps) {
  const router = useRouter();

  switch (columnKey) {
    case "title":
      return (
        <span
          onClick={() => router.push(`/conference/${item.id}`)}
          className="cursor-pointer"
        >
          {item.title}
        </span>
      );
    case "date":
      return <span>{getFormattedDateTime(item[columnKey])}</span>;
    default:
      return <span>{item[columnKey]}</span>;
  }
}

export { Cell };
