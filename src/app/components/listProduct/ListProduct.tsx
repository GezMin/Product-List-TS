import {
    selectList,
    removeList,
    toggleComplete,
} from '@/app/redux/slices/listSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BsTrash2Fill } from 'react-icons/bs'
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr'
import { ListItem } from '@/app/redux/types/tipes'
import { formattedNumber } from '@/app/utils/FormattedNumber'
import { toast } from 'react-toastify'

export const ListProduct = () => {
    const list: ListItem[] = useSelector(selectList)

    const sum = Number(list.reduce((a: number, b: ListItem) => a + b.price, 0))
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
        .reduce((a: number, b: ListItem) => a + b.price, 0)

    return (
        <>
            <div className='mt-3 flex'>
                {list.map((item, i) => (
                    <span
                        key={item.id}
                        className='text-[14px] text-center m-1 p-1 border-dotted border-2 rounded-md border-orange-500 bg-violet-500 cursor-pointer hover:bg-orange-500 hover:text-white '
                    >
                        {item.department}
                    </span>
                ))}
            </div>
            <ul className='mt-4 w-full'>
                {list.length ? (
                    list.map((item, i) => (
                        <li
                            key={item.id}
                            className={`flex gap-3 items-center justify-between border border-white p-2 m-1  ${
                                item.isActive
                                    ? 'line-through text-green-400'
                                    : null
                            } `}
                        >
                            {!item.isActive ? (
                                <GrCheckbox
                                    size={40}
                                    className='hover:text-green-500'
                                    onClick={e =>
                                        toggleCompleteRpoduct(item.id)
                                    }
                                />
                            ) : (
                                <GrCheckboxSelected
                                    size={40}
                                    className='hover:text-green-500'
                                    onClick={e =>
                                        toggleCompleteRpoduct(item.id)
                                    }
                                />
                            )}

                            <span className='w-full text-1'>
                                {i + 1}. {item.name}
                            </span>
                            <span className='text-[12px] w-[250px] text-center  p-0 border-dotted border-2 rounded-md border-orange-500'>
                                {item.department}
                            </span>
                            <span className='text-xl text-right w-[120px]'>
                                {formattedNumber(item.price)}
                            </span>
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
