import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ListForm = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const dispatch = useDispatch()

    const addList = () => {
        if (!name || !price) return toast.info('Заполните все поля')

        dispatch({
            type: 'list/addList',
            payload: {
                id: crypto.randomUUID(),
                name,
                price: Number(price),
                isActive: false,
            },
        })

        setName('')
        setPrice('')
    }

    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        const regex = /^[0-9]*(\.[0-9]{0,2})?$/ // 0.00
        if (regex.test(input) || input === '') {
            setPrice(input)
        }
    }

    return (
        <div className='w-full text-2xl text-center p-1'>
            <div className='flex flex-row justify-between  text-emerald-750 text-black'>
                <input
                    className='p-2 active:border-green-500'
                    type='text'
                    value={name}
                    placeholder='продукт'
                    onChange={handleName}
                />
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
            <ToastContainer
                position='top-left'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='colored'
            />
        </div>
    )
}
