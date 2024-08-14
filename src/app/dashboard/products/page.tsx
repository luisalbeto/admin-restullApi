import { ProductCard } from "@/products";
import { products } from "@/products/data/products";

export default function ProductsPage  (){
    return(
      <div className="grid grid-cols sm:grid-cols-3 gap-2">

      {
        products.map((product) => (
          <ProductCard key={ product.id } {...product }/>
        ))
      }



      </div>

    )
}