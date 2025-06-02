import React from "react";

const widthClasses = {
    small: "w-72",
    medium: "w-96",
    large: "w-[40rem]",
};

const Modal = ({ modal, setModal, width = "medium", children }) => {
    if (!modal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
                className={`bg-white rounded-lg p-6 max-h-[90vh] overflow-y-auto relative ${widthClasses[width]}`}>
                <button
                    onClick={() => setModal(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold">
                    ×
                </button>

                {children}
            </div>
        </div>
    );
};

export default Modal;
