import type { ReactElement } from "react";
import Popup from "reactjs-popup";

type PopupType = {
    children: ReactElement
    open: boolean
    onClose: () => void
}

export function PopupNode ({children, open, onClose} : PopupType) {
    return (
        <Popup 
            modal 
            overlayStyle={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} 
            className="rounded-xl overflow-hidden" 
            open={open} 
            onClose={onClose}
            closeOnDocumentClick={false}
        >
            {children}
        </Popup>
    )
}