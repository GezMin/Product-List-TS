import { ChangeEvent, useState } from 'react'
import productsShop from '../../data/product'

export const FilterProduct = () => {
    const [nameProduct, setNameProduct] = useState<string>('')
    const [filteredProducts, setFilteredProducts] = useState(productsShop)

    const handleDepartment = (e: ChangeEvent<HTMLInputElement>) => {
        const searchProduct = e.target.value
        setNameProduct(searchProduct)

        // Производим фильтрацию по значению из инпута
        const filteredProducts = productsShop.filter(item =>
            item.name.toLowerCase().includes(searchProduct.toLowerCase()),
        )
        setFilteredProducts(filteredProducts)
    }

    return (
        <div className='flex flex-col mt-8 w-full text-black'>
            <input
                type='text'
                onChange={handleDepartment}
                value={nameProduct}
            />
            <select
                size={
                    filteredProducts.length <= 5 ? filteredProducts.length : 5
                }
            >
                {filteredProducts.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    )
}
