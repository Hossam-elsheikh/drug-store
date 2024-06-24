"use client";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function Modal({ setIsModalOpen, setQuickAccess }) {
    let [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setIsModalOpen(isOpen);
        setQuickAccess(isOpen);
    }, [isOpen, setIsModalOpen, setQuickAccess]);

    const closeModal = () => {
        setIsOpen(false);
    };



    return (<>
            {isOpen && (
                <Dialog static open={isOpen} onClose={closeModal} className="relative z-50">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.80, transition: { duration: 0.3 } }}
                        className="fixed inset-0 bg-black/30"
                        />
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                        
                        <DialogPanel
                            as={motion.div}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
                            exit={{ opacity: 0, scale: 0.80, transition: { duration: 0.3 } }}
                            className="max-w-lg space-y-4 bg-white p-12 rounded-lg"
                            >
                            <DialogTitle className="text-lg font-bold">Deactivate account</DialogTitle>
                            <Description>This will permanently deactivate your account</Description>
                            <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
                            <div className="flex gap-4">
                                <button onClick={closeModal}>Cancel</button>
                                <button onClick={closeModal}>Deactivate</button>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            )}
            </>
    );
}

export default Modal;
