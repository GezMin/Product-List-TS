type propType = {
    openModal: boolean
    onClose: () => void
    children: React.ReactNode
}

export const Modal: React.FC<propType> = ({ openModal, onClose, children }) => {
    return (
        <div
            className={`fixed inset-0 flex justify-center items-center transition-colors overflow-y-auto text-black ${
                openModal ? 'visible bg-black/20' : 'invisible'
            }`}
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-lg shadow p-6 transition-all max-w-md ${
                    openModal ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
                onClick={e => e.stopPropagation()}
            >
                <button
                    className='absolute top-2 right-2 ry-1 px-2 border border-neutral-200 rounded-md text-gray-400 bg-white hover:text-gray-600'
                    onClick={onClose}
                >
                    X
                </button>
                {children}
            </div>
        </div>
    )
}
