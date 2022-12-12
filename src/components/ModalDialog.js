import { Dialog } from "@mui/material"
import BuyTicketForm from "./BuyTicketForm"

const ModalDialog = (props) => {
    
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <BuyTicketForm user={props.user} event={props.event} handleCloseModal={props.handleClose}/>
        </Dialog>
    )
}

export default ModalDialog