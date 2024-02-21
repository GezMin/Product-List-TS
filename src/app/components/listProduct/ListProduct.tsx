import {
    selectList,
    removeList,
    toggleComplete,
} from '@/app/redux/slices/listSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BsTrash2Fill } from 'react-icons/bs'
import { CiEdit } from 'react-icons/ci'
import { ListItem } from '@/app/redux/types/tipes'
import { formattedNumber } from '@/app/utils/FormattedNumber'

export const ListProduct = () => {
    const list: ListItem[] = useSelector(selectList)

    const sum = Number(list.reduce((a: number, b: ListItem) => a + b.price, 0))
    const dispatch = useDispatch()

    const removeListProduct = (id: string) => {
        dispatch(removeList(id))
    }

    const toggleCompleteRpoduct = (id: string) => {
        dispatch(toggleComplete(id))
    }
    const listIsActive = list
        .filter((item: ListItem) => item.isActive)
        .reduce((a: number, b: ListItem) => a + b.price, 0)

    return (
        <>
            <ul className='mt-4 w-full'>
                {list.length ? (
                    list.map((item, i) => (
                        <li
                            key={item.id}
                            onClick={e => toggleCompleteRpoduct(item.id)}
                            className={`flex gap-3 items-center justify-between border border-white p-2 m-1 cursor-pointer ${
                                item.isActive
                                    ? 'bg-violet-500 line-through bold text-dark'
                                    : null
                            } `}
                        >
                            <span className='w-full text-2xl'>
                                {i + 1}. {item.name}
                            </span>
                            <span className='text-2xl text-bold'>
                                {formattedNumber(item.price)}
                            </span>
                            <CiEdit size={40} className='hover:text-red-500' />
                            <BsTrash2Fill
                                size={40}
                                onClick={e => removeListProduct(item.id)}
                                className='hover:text-red-500'
                            />
                        </li>
                    ))
                ) : (
                    <div className='text-2xl text-center m-2'>
                        Список покупок пуст
                    </div>
                )}
            </ul>
            {sum > 0 && (
                <div className='flex justify-between w-full text-xl  m-2'>
                    <span>Кол-во продуктов: {list.length}</span>
                    <span>
                        {listIsActive > 0 &&
                            'Куплено:' + formattedNumber(listIsActive)}
                    </span>
                    <span>Сумма всего: {formattedNumber(sum)}</span>
                </div>
            )}
        </>
    )
}
