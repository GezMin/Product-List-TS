import { selectList } from '@/app/redux/slices/listSlice'
import { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const SaveTemplate = () => {
    const list = useSelector(selectList)
    const [template, setTemplate] = useState({})
    const [btnVisible, setBtnVisible] = useState(false)
    const [nameTemplate, setNameTemplate] = useState('')

    const handleToggleBtnSave = () => {
        setBtnVisible(!btnVisible)
    }

    const SaveTemplateProduct = () => {
        if (nameTemplate.trim() === '') {
            return toast.error('Название шаблона не может быть пустым')
        }
        if (nameTemplate.trim() !== '') {
            setTemplate({ [nameTemplate]: list })
        }

        setBtnVisible(!btnVisible)
        setNameTemplate('')

        toast.success('Шаблон сохранен')
    }

    const inputName = (e: ChangeEvent<HTMLInputElement>) => {
        setNameTemplate(e.target.value)
    }

    return (
        <div className='mt-8 w-full'>
            {!btnVisible ? (
                <button
                    onClick={handleToggleBtnSave}
                    className='p-2 bg-orange-500 hover:bg-orange-700 text-white'
                >
                    Сохранить шаблон
                </button>
            ) : (
                <div className='flex justify-between gap-2'>
                    <input
                        type='text'
                        value={nameTemplate}
                        placeholder='Название шаблона'
                        className='p-4 w-full text-black'
                        onChange={inputName}
                    />
                    <button
                        onClick={SaveTemplateProduct}
                        className='p-2 bg-orange-500 hover:bg-orange-700 text-white'
                    >
                        Сохранить
                    </button>
                    <button
                        onClick={handleToggleBtnSave}
                        className='p-2 bg-orange-500 hover:bg-orange-700 text-white'
                    >
                        Отмена
                    </button>
                </div>
            )}
        </div>
    )
}
