import * as React from 'react';
import * as ReactDOM from 'react-dom';

const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

type Product = {
    category:string
    price: string
    stocked: boolean
    name: string
}

type ProductProps = {
    products: Product[];
}

type ProductTableProps = {
    products: Product[];
    filterText: string;
    inStockOnly: boolean;
}

type SearchBarProps = {
    filterText: string;
    inStockOnly: boolean;
    onFilterTextChange: (arg0: string) => void;
    onInStockOnlyChange: (arg0: boolean) => void;
}

const SearchBar = ({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }: SearchBarProps): JSX.Element => {
    return (
        <form>
            <input type="text" 
            value={filterText} 
            placeholder="Search..."
            onChange={(e) => onFilterTextChange(e.target.value)}/>
            <label>
                <input 
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => onInStockOnlyChange(e.target.checked)}/>
                {' '}
                Only show products in stock
            </label>
        </form>
    )
}

const ProductCategoryRow = ({category}: {category:string}): JSX.Element => {
    return (
        <tr>
            <th colSpan={2}>
                {category}
            </th>
        </tr>
    );
}

const ProductRow = ({product}: {product:Product}): JSX.Element => {
    const name:(string | JSX.Element) = product.stocked?product.name:
    <span style={{color:'red'}}>
        {product.name}
    </span>
    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    )
}

const ProductTable = ({ products, filterText, inStockOnly }: ProductTableProps): JSX.Element => {
    const rows = [];
    let lastCategory:string = null;
    products.forEach((product: Product) => {
        if (
            product.name.toLowerCase().indexOf(
              filterText.toLowerCase()
            ) === -1
        ) {
            return;
        }
        if (inStockOnly && !product.stocked) {
            return;
        }
        if(product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={product.category} />
            )
        }
        rows.push(
            <ProductRow 
                product={product}
                key={product.name} />
        );
        lastCategory = product.category;
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}
const FilterableProductTable = ({products}: ProductProps): JSX.Element => {
    const [filterText, setFilterText] = React.useState('');
    const [inStockOnly, setInStockOnly] = React.useState(false);
    return (
        <div>
            <SearchBar
             filterText={filterText}
             inStockOnly={inStockOnly}
             onFilterTextChange={setFilterText}
             onInStockOnlyChange={setInStockOnly} />
            <ProductTable 
             filterText={filterText}
             inStockOnly={inStockOnly}
             products={products} />
        </div>
    )
}
ReactDOM.render(
    <FilterableProductTable  products={PRODUCTS}/>,
    document.getElementById("root")
);