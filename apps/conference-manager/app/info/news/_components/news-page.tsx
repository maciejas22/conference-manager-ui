"use client";

import { useQuery } from "@tanstack/react-query";

import { getNewsQueryOptions } from "@/services/info/queries";

import { News } from "./news";

function NewsPage() {
  const { data } = useQuery(getNewsQueryOptions());
  const news = data?.news ?? [];

  return (
    <div className="space-y-8 my-8">
      {news.map((news) => (
        <News key={news.title} {...news} />
      ))}
    </div>
  );
}

export { NewsPage };
