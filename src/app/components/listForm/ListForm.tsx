import { ChangeEvent, MouseEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import productsShop from '../../data/product'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ListForm = () => {
    const [name, setName] = useState<string>('')
    const [countProduct, setCountProduct] = useState<string>('1')
    const [selectedDepartment, setSelectedDepartment] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [filteredProducts, setFilteredProducts] = useState(productsShop)
    const dispatch = useDispatch()

    const addList = () => {
        if (!name) return toast.info('Заполните наименование')

        dispatch({
            type: 'list/addList',
            payload: {
                id: crypto.randomUUID(),
                name,
                department: selectedDepartment,
                count: Number(countProduct),
                price: Number(price),
                isActive: false,
            },
        })

        setName('')
        setPrice('')
        setSelectedDepartment('')
        setCountProduct('1')
    }

    const handleDepartment = (e: ChangeEvent<HTMLInputElement>) => {
        const searchProduct = e.target.value
        setName(searchProduct)

        const filteredProducts = productsShop.filter(item =>
            item.name.toLowerCase().includes(searchProduct.toLowerCase()),
        )
        setFilteredProducts(filteredProducts)
    }

    const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        const regex = /^(?!0)\d*(\.\d{0,2})?$/ // 0.00
        if (regex.test(input) || input === '') {
            setPrice(input)
        }
    }

    const handleCountProduct = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        const regex = /^[1-9]\d*$/
        if (regex.test(input) || input === '') {
            setCountProduct(input)
        }
    }

    const handleListSlect = (e: MouseEvent<HTMLLIElement>) => {
        const target = e.target as HTMLLIElement
        if (!target) return
        setName(target.textContent ?? '')
        setSelectedDepartment(target.dataset.department ?? '')
        setFilteredProducts([])
    }

    return (
        <div className='text-black'>
            <div className='flex justify-between items-center gap-1 relative w-full mb-1'>
                <input
                    className='w-full p-2 active:border-green-500'
                    type='text'
                    value={name}
                    placeholder='продукт'
                    onChange={handleDepartment}
                />
                {name.length > 2 && filteredProducts.length > 0 && (
                    <ul className='absolute bg-white w-full mt-1 p-1 top-10 text-left'>
                        {filteredProducts.map(item => (
                            <li
                                key={item.id}
                                value={item.id}
                                onClick={handleListSlect}
                                className='hover:bg-slate-200 p-1 cursor-pointer'
                                data-department={item.department}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className='flex gap-2 mt-2 justify-between items-center'>
                <input
                    className='p-2 w-1/3 active:border-green-500'
                    type='text'
                    value={countProduct}
                    min={0}
                    onChange={handleCountProduct}
                    placeholder='кол-во'
                />
                <input
                    className='p-2 w-1/3 active:border-green-500'
                    type='text'
                    value={price}
                    min={0}
                    onChange={handlePrice}
                    placeholder='цена'
                />
                <button
                    className='p-2  bg-orange-500 hover:bg-orange-700 text-white'
                    onClick={addList}
                >
                    Добавить
                </button>
            </div>
        </div>
    )
}
