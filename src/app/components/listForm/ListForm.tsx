import { ChangeEvent, MouseEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import productsShop from '../../data/product'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ListForm = () => {
    const [name, setName] = useState<string>('')
    const [department, setDepartment] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [filteredProducts, setFilteredProducts] = useState(productsShop)
    const dispatch = useDispatch()

    const addList = () => {
        if (!name || !price) return toast.info('Заполните все поля')

        dispatch({
            type: 'list/addList',
            payload: {
                id: crypto.randomUUID(),
                name,
                department,
                price: Number(price),
                isActive: false,
            },
        })

        setName('')
        setPrice('')
        setDepartment('')
    }

    const handleDepartment = (e: ChangeEvent<HTMLInputElement>) => {
        const searchProduct = e.target.value
        setName(searchProduct)

        // Производим фильтрацию по значению из инпута
        const filteredProducts = productsShop.filter(item =>
            item.name.toLowerCase().includes(searchProduct.toLowerCase()),
        )
        setFilteredProducts(filteredProducts)
    }

    const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        const regex = /^[0-9]*(\.[0-9]{0,2})?$/ // 0.00
        if (regex.test(input) || input === '') {
            setPrice(input)
        }
    }

    const handleListSlect = (e: MouseEvent<HTMLLIElement>) => {
        const target = e.target as HTMLLIElement
        if (!target) return
        setName(target.textContent ?? '')
        setDepartment(target.dataset.department ?? '')
        setFilteredProducts([])
    }

    return (
        <div className='w-full text-2xl text-center p-1'>
            <div className='flex flex-row justify-between  text-emerald-750 text-black'>
                <div className='relative'>
                    <input
                        className='p-2 active:border-green-500'
                        type='text'
                        value={name}
                        placeholder='продукт'
                        onChange={handleDepartment}
                    />
                    {name.length > 2 && filteredProducts.length > 0 && (
                        <ul className='absolute bg-white w-full mt-1 p-1 text-left'>
                            {filteredProducts.map(item => (
                                <li
                                    key={item.id}
                                    value={item.id}
                                    onClick={handleListSlect}
                                    className='hover:bg-slate-200 p-1 cursor-pointer'
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <input
                    className='p-2 w-[100px]'
                    type='text'
                    value={price}
                    min={0}
                    onChange={handlePrice}
                />
                <button
                    className='p-2 bg-orange-500 hover:bg-orange-700 text-white'
                    onClick={addList}
                >
                    Добавить
                </button>
            </div>
        </div>
    )
}
