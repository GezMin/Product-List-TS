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
    console.log(arrayFromSetDepartment)

    return (
        <>
            <div className='mt-3 flex flex-wrap'>
                {arrayFromSetDepartment.map((item, i) =>
                    item ? (
                        <span
                            key={i}
                            className='text-[12px] text-center m-1 p-1 border-dotted border-2 rounded-md border-orange-500 bg-violet-500 cursor-pointer hover:bg-orange-500 hover:text-white '
                        >
                            {item}
                        </span>
                    ) : null,
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
                                <BsTrash2Fill
                                    size={25}
                                    onClick={e => removeListProduct(item.id)}
                                    className='hover:text-red-500'
                                />
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-[12px] w-1/3 text-center  p-0 border-dotted border-2 rounded-md border-orange-500'>
                                    {item.department}
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
