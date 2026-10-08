import { Suspense } from "react";

import CategoryLoading from "@/components/category/CategoryLoading";
import {
  CategoryContent,
  CategoryPageProps,
} from "@/components/category/CategoryContent";

export default function CategoryPage({
  params,
}: CategoryPageProps) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}