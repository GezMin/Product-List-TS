import {
    selectList,
    removeList,
    toggleComplete,
} from '@/app/redux/slices/listSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BsTrash2Fill } from 'react-icons/bs'
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr'
import { FaRegEdit } from 'react-icons/fa'
import { ListItem } from '@/app/types/tipes'
import { formattedNumber } from '@/app/utils/FormattedNumber'
import { toast } from 'react-toastify'
import { ChangeEvent, Children, useEffect, useState } from 'react'
import { Modal } from '../modal/Modal'

export const ListProduct = () => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<ListItem | null>(null)
    const [countProduct, setCountProduct] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [id, setId] = useState<string>('')

    const list: ListItem[] = useSelector(selectList)

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])

    const sum = Number(
        list.reduce((a: number, b: ListItem) => a + b.price * b.count, 0),
    )
    const dispatch = useDispatch()

    const removeListProduct = (id: string) => {
        dispatch(removeList(id))
        toast.success('Товар удален')
    }

    const toggleCompleteRpoduct = (id: string) => {
        dispatch(toggleComplete(id))
    }
    const listIsActive = list
        .filter((item: ListItem) => item.isActive)
        .reduce((a: number, b: ListItem) => a + b.price * b.count, 0)

    const uniqueListDepartment = new Set(list.map(item => item.department))
    const arrayFromSetDepartment = Array.from(uniqueListDepartment)

    const openModalForEdit = (id: string) => {
        const item = list.find(item => item.id === id)
        if (item) {
            setSelectedItem(item)
            setCountProduct(String(item.count))
            setPrice(String(item.price))
            setId(id)
            setOpenModal(true)
        } else {
            console.error(`No item found with id: ${id}`)
        }
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
    const editList = () => {
        dispatch({
            type: 'list/editList',
            payload: {
                id,
                count: Number(countProduct),
                price: Number(price),
            },
        })

        setOpenModal(false)
        handleCloseModal()
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        setSelectedItem(null)
    }

    return (
        <>
            <Modal openModal={openModal} onClose={handleCloseModal}>
                <div className='text-left text-2xl'>
                    Товар: {selectedItem?.name}
                </div>
                <div className='flex gap-2 mt-2 justify-between items-center'>
                    <label className='p-2 w-1/3'>Кол-во</label>
                    <input
                        className='p-2 w-1/4 border border-gray-500'
                        type='text'
                        value={countProduct}
                        min={0}
                        onChange={handleCountProduct}
                        placeholder='кол-во'
                    />
                    <label>Цена</label>
                    <input
                        className='p-2 w-1/3 border border-gray-500'
                        type='text'
                        value={price === '0' ? '' : price}
                        min={0}
                        onChange={handlePrice}
                        placeholder='цена'
                        autoFocus
                    />
                    <button
                        className='p-2  bg-orange-500 hover:bg-orange-700 text-white'
                        onClick={editList}
                    >
                        Сохранить
                    </button>
                </div>
            </Modal>
            <div className='mt-3 flex flex-wrap'>
                {arrayFromSetDepartment.map((item, i) =>
                    item ? (
                        <span
                            key={i}
                            className='text-[12px] text-center m-1 p-1 border-dotted border-2 rounded-md border-orange-500 bg-violet-500 cursor-pointer hover:bg-orange-500 hover:text-white '
                        >
                            {item}
                        </span>
                    ) : (
                        <span
                            key={i}
                            className='text-[12px] text-center m-1 p-1 border-dotted border-2 rounded-md border-orange-500 bg-violet-500 cursor-pointer hover:bg-orange-500 hover:text-white '
                        >
                            прочее
                        </span>
                    ),
                )}
            </div>
            <ul className='mt-4 w-full '>
                {list.length ? (
                    list.map((item, i) => (
                        <li
                            key={item.id}
                            className={`flex flex-col gap-3 items-center justify-between border border-white p-2 m-1  ${
                                item.isActive
                                    ? 'line-through text-green-400 bg-slate-800'
                                    : null
                            } `}
                        >
                            <div className='w-full flex justify-between'>
                                {!item.isActive ? (
                                    <GrCheckbox
                                        size={25}
                                        className=' hover:text-green-500'
                                        onClick={e =>
                                            toggleCompleteRpoduct(item.id)
                                        }
                                    />
                                ) : (
                                    <GrCheckboxSelected
                                        size={25}
                                        className='hover:text-green-500'
                                        onClick={e =>
                                            toggleCompleteRpoduct(item.id)
                                        }
                                    />
                                )}

                                <span className='w-full text-1 pl-2'>
                                    {i + 1}. {item.name}
                                </span>
                                <FaRegEdit
                                    size={25}
                                    onClick={e => openModalForEdit(item.id)}
                                    className='hover:text-red-500 mr-2'
                                />
                                <BsTrash2Fill
                                    size={25}
                                    onClick={e => removeListProduct(item.id)}
                                    className='hover:text-red-500'
                                />
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-[12px] w-1/3 text-center  p-0 border-dotted border-2 rounded-md border-orange-500'>
                                    {item.department || 'прочее'}
                                </span>
                                <span className='text-[14px] w-full text-right'>
                                    {item.count} шт *{' '}
                                    {formattedNumber(item.price)} =
                                </span>
                                <span className='text-[16px] text-right  w-1/3'>
                                    {formattedNumber(item.price * item.count)}
                                </span>
                            </div>
                        </li>
                    ))
                ) : (
                    <div className='text-xl text-center m-2'>
                        Список покупок пуст
                    </div>
                )}
            </ul>
            {sum > 0 && (
                <div className='flex justify-between w-full text-1  m-2'>
                    <span>Наименований: {list.length}</span>

                    <span>Всего: {formattedNumber(sum)}</span>
                </div>
            )}
            <span className='border-t border-white w-full mt-1 pt-3'>
                {listIsActive > 0 &&
                    'Куплено: ' + formattedNumber(listIsActive)}
            </span>
        </>
    )
}
