import React,{useState,useContext,useEffect} from 'react';
import GuestContext from '../../context/guestContext/guestContext';

function GuestForm() {

    const {addGuest,edit,updateGuest,clearEdit} = useContext(GuestContext);

    useEffect(() => {
        if(edit !== null){
            setGuest(edit);
        }else{
            setGuest({
                name: '',
                phone: '',
                diet: 'non-veg'
            })
        }
    } , [edit] )

    const [guest, setGuest] = useState({
        name: '',
        phone: '',
        diet: 'non-veg'
    })

    const {name,phone,diet}=guest;

    const handleChange = e => {
        setGuest({
            ...guest,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        // console.log(">>>",guest);     -------prints only the inputted guest, NOT all guests
        if(edit !== null){
            updateGuest(guest);
            clearEdit();
        }else{
            addGuest(guest);
            setGuest({
                name: '',
                phone: '',
                diet: 'non-veg'
            })
        }
    }

    return (
        <div className="invite-section">
            <h1>{edit !==null ? 'Edit Guest': 'Invite Someone' }</h1>
            <form onSubmit={handleSubmit}>
                {/* name as in the name="phone" (in handleChange function */}
                <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange}/>
                <input type="text" placeholder="Phone" name="phone" value={phone} onChange={handleChange}/>
                <p className="options-label">Dietary</p>

                <div className="options">
                    <label className="container">Non-veg
                    <input type="radio" name="diet" value='non-veg' checked={diet==='non-veg'} onChange={handleChange}/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Veg
                    <input type="radio" name="diet" value='veg' checked={diet==='veg'} onChange={handleChange}/>
                        <span className="checkmark"></span>
                    </label>
                </div>
                
                <input type="submit" value={edit !==null ? 'Update Guest': 'Add Guest' } className="btn" />
                {edit !==null ? <input type="button" className="btn clear" value="Cancel" onClick={clearEdit}/> : null }
            </form>
        </div>
    )
}

export default GuestForm
